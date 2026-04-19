#!/usr/bin/env node
// Regenerates MANIFEST.yaml from the current content tree.
// Writes to MANIFEST.yaml unless invoked as a library (see module.exports).

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");
const yaml = require("js-yaml");
const {
  ROOT,
  PHASE_SLUGS,
  PHASE_NUMBER,
  readFrontmatter,
  readYaml,
  walkPhase,
  listDirs,
} = require("./lib");

function getGitSha() {
  try {
    return execSync("git rev-parse --short HEAD", {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
  } catch {
    return "unknown";
  }
}

function isoDate(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function generateManifest(opts = {}) {
  const gitSha = opts.gitSha || getGitSha();

  const phases = [];
  let totalTopics = 0;
  let totalVariants = 0;
  const byAuthorType = { individual: 0, company: 0 };
  const byAuthor = {};

  for (const phaseSlug of PHASE_SLUGS) {
    const phaseIdx = path.join(ROOT, phaseSlug, "index.md");
    let title = phaseSlug;
    if (fs.existsSync(phaseIdx)) {
      const { data } = readFrontmatter(phaseIdx);
      if (typeof data.title === "string") title = data.title;
    }
    const { topics, subAreas } = walkPhase(phaseSlug);

    const topLevelTopics = topics
      .filter((t) => t.subArea === null)
      .map((t) => t.slug[t.slug.length - 1]);

    const subAreasList = subAreas.map((sa) => {
      const saIdx = path.join(sa.dir, "index.md");
      let saTitle = sa.slug;
      if (fs.existsSync(saIdx)) {
        const { data } = readFrontmatter(saIdx);
        if (typeof data.title === "string") saTitle = data.title;
      }
      const subTopics = topics
        .filter((t) => t.subArea === sa.slug)
        .map((t) => t.slug[t.slug.length - 1]);
      return {
        slug: sa.slug,
        title: saTitle,
        path: `./${phaseSlug}/${sa.slug}`,
        topics: subTopics,
      };
    });

    phases.push({
      slug: phaseSlug,
      title,
      phase_number: PHASE_NUMBER[phaseSlug],
      path: `./${phaseSlug}`,
      topics: topLevelTopics,
      sub_areas: subAreasList,
    });

    for (const t of topics) {
      totalTopics += 1;
      const vy = readYaml(path.join(t.dir, "variants.yaml"));
      if (vy && Array.isArray(vy.variants)) {
        for (const v of vy.variants) {
          totalVariants += 1;
          if (v.author_type === "individual" || v.author_type === "company") {
            byAuthorType[v.author_type] += 1;
          }
          const a = v.author || "Unknown";
          byAuthor[a] = (byAuthor[a] || 0) + 1;
        }
      }
    }
  }

  // Categories (agentic-engineering, etc.)
  const categories = [];
  const agenticDir = path.join(ROOT, "agentic-engineering");
  if (fs.existsSync(path.join(agenticDir, "index.md"))) {
    const { data } = readFrontmatter(path.join(agenticDir, "index.md"));
    categories.push({
      slug: "agentic-engineering",
      title: typeof data.title === "string" ? data.title : "Agentic Engineering",
      path: "./agentic-engineering",
      type: "onboarding",
    });
  }

  // Parking lot.
  const parkingLotPath = path.join(ROOT, "parking-lot", "unplaced-skills.yaml");
  let parkingLotCount = 0;
  if (fs.existsSync(parkingLotPath)) {
    try {
      const data = readYaml(parkingLotPath);
      if (data && Array.isArray(data.skills)) parkingLotCount = data.skills.length;
    } catch {
      // ignore
    }
  }

  return {
    version: "1.0.0",
    content_repo: {
      name: "startupengineering-content",
      description:
        "Curated knowledge base for startup engineering in the agentic era.",
      author: "Selva Ganapathy",
      canonical_site: "https://startupengineering.io",
      license: "CC-BY-4.0",
      last_updated: isoDate(),
      git_sha: gitSha,
    },
    schemas: {
      variant: "./schemas/variant.schema.json",
      topic_frontmatter: "./schemas/topic-frontmatter.schema.json",
      phase_frontmatter: "./schemas/phase-frontmatter.schema.json",
      subarea_frontmatter: "./schemas/subarea-frontmatter.schema.json",
    },
    phases,
    categories,
    stats: {
      total_phases: PHASE_SLUGS.length,
      total_topics: totalTopics,
      total_variants: totalVariants,
      variants_by_author_type: byAuthorType,
      variants_by_author: byAuthor,
    },
    parking_lot: {
      count: parkingLotCount,
      path: "./parking-lot/unplaced-skills.yaml",
    },
  };
}

function writeManifest() {
  const manifest = generateManifest();
  const out = path.join(ROOT, "MANIFEST.yaml");
  const header =
    "# AUTO-GENERATED. Do not edit by hand. Regenerate with `node scripts/generate-manifest.js`.\n";
  fs.writeFileSync(out, header + yaml.dump(manifest, { lineWidth: 120 }));
  console.log(`Wrote ${out}`);
}

module.exports = { generateManifest, writeManifest };

if (require.main === module) {
  writeManifest();
}

#!/usr/bin/env node
// Validates the content repo against schemas/*.json.
// Checks:
//   1. Every [phase]/index.md has frontmatter conforming to phase-frontmatter.schema.json.
//   2. Every sub-area index.md has frontmatter conforming to subarea-frontmatter.schema.json.
//   3. Every [topic]/index.md has frontmatter conforming to topic-frontmatter.schema.json.
//   4. Every variant in variants.yaml conforms to variant.schema.json.
//   5. Every local layers.* path (starts with ./) resolves to a real file.
//   6. Every variant id is globally unique.
//   7. MANIFEST.yaml is in sync with the current tree.

const fs = require("node:fs");
const path = require("node:path");
const Ajv = require("ajv/dist/2020");
const addFormats = require("ajv-formats");
const yaml = require("js-yaml");
const {
  ROOT,
  PHASE_SLUGS,
  readFrontmatter,
  readYaml,
  walkAll,
} = require("./lib");

const SCHEMA_DIR = path.join(ROOT, "schemas");
const ajv = new Ajv({ strict: false, allErrors: true });
addFormats(ajv);

const variantSchema = JSON.parse(
  fs.readFileSync(path.join(SCHEMA_DIR, "variant.schema.json"), "utf8"),
);
const topicSchema = JSON.parse(
  fs.readFileSync(
    path.join(SCHEMA_DIR, "topic-frontmatter.schema.json"),
    "utf8",
  ),
);
const phaseSchema = JSON.parse(
  fs.readFileSync(
    path.join(SCHEMA_DIR, "phase-frontmatter.schema.json"),
    "utf8",
  ),
);
const subareaSchema = JSON.parse(
  fs.readFileSync(
    path.join(SCHEMA_DIR, "subarea-frontmatter.schema.json"),
    "utf8",
  ),
);

const validateVariant = ajv.compile(variantSchema);
const validateTopic = ajv.compile(topicSchema);
const validatePhase = ajv.compile(phaseSchema);
const validateSubarea = ajv.compile(subareaSchema);

const errors = [];
function fail(msg) {
  errors.push(msg);
}

// 1. Phase index.md files.
for (const phaseSlug of PHASE_SLUGS) {
  const idx = path.join(ROOT, phaseSlug, "index.md");
  if (!fs.existsSync(idx)) {
    fail(`Missing ${phaseSlug}/index.md`);
    continue;
  }
  const { data } = readFrontmatter(idx);
  if (!validatePhase(data)) {
    fail(
      `Invalid phase frontmatter in ${phaseSlug}/index.md: ${ajv.errorsText(validatePhase.errors)}`,
    );
  }
}

// 2, 3, 4, 5, 6. Sub-areas, topics, variants.
const { phases, topics } = walkAll();
const seenIds = new Map();

for (const { slug: phaseSlug, subAreas } of phases) {
  for (const sa of subAreas) {
    const idx = path.join(sa.dir, "index.md");
    const { data } = readFrontmatter(idx);
    if (!validateSubarea(data)) {
      fail(
        `Invalid sub-area frontmatter in ${phaseSlug}/${sa.slug}/index.md: ${ajv.errorsText(validateSubarea.errors)}`,
      );
    }
  }
}

for (const topic of topics) {
  const { phase, subArea, slug, dir } = topic;
  const idxPath = path.join(dir, "index.md");
  const vyPath = path.join(dir, "variants.yaml");
  const rel = `${phase}/${slug.join("/")}`;

  // Topic frontmatter.
  const { data } = readFrontmatter(idxPath);
  if (!validateTopic(data)) {
    fail(
      `Invalid topic frontmatter in ${rel}/index.md: ${ajv.errorsText(validateTopic.errors)}`,
    );
    continue;
  }
  if (data.phase !== phase) {
    fail(`Phase mismatch in ${rel}/index.md: frontmatter says ${data.phase}, directory says ${phase}`);
  }
  if (subArea && data.sub_area !== subArea) {
    fail(`Sub-area mismatch in ${rel}/index.md: frontmatter says ${data.sub_area}, directory says ${subArea}`);
  }
  if (!subArea && data.sub_area && data.sub_area !== null) {
    fail(`Sub-area mismatch in ${rel}/index.md: frontmatter says ${data.sub_area}, topic is not under a sub-area`);
  }

  // Variants.
  let parsed;
  try {
    parsed = readYaml(vyPath);
  } catch (err) {
    fail(`Failed to parse ${rel}/variants.yaml: ${err.message}`);
    continue;
  }
  const variants = parsed && Array.isArray(parsed.variants) ? parsed.variants : null;
  if (!variants) {
    fail(`${rel}/variants.yaml must contain a top-level "variants" array`);
    continue;
  }
  for (const v of variants) {
    if (!validateVariant(v)) {
      fail(
        `Invalid variant "${v && v.id}" in ${rel}/variants.yaml: ${ajv.errorsText(validateVariant.errors)}`,
      );
      continue;
    }
    // Unique id check.
    if (seenIds.has(v.id)) {
      fail(`Duplicate variant id "${v.id}" in ${rel}/variants.yaml (also in ${seenIds.get(v.id)})`);
    } else {
      seenIds.set(v.id, rel);
    }
    // Local path resolution.
    const layers = v.layers || {};
    for (const [layerName, value] of Object.entries(layers)) {
      if (typeof value !== "string") continue;
      if (value.startsWith("./")) {
        const resolved = path.resolve(dir, value);
        if (!fs.existsSync(resolved)) {
          fail(
            `Local path does not resolve: ${rel}/variants.yaml variant "${v.id}" layers.${layerName} = ${value}`,
          );
        }
      } else if (!/^https?:\/\//i.test(value)) {
        fail(
          `Invalid layers.${layerName} in ${rel} variant "${v.id}": must start with "./" (local) or "http" (external). Got: ${value}`,
        );
      }
    }
  }
}

// 7. MANIFEST.yaml in sync.
const manifestPath = path.join(ROOT, "MANIFEST.yaml");
if (fs.existsSync(manifestPath)) {
  const { generateManifest } = require("./generate-manifest");
  const current = yaml.load(fs.readFileSync(manifestPath, "utf8"));
  const generated = generateManifest({ gitSha: current && current.content_repo && current.content_repo.git_sha });
  // Compare ignoring git_sha and last_updated (those move on their own).
  const normalize = (m) => {
    const copy = JSON.parse(JSON.stringify(m));
    if (copy.content_repo) {
      delete copy.content_repo.git_sha;
      delete copy.content_repo.last_updated;
    }
    return copy;
  };
  if (JSON.stringify(normalize(current)) !== JSON.stringify(normalize(generated))) {
    fail("MANIFEST.yaml is out of sync with the content tree. Run `node scripts/generate-manifest.js`.");
  }
} else {
  fail("MANIFEST.yaml is missing. Run `node scripts/generate-manifest.js`.");
}

if (errors.length > 0) {
  console.error(`\nValidation failed with ${errors.length} error(s):\n`);
  for (const e of errors) console.error(" - " + e);
  process.exit(1);
} else {
  console.log(`Validation passed. Checked ${topics.length} topic(s), ${seenIds.size} variant(s).`);
}

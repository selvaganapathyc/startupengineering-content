// Shared utilities for the content repo scripts.
// No site-specific code here — these utilities work against the content tree
// as a pure data source.

const fs = require("node:fs");
const path = require("node:path");
const matter = require("gray-matter");
const yaml = require("js-yaml");

const ROOT = path.resolve(__dirname, "..");

const PHASE_SLUGS = [
  "define",
  "discover",
  "design",
  "develop",
  "validate",
  "operate",
];

const PHASE_NUMBER = {
  define: 1,
  discover: 2,
  design: 3,
  develop: 4,
  validate: 5,
  operate: 6,
};

function readFrontmatter(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  return { data: parsed.data || {}, content: parsed.content || "" };
}

function readYaml(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return yaml.load(raw);
}

function dirHas(dir, name) {
  return fs.existsSync(path.join(dir, name));
}

function listDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
}

// A topic is any directory containing both index.md and variants.yaml.
function isTopicDir(dir) {
  return dirHas(dir, "index.md") && dirHas(dir, "variants.yaml");
}

// A sub-area is any directory containing index.md whose frontmatter has
// `parent_phase`. (No variants.yaml — that's what distinguishes it from a
// topic whose slug happens to collide with a phase name.)
function isSubareaDir(dir) {
  if (!dirHas(dir, "index.md")) return false;
  if (dirHas(dir, "variants.yaml")) return false;
  try {
    const { data } = readFrontmatter(path.join(dir, "index.md"));
    return typeof data.parent_phase === "string";
  } catch {
    return false;
  }
}

// Walk a phase folder and return { topics: [{ phase, subArea, slug, dir }], subAreas: [{ slug, dir }] }.
function walkPhase(phaseSlug) {
  const phaseDir = path.join(ROOT, phaseSlug);
  const topics = [];
  const subAreas = [];

  if (!fs.existsSync(phaseDir)) return { topics, subAreas };

  for (const name of listDirs(phaseDir)) {
    const full = path.join(phaseDir, name);
    if (isTopicDir(full)) {
      topics.push({
        phase: phaseSlug,
        subArea: null,
        slug: [name],
        dir: full,
      });
    } else if (isSubareaDir(full)) {
      subAreas.push({ slug: name, dir: full });
      for (const topicName of listDirs(full)) {
        const tfull = path.join(full, topicName);
        if (isTopicDir(tfull)) {
          topics.push({
            phase: phaseSlug,
            subArea: name,
            slug: [name, topicName],
            dir: tfull,
          });
        }
      }
    }
  }

  return { topics, subAreas };
}

function walkAll() {
  const result = { phases: [], topics: [] };
  for (const p of PHASE_SLUGS) {
    const { topics, subAreas } = walkPhase(p);
    result.phases.push({ slug: p, subAreas });
    result.topics.push(...topics);
  }
  return result;
}

module.exports = {
  ROOT,
  PHASE_SLUGS,
  PHASE_NUMBER,
  readFrontmatter,
  readYaml,
  isTopicDir,
  isSubareaDir,
  listDirs,
  walkPhase,
  walkAll,
};

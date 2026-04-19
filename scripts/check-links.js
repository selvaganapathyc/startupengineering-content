#!/usr/bin/env node
// Walks every variants.yaml, extracts URL fields (source_url, source_skill_url,
// layers.* entries that start with http), and HEAD/GETs each one. Prints a
// summary. No GitHub Actions wiring — runnable manually.
//
// Usage: node scripts/check-links.js

const path = require("node:path");
const { walkAll, readYaml } = require("./lib");

async function headOrGet(url) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (res.status >= 200 && res.status < 400) return { ok: true, status: res.status };
    // Some servers don't allow HEAD; fall back to a lightweight GET.
    const g = await fetch(url, { method: "GET", redirect: "follow" });
    return { ok: g.status >= 200 && g.status < 400, status: g.status };
  } catch (err) {
    return { ok: false, status: 0, error: err.message };
  }
}

(async () => {
  const { topics } = walkAll();
  const jobs = [];
  for (const topic of topics) {
    const vyPath = path.join(topic.dir, "variants.yaml");
    const parsed = readYaml(vyPath);
    if (!parsed || !Array.isArray(parsed.variants)) continue;
    for (const v of parsed.variants) {
      const fields = ["source_url", "source_skill_url"];
      for (const f of fields) {
        if (typeof v[f] === "string") {
          jobs.push({ topic: `${topic.phase}/${topic.slug.join("/")}`, id: v.id, field: f, url: v[f] });
        }
      }
      if (v.layers && typeof v.layers === "object") {
        for (const [layerName, value] of Object.entries(v.layers)) {
          if (typeof value === "string" && /^https?:\/\//i.test(value)) {
            jobs.push({
              topic: `${topic.phase}/${topic.slug.join("/")}`,
              id: v.id,
              field: `layers.${layerName}`,
              url: value,
            });
          }
        }
      }
    }
  }

  if (jobs.length === 0) {
    console.log("No external URLs found in variants.yaml files.");
    return;
  }

  console.log(`Checking ${jobs.length} URL(s)...\n`);
  let failures = 0;
  for (const job of jobs) {
    const result = await headOrGet(job.url);
    const tag = result.ok ? "OK " : "FAIL";
    if (!result.ok) failures += 1;
    const status = result.status || "ERR";
    console.log(`[${tag} ${status}] ${job.topic} ${job.id} ${job.field} → ${job.url}${result.error ? " (" + result.error + ")" : ""}`);
  }

  console.log(`\nDone. ${failures}/${jobs.length} failed.`);
})();

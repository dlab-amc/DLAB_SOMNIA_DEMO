/**
 * Verify regression report builds 4+ PDF pages for S260721002.
 * Run: docker exec docker_test-react-1 node /app/scripts/verify-regression-report.mjs
 */
import React from "react";
import { pdf } from "@react-pdf/renderer";
import fs from "fs";
import ReportDocument from "../src/pages/report/ReportDocument.jsx";

const BACKEND = process.env.REACT_APP_ENDPOINT_URL || "http://fastapi:8000";

async function main() {
  const res = await fetch(`${BACKEND}/report/admin/S260721002`, {
    headers: { Authorization: "Bearer test" },
  });
  if (!res.ok) {
    throw new Error(`API ${res.status} — use admin override or set token`);
  }
  const json = await res.json();
  const extra = json.extra_info || {};
  const perf = json.performance_results || {};
  const merged = {
    ...perf,
    overall: perf.overall || extra.performance_result_overall || {},
    bmi: perf.bmi || extra.performance_result_bmi || {},
    severity: perf.severity || extra.performance_result_severity || {},
    race: perf.race || extra.performance_result_race || {},
  };

  const doc = React.createElement(ReportDocument, {
    extraInfo: extra,
    performanceResults: merged,
    imageSrcMap: { bmi_plot: {}, age_plot: {} },
    tf: (_ko, en) => en ?? _ko,
  });

  const blob = await pdf(doc).toBlob();
  const buf = Buffer.from(await blob.arrayBuffer());
  const out = "/tmp/regression-report-test.pdf";
  fs.writeFileSync(out, buf);

  const pageMatches = buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g);
  const pageCount = pageMatches ? pageMatches.length : -1;
  console.log("Wrote", out, "bytes", buf.length);
  console.log("Approx page count:", pageCount);
  console.log("subgroups:", extra.selected_subgroups);
  console.log("perf keys:", Object.keys(merged));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

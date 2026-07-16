import fs from "fs";
import { execSync } from "child_process";

const path = "src/App.jsx";
let src = fs.readFileSync(path, "utf8");

// Missing }, between products: ends with ], or [] then next object
src = src.replace(/(\n    (?:acePermissions|notes|installSteps|requirements|updateNotes): (?:\[[\s\S]*?\]|\[\]))\n  \{/g, "$1,\n  },\n  {");

// Simpler targeted: empty ace then next product without }
src = src.replace(/acePermissions: \[\],\n  \{/g, "acePermissions: [],\n  },\n  {");
src = src.replace(/acePermissions: \[\],\n\];/g, "acePermissions: [],\n  },\n];");

// notes/requirements ending ], then next product without }
src = src.replace(/(\n    \],)\n  \{/g, "$1\n  },\n  {");
src = src.replace(/(\n    \],)\n\];/g, "$1\n  },\n];");

// Fix double }},
src = src.replace(/\},\n  \},\n  \{/g, "},\n  {");

fs.writeFileSync(path, src);

try {
  execSync("npx eslint src/App.jsx", { stdio: "pipe" });
  console.log("lint ok");
} catch (e) {
  const out = (e.stdout?.toString?.() || "") + (e.stderr?.toString?.() || "");
  console.log(out.slice(-600));
  const m = out.match(/(\d+):(\d+)\s+error/);
  if (m) {
    const line = Number(m[1]);
    const lines = fs.readFileSync(path, "utf8").split("\n");
    console.log("--- context ---");
    console.log(
      lines
        .slice(Math.max(0, line - 5), line + 5)
        .map((l, i) => `${line - 4 + i}: ${l}`)
        .join("\n"),
    );
  }
  process.exit(1);
}

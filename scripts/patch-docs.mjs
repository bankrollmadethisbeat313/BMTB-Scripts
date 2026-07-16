import fs from "fs";
import { execSync } from "child_process";

const path = "src/App.jsx";
let src = fs.readFileSync(path, "utf8");

const docs = {
  "bmtb-pillpress": {
    acePermissions: ["add_ace group.admin bmtb.pillpress.admin allow"],
    requirements: [
      "ESX Legacy, QBCore, or Qbox",
      "ox_inventory recommended (qb/ps/lj/qs/codem/core/ak47 supported)",
      "ox_target or qb-target",
      "Optional: bmtb_trapphone for street sell payouts",
    ],
    installSteps: [
      "Drop bmtb_pillpress into resources/[scripts]/ or [bmtb]/ and merge install/ items for your inventory.",
      "Copy html/img PNG icons into ox_inventory/web/images/ (filename = item id).",
      "Ensure framework, inventory, and target start before bmtb_pillpress.",
      "Add ACE: add_ace group.admin bmtb.pillpress.admin allow",
      "ensure bmtb_pillpress — edit config.lua for recipes, bottles, effects, demand, durability.",
      "Restart and test /pilladmin + /pilldemand. Optional trapphone for demand-based street payouts.",
    ],
    notes: [
      "ACE bmtb.pillpress.admin gates /pilladmin (framework admin fallback supported).",
      "Per-pill /pilladmin saves write to data/pill_admin_overrides.json.",
      "Trap phone integration needs both resources for demand-based sell payouts.",
    ],
  },
  "bmtb-pods-2": {
    acePermissions: [],
    requirements: [
      "xsound (required — must start before pods)",
      "ESX Legacy or QBCore",
      "Inventory backend (ox_inventory / qb-inventory / auto-detect)",
    ],
    installSteps: [
      "Drop as bmtb_pods into resources/[scripts]/ or [bmtb]/.",
      "Ensure order: ensure xsound then ensure bmtb_pods.",
      "Add the pods/airpods item to inventory; keep stream/ props intact.",
      "Framework/inventory bridges auto-register on most stacks.",
      "Restart xsound + bmtb_pods and test the item (fallback may be /airpods).",
    ],
    notes: [
      "No dedicated ACE — player item use only.",
      "Live resource name is bmtb_pods (not bmtb_airpods).",
      "Always start xsound before bmtb_pods.",
    ],
    updateNotes: [
      "AirPods-style personal music NUI with wearable streamed props.",
      "Dynamic theme colors with presets + custom hex picker.",
      "UI opens only when using pods; ESC/close + WASD while open.",
      "Live volume updates, click-to-set / drag knob, Shift fine control.",
      "Multi-framework / multi-inventory auto-detect (ESX + QBCore).",
      "Requires xsound for audio playback.",
    ],
  },
  "bmtb-lean": {
    acePermissions: ["add_ace group.admin bmtb_lean.debug allow"],
    requirements: [
      "ESX Legacy or QBCore build (Qbox uses QBCore edition)",
      "ox_lib",
      "oxmysql recommended",
      "ox_inventory, qb-inventory, or compatible inventory",
      "es_extended (ESX) or qb-core (QBCore)",
      "ox_target or qb-target (optional)",
      "Optional: bmtb-hud for thirst sync on QB",
    ],
    installSteps: [
      "Install matching ESX or QBCore build of bmtb_lean into [scripts]/ or [bmtb]/.",
      "Keep stream/ intact. Merge install items into inventory and copy images.",
      "Ensure order: ox_lib → framework → inventory → (optional hud/target) → bmtb_lean.",
      "Edit config.lua for language, sip FX, props, thirst, notify duration.",
      "restart inventory + bmtb_lean. QB: /leanqbcheck. ESX: /leanrebuildbaby if needed.",
    ],
    notes: [
      "Debug ACE bmtb_lean.debug is optional (debug tools only).",
      "Config.Inventory.mode = auto probes supported backends on start.",
      "Start inventory before lean so items register correctly.",
    ],
  },
  "bmtb-gofetch": {
    acePermissions: ["add_ace group.admin bmtb.gofetch.admin allow"],
    requirements: [
      "ox_lib",
      "oxmysql",
      "ESX Legacy / QBCore / Qbox",
      "ox_inventory, qb-inventory, or compatible inventory",
      "ox_target or qb-target (optional — E-key fallback)",
      "QBCore: qb-shops recommended for live catalogs",
    ],
    installSteps: [
      "Drop bmtb_gofetch into [bmtb]/ or [scripts]/ and merge install-me/ items + images.",
      "Ensure order: ox_lib → oxmysql → framework → inventory → (qb-shops if QB) → bmtb_gofetch.",
      "Add ACE: add_ace group.admin bmtb.gofetch.admin allow",
      "ensure bmtb_gofetch — restart inventory + GoFetch.",
      "Test with /giveitem [id] gofetch_tablet 1 (or your install-me item name).",
    ],
    notes: [
      "Admin ACE: bmtb.gofetch.admin",
      "Start shops/inventory before GoFetch so catalogs populate.",
    ],
  },
  "bmtb-trapphone": {
    acePermissions: ["add_ace group.admin bmtb.trapphone.admin allow"],
    requirements: [
      "ESX Legacy (es_extended)",
      "ox_lib",
      "oxmysql",
      "ox_inventory",
      "ox_target (optional — E-key fallback)",
    ],
    installSteps: [
      "Drop bmtb_trapphone into resources/[scripts]/ and import SQL if provided.",
      "CRITICAL order: oxmysql → es_extended → ox_lib → bmtb_trapphone → ox_inventory (trapphone BEFORE ox_inventory).",
      "Add trap phone + drug items to ox_inventory/data/items.lua per README.",
      "Add ACE: add_ace group.admin bmtb.trapphone.admin allow",
      "ensure bmtb_trapphone — restart and test /giveitem [id] bmtb_trapphone 1.",
    ],
    notes: [
      "Admin ACE: bmtb.trapphone.admin",
      "Must start BEFORE ox_inventory so item exports register.",
      "ESX Legacy only on current builds.",
    ],
  },
  "bmtb-strippers": {
    acePermissions: [
      "add_ace group.admin bmtb.strippers.admin allow",
      "add_ace group.admin bmtb_elevators.admin allow",
    ],
    requirements: [
      "ESX Legacy or QBCore version (separate builds)",
      "ox_lib",
      "oxmysql",
      "ox_inventory recommended",
      "ox_target or qb-target",
      "illenium-appearance (optional)",
      "esx_addonaccount (ESX) or QB society/banking",
      "Optional: bmtb_elevators (start AFTER strippers)",
    ],
    installSteps: [
      "Install matching ESX or QBCore build of bmtb_strippers.",
      "Import SQL (jobs + reputation) for your framework.",
      "Add/refresh clubowner job and society account.",
      "Ensure oxmysql → ox_lib → framework → inventory/target → bmtb_strippers.",
      "Add ACE: add_ace group.admin bmtb.strippers.admin allow",
      "Tune config.lua. Elevator floors live in Config.Elevators.",
      "If using elevators: ensure bmtb_strippers then bmtb_elevators + ACE bmtb_elevators.admin.",
      "Restart and test shifts, poles, VIP, /clubmanage.",
    ],
    notes: [
      "Admin ACE: bmtb.strippers.admin",
      "Always start bmtb_strippers before bmtb_elevators.",
      "Elevator admin ACE: bmtb_elevators.admin",
    ],
  },
  "bmtb-chains-as-items": {
    acePermissions: [],
    requirements: [
      "ox_lib",
      "ox_inventory (recommended)",
      "Optional clothing stream pack (ensure before bmtb_chains if provided)",
    ],
    installSteps: [
      "Drop bmtb_chains into resources/[scripts]/.",
      "Merge ox_inventory items + images from install files.",
      "Optional: ensure clothing stream first, then ox_lib → ox_inventory → bmtb_chains.",
      "ensure bmtb_chains — restart inventory + chains and test equip/shop.",
    ],
    updateNotes: [
      "Wearable jewelry chains using clothing component 7.",
      "E-key shop interaction and equip animations.",
      "Stash-only transfer rules to reduce dump/dupe abuse.",
      "ox_lib + ox_inventory focused install.",
    ],
    notes: [
      "No dedicated ACE — item/shop driven.",
      "Live resource folder is typically bmtb_chains.",
    ],
  },
  "bmtb-loading-screen": {
    acePermissions: [],
    requirements: ["None — standalone loadscreen resource"],
    installSteps: [
      "Drop bmtb_loadingscreen into resources/ (often at root, not inside [qb]).",
      "Put videos/audio under assets/ and configure playlist/theme in CONFIG.",
      "ensure bmtb_loadingscreen EARLY in server.cfg (before oxmysql/core on many setups).",
      "Restart and verify the loadscreen appears on connect.",
    ],
    updateNotes: [
      "Video / YouTube playlist support with background audio.",
      "Themed UI with Discord / Tebex link blocks.",
      "Standalone — no framework dependency.",
    ],
    notes: [
      "No ACE required.",
      "Live resource name: bmtb_loadingscreen.",
    ],
  },
  "watermark-server-logo-script": {
    acePermissions: [],
    requirements: ["None — standalone client overlay"],
    installSteps: [
      "Drop watermark_logo (or your watermark resource) into [standalone]/.",
      "Replace the logo image asset with your server branding.",
      "ensure watermark_logo (or your resource name) in server.cfg.",
      "Restart and confirm the overlay appears in-game.",
    ],
    updateNotes: [
      "Lightweight NUI watermark / server logo overlay.",
      "Standalone — no framework dependency.",
    ],
    notes: ["No ACE required. Author branding: BMTB watermark_logo on many servers."],
  },
  "bmtb-cooking": {
    acePermissions: [],
    requirements: [
      "ox_lib",
      "ESX Legacy or QBCore / Qbox",
      "Inventory (ox_inventory / qb-inventory)",
      "ox_target or qb-target",
    ],
    installSteps: [
      "Drop bmtb_cooking into [scripts]/ or [bmtb]/.",
      "Merge install items (install me/items_ox_inventory.lua or QB install files).",
      "Ensure order: ox_lib → framework → inventory → target → bmtb_cooking.",
      "ensure bmtb_cooking — place stove / use world grills and test skill-check cook.",
    ],
    updateNotes: [
      "Placeable stove and world grill cooking.",
      "Skill-check cooking loops.",
      "Coke brick + crack style outputs (config driven).",
      "Multi-framework auto bridges.",
    ],
    notes: ["No dedicated ACE on current builds."],
  },
  "bmtb-weapon-repair": {
    acePermissions: [],
    requirements: [
      "ox_lib",
      "oxmysql",
      "ESX or QBCore",
      "ox_inventory or compatible inventory exports",
    ],
    installSteps: [
      "Place bmtb_weaponrepair in resources/[scripts]/.",
      "Ensure ox_lib → oxmysql → framework → inventory → bmtb_weaponrepair.",
      "Import included SQL files and merge ox items if provided.",
      "ensure bmtb_weaponrepair — restart and test bench, crafting, repair.",
    ],
    notes: [
      "No dedicated ACE found — usually job/framework gated.",
      "Auto-detect weapons/ammo/attachments enabled by default.",
      "Use Config.CustomItemSources for non-standard inventory exports.",
    ],
  },
  "bmtb-wigs": {
    acePermissions: [],
    requirements: [
      "ox_lib",
      "ESX Legacy or QBCore",
      "Inventory backend (ox / qb / auto)",
      "Optional target",
    ],
    installSteps: [
      "Drop bmtb_wigs into [scripts]/ or [bmtb]/.",
      "Merge install-me items/images into inventory.",
      "Ensure ox_lib → framework → inventory → bmtb_wigs.",
      "Set craft spots in config.lua (/wigcoords) then restart and test /wigsale.",
    ],
    updateNotes: [
      "Wig craft stations with configurable spots.",
      "Street selling to spawned customers (/wigsale).",
      "Multi-inventory auto-detect.",
    ],
    notes: ["No dedicated ACE on current builds."],
  },
  "bmtb-chopshop": {
    acePermissions: [],
    requirements: [
      "ox_lib",
      "oxmysql",
      "ESX or QBCore / Qbox",
      "bmtb-tasknotify (start before chopshop)",
      "bmtb-taskbar (start before chopshop)",
    ],
    installSteps: [
      "Install the [bmtbchopshop] pack: bmtb-tasknotify, bmtb-taskbar, bmtb_chopshop.",
      "Ensure order: framework → bmtb-tasknotify → bmtb-taskbar → bmtb_chopshop.",
      "Set marker/NPC/payout in bmtb_chopshop/config.lua.",
      "ensure [bmtbchopshop] or ensure each resource in order, then test a chop run.",
    ],
    updateNotes: [
      "Per-part welding chopshop gameplay.",
      "FX/sound sync with payout.",
      "Optional delete from player_vehicles / owned vehicles.",
      "Uses BMTB taskbar + tasknotify helpers.",
    ],
    notes: [
      "No dedicated ACE — debug cmds usually config-gated.",
      "Always start tasknotify + taskbar before bmtb_chopshop.",
    ],
  },
  "bmtb-tuning": {
    acePermissions: ["add_ace group.admin bmtb_tuning.admin allow"],
    requirements: [
      "ox_lib",
      "oxmysql",
      "ESX or QBCore",
      "ox_inventory or compatible inventory",
      "OneSync recommended",
      "Engine audio packs as needed",
    ],
    installSteps: [
      "Drop bmtb_tuning into [scripts]/.",
      "Ensure oxmysql → ox_lib → ox_inventory → framework → bmtb_tuning.",
      "Add ACE: add_ace group.admin bmtb_tuning.admin allow",
      "ensure bmtb_tuning — give tablet item and test engine-sound NUI + persistence.",
    ],
    updateNotes: [
      "Engine-sound tablet NUI with per-vehicle persistence.",
      "Mechanic online checks / job gates (config).",
      "Multi-framework inventory bridges.",
    ],
    notes: ["Admin ACE: bmtb_tuning.admin"],
  },
  "bmtb-car-wipe": {
    acePermissions: [],
    requirements: [
      "ox_lib",
      "oxmysql (fx dependency on many builds)",
      "Optional framework for notifies / QB admin groups",
    ],
    installSteps: [
      "Drop bmtb_carwipe into [scripts]/ or [bmtb]/.",
      "Set Config.Admins identifiers and/or QBAdminGroups / ESX admin groups in config.lua.",
      "Tune wipe interval, zones, and whitelist in config.lua.",
      "ensure bmtb_carwipe after ox_lib/oxmysql — test auto wipe + admin command.",
    ],
    updateNotes: [
      "Auto + command vehicle wipe with NUI countdown.",
      "Whitelisted zones support.",
      "Optional framework notifies.",
      "Admin via ACE command principal and/or Config.Admins / QB admin groups.",
    ],
    notes: [
      'No dedicated bmtb.* ACE — often uses IsPlayerAceAllowed(..., "command") or Config.Admins.',
      "On many servers add_ace group.admin command allow covers wipe admins.",
    ],
  },
  "bmtb-givecar": {
    acePermissions: ["add_ace group.admin bmtb_givecar.command allow"],
    requirements: [
      "ox_lib",
      "oxmysql",
      "ESX (es_extended) or QBCore (qb-core)",
      "QB: qb-garages recommended",
    ],
    installSteps: [
      "Drop bmtb_givecar into [scripts]/ or [bmtb]/.",
      "Ensure framework + oxmysql + ox_lib before givecar.",
      "Add ACE: add_ace group.admin bmtb_givecar.command allow",
      "ensure bmtb_givecar — test /givecar, plane/boat/heli variants, /delcarplate.",
    ],
    updateNotes: [
      "Give / transfer / delete owned vehicles.",
      "Supports car, plane, boat, heli helpers.",
      "ACE + AuthorizedRanks (god/admin/superadmin) gates.",
    ],
    notes: [
      "Admin ACE: bmtb_givecar.command",
      "Also checks AuthorizedRanks in config.",
    ],
  },
  "bmtb-nocrosshair": {
    acePermissions: [],
    requirements: ["None — standalone client script"],
    installSteps: [
      "Drop bmtb_nocrosshair into [scripts]/ or [bmtb]/.",
      "ensure bmtb_nocrosshair (no config required on stock builds).",
      "Restart and confirm default GTA crosshair/reticle is hidden.",
    ],
    updateNotes: [
      "Hides default GTA crosshair / reticle.",
      "Client-only standalone resource.",
    ],
    notes: ["No ACE required."],
  },
  "bmtb-itemslist": {
    acePermissions: ["add_ace group.admin bmtb_itemslist.admin allow"],
    requirements: [
      "ox_lib",
      "ESX or QBCore",
      "Inventory backend (ox / qb / multi-inventory bridge)",
    ],
    installSteps: [
      "Drop bmtb_itemslist into [scripts]/ or [bmtb]/.",
      "Ensure ox_lib → framework → inventory → bmtb_itemslist.",
      "Add ACE: add_ace group.admin bmtb_itemslist.admin allow (if Config.UseAcePermission is enabled).",
      "Also configure QBPermissions / AdminGroups in config.lua as needed.",
      "ensure bmtb_itemslist — open with /itemslist or configured key (often Page Down).",
    ],
    updateNotes: [
      "Admin item catalog NUI with spawn to self/others.",
      "Multi-framework inventory bridges.",
      "Audit log support on many builds.",
    ],
    notes: [
      "ACE: bmtb_itemslist.admin (UseAcePermission may default false — enable in config).",
      "QBPermissions / AdminGroups often used as fallback.",
    ],
  },
  "bmtb-moneywash": {
    acePermissions: ["add_ace group.admin bmtb_moneywash.admin allow"],
    requirements: [
      "ox_lib",
      "oxmysql",
      "ESX / QBCore / Qbox (auto bridges)",
      "Inventory + ox_target or qb-target",
    ],
    installSteps: [
      "Drop bmtb_moneywash into [scripts]/ or [bmtb]/.",
      "Import bmtb_moneywash.sql (or allow auto CREATE on start).",
      "Ensure ox_lib → oxmysql → framework → inventory/target → bmtb_moneywash.",
      "Add ACE: add_ace group.admin bmtb_moneywash.admin allow",
      "ensure bmtb_moneywash — place washers with /moneywashplace (or admin cmds) and test wash flow.",
    ],
    updateNotes: [
      "Dirty → clean money wash with NUI progress.",
      "MySQL-backed washer locations + ghost placement.",
      "Admin cmds: /moneywashadd, /moneywashplace, /moneywashrefresh, etc.",
      "Multi-framework bridges.",
    ],
    notes: [
      "Admin ACE: bmtb_moneywash.admin",
      "FrameworkAdminGroups fallback supported on many builds.",
    ],
  },
};

function formatArray(arr) {
  if (!arr.length) return "[]";
  return (
    "[\n" +
    arr.map((item) => `      ${JSON.stringify(item)},`).join("\n") +
    "\n    ]"
  );
}

function findMatching(src, openIdx, openCh, closeCh) {
  let depth = 0;
  for (let i = openIdx; i < src.length; i++) {
    const ch = src[i];
    if (ch === openCh) depth++;
    else if (ch === closeCh) {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function findProductBlock(src, slug) {
  const needle = `slug: "${slug}"`;
  const slugIdx = src.indexOf(needle);
  if (slugIdx === -1) return null;
  const objStart = src.lastIndexOf("{", slugIdx);
  const objEnd = findMatching(src, objStart, "{", "}");
  if (objEnd === -1) return null;
  return { objStart, objEnd: objEnd + 1 };
}

function upsertArrayField(block, key, value) {
  const keyRe = new RegExp(`(\\n    ${key}:\\s*)`);
  const m = keyRe.exec(block);
  const rendered = formatArray(value);

  if (m) {
    const valueStart = m.index + m[0].length;
    const first = block[valueStart];
    let valueEnd;
    if (first === "[") {
      valueEnd = findMatching(block, valueStart, "[", "]") + 1;
    } else {
      // unexpected — replace until comma/newline
      valueEnd = block.indexOf("\n", valueStart);
    }
    return block.slice(0, m.index) + `\n    ${key}: ${rendered}` + block.slice(valueEnd);
  }

  // Insert before closing brace of object (keep the closing })
  const closeIdx = block.lastIndexOf("}");
  let before = block.slice(0, closeIdx).replace(/\s+$/, "");
  if (!before.endsWith(",")) before += ",";
  return `${before}\n    ${key}: ${rendered},\n  }`;
}

let updated = 0;
for (const [slug, fields] of Object.entries(docs)) {
  const loc = findProductBlock(src, slug);
  if (!loc) {
    console.log("SKIP", slug);
    continue;
  }
  let block = src.slice(loc.objStart, loc.objEnd);
  for (const [key, value] of Object.entries(fields)) {
    block = upsertArrayField(block, key, value);
  }
  // tidy: remove double commas / trailing comma before }
  block = block.replace(/,(\s*),+/g, ",$1");
  block = block.replace(/,(\s*)\}/, "$1}");
  src = src.slice(0, loc.objStart) + block + src.slice(loc.objEnd);
  updated++;
  console.log("OK", slug);
}

fs.writeFileSync(path, src);
console.log("updated", updated);

try {
  execSync("npx eslint src/App.jsx", { stdio: "inherit" });
  console.log("lint ok");
} catch {
  process.exit(1);
}

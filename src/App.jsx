import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import AmbientBackground from "./AmbientBackground";

const DISCORD_URL = "https://discord.gg/5rRMZ2R9EP";
const SUPPORT_EMAIL = "bankrollmadethisbeat@gmail.com";
const TEBEX_STORE_URL = "https://bmtbscripts.tebex.io";
const TEBEX_FREE_CATEGORY_URL = "https://bmtbscripts.tebex.io/category/scripts";
const TEBEX_CUSTOM_SCRIPT_PACKAGE_URL = "https://bmtbscripts.tebex.io/category/CustomScriptPackage";
const GUMROAD_STORE_URL = "https://bankrollmadethisbeat.gumroad.com/?section=Hn1qT-Kqt-tN59rEoI51ZQ%3D%3D";
const BAG_DRUGS_RELEASE_AT = new Date("2026-08-14T18:00:00Z"); // August 14, 2026 2:00 PM ET
const icons = {
  shield: "M12 2 5 5v6c0 5 3.4 9.4 7 11 3.6-1.6 7-6 7-11V5l-7-3Zm0 4.1 3.5 1.5v3.6c0 2.9-1.6 5.6-3.5 7-1.9-1.4-3.5-4.1-3.5-7V7.6L12 6.1Zm-1 8.4 5-5-1.4-1.4L11 11.7l-1.6-1.6L8 11.5l3 3Z",
  zap: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  package: "M21 8.2 12 3 3 8.2v10.4L12 24l9-5.4V8.2ZM12 5.3l5.6 3.2L12 11.7 6.4 8.5 12 5.3Zm-7 5 6 3.5v6.9l-6-3.6v-6.8Zm8 10.4v-6.9l6-3.5v6.8l-6 3.6Z",
  users: "M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.3 0-6 1.7-6 3.8V20h12v-3.2C14 14.7 11.3 13 8 13Zm8-1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0 2c-.7 0-1.3.1-1.9.2 1.2.8 1.9 1.9 1.9 3.2V20h6v-3c0-1.7-2.7-3-6-3Z",
  star: "M12 2.5 15 8.7l6.8.9-4.9 4.8 1.2 6.8L12 18l-6.1 3.2 1.2-6.8-4.9-4.8 6.8-.9L12 2.5Z",
  code: "M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4Zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4ZM13.2 4l-3.8 16h2.1L15.3 4h-2.1Z",
  server: "M4 3h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 11h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Zm2-7v2h2V7H6Zm0 11v2h2v-2H6Z",
  message: "M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  chevron: "M9 5 16 12l-7 7-1.5-1.5L13 12 7.5 6.5 9 5Z",
  search: "M10 2a8 8 0 1 0 4.9 14.3l4.4 4.4 1.4-1.4-4.4-4.4A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z",
  check: "M9.5 16.2 4.8 11.5l1.4-1.4 3.3 3.3 8.3-8.3 1.4 1.4-9.7 9.7Z",
  heart: "M12 21s-7.2-4.4-9.5-8.2C.8 9.8 2.2 6 5.6 5.4c1.8-.3 3.5.5 4.4 1.9.9-1.4 2.6-2.2 4.4-1.9 3.4.6 4.8 4.4 3.1 7.4C19.2 16.6 12 21 12 21Z",
  badge: "M12 2 14.5 8.5 21.5 9.3 16.5 14.2 17.8 21.2 12 18 6.2 21.2 7.5 14.2 2.5 9.3 9.5 8.5 12 2Z",
  medical: "M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z",
  car: "M5 11 6.5 6.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11h1a2 2 0 0 1 2 2v4h-2a2 2 0 1 1-4 0H8a2 2 0 1 1-4 0H2v-4a2 2 0 0 1 2-2h1Zm2.2-3.5L6.2 11h11.6l-1-3.5H7.2Z",
  layout: "M3 3h8v8H3V3Zm10 0h8v5h-8V3ZM3 13h5v8H3v-8Zm7 0h11v8H10v-8Z",
  standalone: "M4 4h16v16H4V4Zm2 2v12h12V6H6Z",
  menu: "M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z",
  close: "M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4 17.6 5 12 10.6 6.4 5Z",
  copy: "M8 4h10a2 2 0 0 1 2 2v10h-2V6H8V4Zm-4 4h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Zm0 2v10h10V10H4Z",
};

function getCountdownParts(targetDate) {
  const diffMs = targetDate.getTime() - Date.now();
  const isLive = diffMs <= 0;
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isLive };
}

function ComingSoonCountdown({ targetDate, liveMessage }) {
  const [countdown, setCountdown] = useState(() => getCountdownParts(targetDate));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdownParts(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: "Days", value: countdown.days },
    { label: "Hrs", value: countdown.hours },
    { label: "Min", value: countdown.minutes },
    { label: "Sec", value: countdown.seconds },
  ];

  return (
    <div className="mt-5">
      <div className="grid grid-cols-4 gap-2">
        {units.map((unit) => (
          <div key={unit.label} className="rounded-xl border border-bmtb-line bg-bmtb-elevated/80 px-2 py-3 text-center">
            <p className="font-display text-xl font-bold leading-none text-white">{String(unit.value).padStart(2, "0")}</p>
            <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-bmtb-muted">{unit.label}</p>
          </div>
        ))}
      </div>
      {countdown.isLive && liveMessage && (
        <p className="mt-3 text-sm font-semibold text-bmtb-accent">{liveMessage}</p>
      )}
    </div>
  );
}

function Icon({ name, size = 22, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={className} fill="currentColor">
      <path d={icons[name]} />
    </svg>
  );
}

function AnimatedCount({ value, duration = 1400 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(value * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return <>{display}</>;
}

const products = [
  {
    slug: "bmtb-physical-therapy",
    name: "BMTB Physical Therapy",
    desc: "Rehab sessions with yoga mat placement, skill-check exercises, therapy areas, optional Wasabi crutch bridge, and a full /ptadmin setup panel.",
    fullDesc: "BMTB Physical Therapy v1.1.1 brings immersive rehab RP to ESX Legacy, QBCore, and Qbox — players visit a PT ped, follow GPS to a therapy area, place a yoga mat, and complete skill-check exercise chains. Includes standalone core (no framework required), built-in streamed crutch (GPLv3), optional Wasabi integration, ACE-gated /ptadmin for locations and exercises, and setup.html for easy config.",
    price: "FREE",
    tag: "FREE",
    frameworks: ["ESX", "QBCore", "Qbox"],
    downloads: 0,
    version: "v1.1.1",
    updatedOn: "2026-08-11",
    imageUrl: "/bmtb-physical-therapy-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/Y692o3yh944",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtb-physicaltherapy",
    tebexUrl: "https://bmtbscripts.tebex.io/package/bmtb-physicaltherapy",
    infoHeading: "BMTB Physical Therapy v1.1.1",
    updateNotes: [
      "Yoga mat placement — place mat in therapy areas and run exercise chains.",
      "Skill-check exercises — easy difficulty, configurable laps, hold poses between checks.",
      "/ptadmin panel — locations, therapy areas, exercise chains, anim catalog, logs.",
      "Wasabi crutch bridge — optional PT-on-crutch flow with clear-on-complete.",
      "Built-in standalone crutch — streamed prop when Wasabi is off (GPLv3 credited).",
      "Multi-framework — ESX Legacy, QBCore, Qbox auto-detect; standalone core.",
      "setup.html — load/edit/download config.lua without hand-editing.",
    ],
    requirements: [
      "FiveM (Cerulean)",
      "Optional: wasabi_crutch + wasabi bridge/ambulance",
      "Optional: ox_target or qb-target",
      "Optional: ox_inventory (yoga mat item)",
      "Optional: ox_lib (Wasabi time query)",
    ],
    installSteps: [
      "Drop bmtb_physicaltherapy into resources/[scripts]/ or [bmtb]/.",
      "Open setup.html → Load config.lua → edit → Download → replace config.lua.",
      "Ensure Wasabi resources before bmtb_physicaltherapy if using Wasabi.",
      "Add ACE: add_ace group.admin bmtb.ptadmin allow",
      "Optional: merge install/ox_inventory_items.lua and copy yoga_mat.png to ox_inventory.",
      "ensure bmtb_physicaltherapy — /ptadmin to add PT location + therapy area (radius 4–6+).",
    ],
    notes: [
      "Admin ACE: bmtb.ptadmin",
      "Fresh installs ship data/locations.json as [] — place locations via /ptadmin.",
      "Set Config.Debug = false on production servers.",
    ],
    acePermissions: [
      "add_ace group.admin bmtb.ptadmin allow",
    ],
    adminGuide: [
      "Grant bmtb.ptadmin ACE before opening /ptadmin to staff.",
      "Create at least one PT location (ped) and therapy area with radius ≥ 4 (prefer 6).",
      "If using Wasabi, ensure wasabi_crutch starts before this resource.",
      "Smoke-test: notes → travel → place mat → exercises → complete + crutch clear.",
    ],
    playerCommands: [
      { command: "PT ped interaction", usage: "Target / E-key", description: "Talk to the physiotherapist, accept notes, and start a rehab session." },
      { command: "Therapy area", usage: "Map blip / GPS", description: "Travel to the configured area, place yoga mat, and complete exercise skill checks." },
      { command: "/ptuifix", description: "Clear stuck NUI cursor or focus if the UI locks up." },
    ],
    adminCommands: [
      { command: "/ptadmin", description: "Open admin panel — locations, areas, exercises, chains, settings, logs.", ace: "bmtb.ptadmin" },
      { command: "/ptcrutch [minutes] [id]", description: "Test crutch assignment (Wasabi or standalone).", ace: "bmtb.ptadmin" },
      { command: "/ptneed [injury]", description: "Assign therapy requirement to yourself (debug/admin).", ace: "bmtb.ptadmin" },
    ]
  },
  {
    slug: "bmtb-real-money",
    name: "BMTB Real Money",
    desc: "Physical cash system with real bill denominations, store registers, change-making, player handoffs, and dirty money — built for serious RP servers.",
    fullDesc: "BMTB Real Money replaces fake UI money with a full physical cash economy — real bill denominations from $1 to $100, clean and dirty money, automatic change-making, player-to-player cash handoffs with animations, and configurable store registers with smart payment selection, persistent floats, and heist-ready register theft. OneSync optimized, secure, and server-side for ESX Legacy, QBCore, and Qbox.",
    price: "$5",
    tag: "PREMIUM",
    frameworks: ["ESX", "QBCore", "Qbox"],
    downloads: 0,
    version: "v1.0",
    updatedOn: "2026-08-04",
    imageUrl: "/bmtb-real-money-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/QKEgxFD4f7Q",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtb-real-money",
    tebexUrl: "https://bmtbscripts.tebex.io/package/bmtb-real-money",
    infoHeading: "BMTB Real Money v1.0",
    updateNotes: [
      "Real bill denominations — $1 through $100 with physical cash items.",
      "Clean & dirty money — separate flows with black-market dirty cash support.",
      "Automatic change-making — registers and handoffs calculate correct change.",
      "Player-to-player cash handoff — animations and bill exchange between players.",
      "Configurable store zones — place register points anywhere on your map.",
      "Steal registers & heists — server-side register theft for criminal RP.",
      "Multi-framework — ESX Legacy, QBCore, and Qbox auto-detect.",
    ],
    requirements: [
      "ESX Legacy, QBCore, or Qbox",
      "ox_inventory or compatible inventory",
      "ox_lib recommended",
      "oxmysql recommended",
    ],
    installSteps: [
      "Install bmtb_realmoney into resources/[scripts]/ or [bmtb]/.",
      "Merge bill items from install/*_items.lua into your inventory and copy icons.",
      "Ensure framework → ox_lib → inventory → bmtb_realmoney.",
      "Configure store register zones, floats, and dirty money in config.lua (or setup.html).",
      "ensure bmtb_realmoney — restart and test bill handoff, registers, and change-making.",
    ],
    notes: [
      "Real cash. Real RP. No fake money.",
      "Optional bmtb_moneywash integration for dirty → clean flows.",
      "Tune register zones and dirty-money payouts before going live.",
    ],
    acePermissions: [],
    adminGuide: [
      "Merge all bill denomination items before opening to players.",
      "Configure store zones and register starting floats in config.lua.",
      "If using /givecash, optionally add ACE: add_ace group.admin command.givecash allow (or your configured ACE).",
      "Test one register payment and one player-to-player handoff before go-live.",
    ],
    playerCommands: [
      { command: "/givecash", usage: "Optional ACE", description: "Hand physical cash bills to a nearby player with automatic change-making and animations." },
      { command: "Store registers", usage: "Target / E-key", description: "Pay at configured shop registers with real bill selection; registers make change and persist floats." },
      { command: "Inventory items", usage: "Use bill items", description: "Physical $1–$100 bills, clean and dirty money — no fake UI cash when framework mirror is enabled." },
    ],
    adminCommands: []
  },
  {
    slug: "bmtb-scamming",
    name: "BMTB Scamming",
    desc: "Carding and ATM scamming RP — buy dumps, cash out, heat/burn risk, police dispatch, ranks, and a full bmtb os laptop workflow.",
    fullDesc: "BMTB Scamming v1.0 brings a complete criminal finance loop to ESX Legacy — buy dumps from vendors, encode cards, hit ATMs with burn-risk mechanics, manage heat, climb ranks, and run operations from a custom bmtb os laptop NUI. Includes police dispatch triggers, decline/burn feedback, and configurable payout/risk tuning for immersive scam RP. QBCore support is not available yet.",
    price: "FREE",
    tag: "FREE",
    frameworks: ["ESX"],
    downloads: 0,
    version: "v1.0",
    updatedOn: "2026-07-24",
    imageUrl: "/bmtb-scamming-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/7zQVfRVvzWY",
    buyUrl: "https://bmtbscripts.tebex.io/package/7577885",
    tebexUrl: "https://bmtbscripts.tebex.io/package/7577885",
    infoHeading: "BMTB Scamming v1.0",
    updateNotes: [
      "Buy dumps — vendor flow for card data (Visa, MasterCard, etc.).",
      "Card encoder / programmer bench setup with streamed props.",
      "ATM cash-out with decline, burn risk, and police dispatch events.",
      "Heat + rank progression tied to scam activity.",
      "bmtb os laptop NUI for dump catalog, status, and operations.",
    ],
    requirements: [
      "ESX Legacy (es_extended)",
      "ox_lib",
      "ox_inventory",
      "ox_target",
      "oxmysql",
      "Optional: bmtb_realmoney for physical cash payouts",
    ],
    installSteps: [
      "Install bmtb_scamming into resources/[scripts]/ or [bmtb]/.",
      "Run sql/full_install.sql or allow auto-migration on first start.",
      "Merge ox_inventory items from install files and copy images.",
      "Ensure es_extended → ox_lib → ox_inventory → ox_target → bmtb_scamming.",
      "Edit config.lua for payouts, heat, dispatch, ranks, and burn risk.",
      "ensure bmtb_scamming — test dump buy, encode, ATM cash-out, and sell run.",
    ],
    notes: [
      "ESX Legacy only on v1.0 — QBCore is not supported yet.",
      "Tebex-only — no Gumroad listing for this script.",
      "Tune burn risk / police dispatch in config before going live.",
    ],
    acePermissions: [],
    adminGuide: [
      "Import SQL and merge inventory items before first player join.",
      "Tune burn risk, police dispatch, and payout values in config.lua.",
      "Set Config.Debug to false on production servers.",
      "Test full loop: buy dump → encode card → ATM cash-out → sell run.",
    ],
    playerCommands: [
      { command: "/sellcards", description: "Start a street card-selling run — buyers spawn and purchase encoded cards for cash." },
      { command: "/stopsellcards", description: "Stop the active card sell run." },
      { command: "bmtb os laptop", usage: "Item / workstation", description: "Open scam laptop NUI — browse dumps, encode cards, check heat and rank." },
      { command: "ATM cash-out", usage: "Target ATM", description: "Use encoded cards at ATMs — decline, burn risk, and police dispatch may trigger." },
    ],
    adminCommands: []
  },
  {
    slug: "bmtb-pillpress",
    name: "BMTB Pill Press",
    desc: "Placeable pill press crafting, pill bottles, use effects, durability, and rotating street demand with trap phone integration.",
    fullDesc: "Full pill economy for ESX Legacy, QBCore, and Qbox — place a press in the world, craft 10 pill types, fill and withdraw pill bottles, use pills with animations and overdose logic, repair worn presses, roll hot/cold street demand each restart, and tune perks in /pilladmin. Built-in BMTB NUI (no ox_lib required). Optional bmtb_trapphone integration for demand-based street payouts.",
    price: "FREE",
    tag: "FREE",
    frameworks: ["ESX", "QBCore", "Qbox"],
    downloads: 0,
    version: "v1.0.0",
    updatedOn: "2026-06-24",
    imageUrl: "/bmtb-pillpress-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/qHyIuxg061o",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtb-pillpress",
    gumroadUrl: "https://bmtbscripts.tebex.io/category/premium-scripts",
    infoHeading: "BMTB Pill Press v1.0.0",
    updateNotes: [
      "Placeable pill press — ghost placement, ground snap, one press per player until restart.",
      "Crafting — 10 pill types, configurable batch size, ingredient refund on fail/cancel.",
      "Pill bottles — fill, open, deposit, and withdraw via slot metadata.",
      "Street demand — hot/cold rotation each restart; BMTB UI panel via /pilldemand.",
      "Pill admin — /pilladmin NUI for per-pill perk/visual tuning.",
    ],
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
    acePermissions: [
      "add_ace group.admin bmtb.pillpress.admin allow",
    ],
    adminGuide: [
      "Add ACE bmtb.pillpress.admin (or configure FrameworkAdminGroups in config.lua).",
      "Merge install items and icons before first restart.",
      "Open /pilladmin after install — Tebex ships all pills Off; enable perks/visuals per pill.",
      "Test press placement, craft one batch, and fill a pill bottle before go-live.",
    ],
    playerCommands: [
      { command: "pill_press item", usage: "Inventory", description: "Place a pill press in the world — ghost placement, ground snap, craft batches." },
      { command: "/pilldemand", description: "Open street demand panel showing hot/cold pill types for this restart." },
      { command: "/unstuckpills", description: "Clear stuck pill use animations or sprint effects." },
      { command: "Pill / bottle items", usage: "Inventory", description: "Use pills for effects; fill, open, and withdraw pill bottles via metadata." },
    ],
    adminCommands: [
      { command: "/pilladmin", description: "Open staff pill admin panel — tune perks, visuals, and modes per pill type.", ace: "bmtb.pillpress.admin" },
    ]
  },
  {
    slug: "bmtb-pods-2",
    name: "BMTB PODS 2.0",
    desc: "Advanced FiveM props/pods system for immersive server interactions.",
    fullDesc: "BMTB PODS 2.0 adds configurable prop and pod placements to support immersive server scenes and interactions.",
    price: "FREE",
    tag: "FREE",
    frameworks: ["ESX", "QBCore"],
    downloads: 380,
    assetId: "934971",
    version: "v2.0",
    updatedOn: "2026-03-25",
    imageUrl: "/bmtb-pods-2-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/hW0s1sO1F9A?si=pa2eww6S7jxc42-O",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtbpods",
    gumroadUrl: "https://bankrollmadethisbeat.gumroad.com/l/grnuy",
    githubUrl: "https://github.com/bankrollmadethisbeat/bmtb-pods-2",
    infoHeading: "UPDATED - NEW LOOK",
    updateNotes: [
      "AirPods-style personal music NUI with wearable streamed props.",
      "Dynamic theme colors with presets + custom hex picker.",
      "UI opens only when using pods; ESC/close + WASD while open.",
      "Requires xsound for audio playback.",
    ],
    requirements: [
      "xsound (required — must start before pods)",
      "ESX Legacy or QBCore",
      "Inventory backend (ox_inventory / qb-inventory / auto-detect)",
    ],
    installSteps: [
      "Drop as bmtb_pods into resources/[scripts]/ or [bmtb]/.",
      "Ensure order: ensure xsound then ensure bmtb_pods.",
      "Add the bmtb_pods item to inventory; keep stream/ props intact.",
      "Framework/inventory bridges auto-register on most stacks.",
      "Restart xsound + bmtb_pods and test the item (fallback: /bmtbpods).",
    ],
    acePermissions: [],
    notes: [
      "No dedicated ACE — player item use only.",
      "Live resource name is bmtb_pods (not bmtb_airpods).",
      "Always start xsound before bmtb_pods.",
    ],
    adminGuide: [
      "Always start xsound before bmtb_pods.",
      "Merge ox_inventory item with correct export fields.",
      "Verify stream/ assets load — missing props break the wearable UI.",
    ],
    playerCommands: [
      { command: "bmtb_pods item", usage: "Inventory", description: "Wear AirPods-style props and open the music NUI — volume, theme, playlist controls." },
      { command: "/bmtbpods", description: "Fallback command to open pods UI if item use fails." },
      { command: "/bmtbpodsoff", description: "Stop audio and close the pods session." },
    ],
    adminCommands: [
      { command: "/podsprop", description: "Prop debug tuner — adjust wearable prop offsets (dev/debug use)." },
    ]
  },
  {
    slug: "bmtb-lean",
    name: "BMTB Lean",
    desc: "Full lean workflow for ESX, QBCore, and Qbox — pour, mix, sip FX, and in-world cup carry with custom props and BMTB UI.",
    fullDesc: "Pour lean into baby bottles, prep Feyzo soda cups, mix variants (purple / red / green), add ice and extras, drink with sip FX, and carry your cup in-world — all with custom props, animations, and a clean BMTB UI. Includes dedicated ESX Legacy and QBCore builds with multi-inventory support and 14 locale options.",
    price: "$10",
    tag: "PREMIUM",
    frameworks: ["ESX", "QBCore", "Qbox"],
    downloads: 1,
    version: "v1.0.0",
    updatedOn: "2026-05-17",
    imageUrl: "https://dunb17ur4ymx4.cloudfront.net/packages/images/89df115a0ecfdc8b20fcb81c3a69b58c9023bbc8.png",
    youtubeEmbed: "https://www.youtube.com/embed/NvCfSDMEXDA",
    buyUrl: "https://bmtbscripts.tebex.io/package/7452186",
    gumroadUrl: "https://bankrollmadethisbeat.gumroad.com/l/bmtblean",
    infoHeading: "BMTB Lean v1.0.0",
    updateNotes: [
      "Lean bottle → baby bottle with line-based pouring.",
      "Double cup + Feyzo prep with mixed lean variants (purple / red / green).",
      "Hold / drink mixed lean with on-screen cup HUD.",
      "Custom prop attachments, streamed animations, and BMTB NUI menus.",
    ],
    requirements: [
      "ESX Legacy (primary build)",
      "ox_lib",
      "oxmysql recommended",
      "ox_inventory or compatible inventory",
      "ox_target or qb-target (optional)",
    ],
    installSteps: [
      "Install bmtb_lean ESX build into [scripts]/ or [bmtb]/.",
      "Keep stream/ intact. Merge install items into inventory and copy images.",
      "Ensure order: ox_lib → es_extended → inventory → bmtb_lean.",
      "Edit config.lua for language, sip FX, props, thirst, notify duration.",
      "ensure bmtb_lean — ESX: /leanrebuildbaby if baby bottle metadata needs repair.",
    ],
    notes: [
      "Debug ACE bmtb_lean.debug is optional (debug tools only).",
      "Config.Inventory.mode = auto probes supported backends on start.",
      "Start inventory before lean so items register correctly.",
    ],
    acePermissions: [
      "add_ace group.admin bmtb_lean.debug allow",
    ],
    adminGuide: [
      "Merge all lean items and images before go-live.",
      "Set Config.Debug.clientCommands and serverCommands to false on production.",
      "Optional debug ACE bmtb_lean.debug for prop tuner and metadata repair tools only.",
      "Run /leanrebuildbaby once if migrating from an older lean build.",
    ],
    playerCommands: [
      { command: "/leancarry", description: "Toggle carrying your mixed lean cup in-hand with HUD (G drink / K add / X put away)." },
      { command: "Lean items", usage: "Inventory", description: "Pour baby bottles, mix purple/red/green variants, sip with FX, add ice and extras." },
    ],
    adminCommands: [
      { command: "/leanrebuildbaby", description: "ESX server — rebuild baby bottle metadata for all players (migration/repair).", ace: "bmtb_lean.debug" },
      { command: "/leantune", usage: "Debug only", description: "Prop tuner for cup/bottle attachments (requires Config.Debug.clientCommands = true).", ace: "bmtb_lean.debug" },
    ]
  },
  {
    slug: "bmtb-gofetch",
    name: "BMTB GoFetch",
    desc: "Delivery tablet with live shop catalogs, NPC fleet delivery, and multi-framework support.",
    fullDesc: "GoFetch lets players browse live shop catalogs from ox_inventory, qb-shops, and other inventories, place orders, pay cash or bank, and receive items through an NPC burrito van courier with optional GoFetch Express upgrades.",
    price: "$1",
    tag: "PREMIUM",
    frameworks: ["ESX", "QBCore"],
    downloads: 0,
    version: "v1.0.0",
    updatedOn: "2026-05-28",
    imageUrl: "/bmtb-gofetch-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/tNFsXiSSogM",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtb-gofetch",
    gumroadUrl: "https://bankrollmadethisbeat.gumroad.com/l/bvejnk",
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
      "Test with gofetch_tablet item — place order and receive NPC delivery.",
    ],
    infoHeading: "BMTB GoFetch v1.0.0",
    updateNotes: [
      "Delivery tablet with live shop catalogs from ox_inventory and qb-shops.",
      "NPC burrito van courier fleet with optional GoFetch Express upgrades.",
      "Multi-framework ESX / QBCore / Qbox auto-detect.",
    ],
    acePermissions: [
      "add_ace group.admin bmtb.gofetch.admin allow",
    ],
    notes: [
      "Admin ACE: bmtb.gofetch.admin",
      "Start shops/inventory before GoFetch so catalogs populate.",
    ],
    adminGuide: [
      "Add ACE bmtb.gofetch.admin before staff testing.",
      "Start shops/inventory before GoFetch so live catalogs populate.",
      "Use /gofetchreloadshops after adding new shop inventory items.",
    ],
    playerCommands: [
      { command: "gofetch_tablet", usage: "Inventory item", description: "Open delivery tablet — browse live shop catalogs, pay cash/bank, place orders." },
      { command: "gofetch_package", usage: "Inventory / NPC", description: "Receive delivery package from burrito van courier when order arrives." },
    ],
    adminCommands: [
      { command: "/gofetchdebug", description: "Toggle admin debug logging for order/delivery pipeline.", ace: "bmtb.gofetch.admin" },
      { command: "/gofetchinstant", description: "Force instant delivery on next order (testing).", ace: "bmtb.gofetch.admin" },
      { command: "/gofetchorders", description: "List all active GoFetch orders in server console/chat.", ace: "bmtb.gofetch.admin" },
      { command: "/gofetchcancel [id]", description: "Cancel a player's active order by server ID.", ace: "bmtb.gofetch.admin" },
      { command: "/gofetchreloadshops", description: "Reload shop provider catalogs without full restart.", ace: "bmtb.gofetch.admin" },
    ]
  },
  {
    slug: "bmtb-trapphone",
    name: "BMTB Trap Phone",
    desc: "Full street-trap economy for ESX Legacy — trap runs, deliveries, plugs, rep, and heat.",
    fullDesc: "Trap phone NUI with calls, messages, status, deliveries, and Trapperz.net demand index. Run street sales, plug meetups, delivery drops, bagging loops, reputation tiers, and police heat — built for ESX Legacy with ox_inventory.",
    price: "$15",
    tag: "PREMIUM",
    frameworks: ["ESX"],
    downloads: 0,
    version: "v1.0.0",
    updatedOn: "2026-06-15",
    imageUrl: "/bmtb-trapphone-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/PURhGct3rM4",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtb-trapphone",
    gumroadUrl: "https://bankrollmadethisbeat.gumroad.com/l/acmig",
    requirements: [
      "ESX Legacy (es_extended)",
      "ox_lib",
      "oxmysql",
      "ox_inventory",
      "ox_target (optional — E-key fallback)",
    ],
    installSteps: [
      "Drop bmtb_trapphone into resources/[scripts]/ and import SQL if provided.",
      "CRITICAL order: oxmysql → es_extended → ox_lib → bmtb_trapphone → ox_inventory.",
      "Add trap phone + drug items to ox_inventory/data/items.lua per ox_items.lua.",
      "Add ACE: add_ace group.admin bmtb.trapphone.admin allow",
      "ensure bmtb_trapphone — restart and test trap phone item + /trapphone.",
    ],
    infoHeading: "BMTB Trap Phone v1.0.0",
    updateNotes: [
      "Street trap selling with auto/manual buyer modes and robbery risk.",
      "Delivery jobs via phone calls.",
      "Plug contacts, meetups, tab debt, and street rep ranks.",
      "Optional bmtb_pillpress demand integration for pill street payouts.",
    ],
    acePermissions: [
      "add_ace group.admin bmtb.trapphone.admin allow",
    ],
    notes: [
      "Admin ACE: bmtb.trapphone.admin",
      "Must start BEFORE ox_inventory so item exports register.",
      "ESX Legacy only on current builds.",
    ],
    adminGuide: [
      "Trap phone MUST start before ox_inventory or item exports will not register.",
      "Merge ox_items.lua entries — item names must match config.lua.",
      "Set Config.Debug and Config.DebugSales to false on live servers.",
      "Grant ACE bmtb.trapphone.admin to staff before opening economy.",
      "Test one street trap run and one delivery call before go-live.",
    ],
    playerCommands: [
      { command: "/trapphone", usage: "F6 keybind", description: "Open trap phone NUI when carrying a trap phone item." },
      { command: "trap phone item", usage: "Inventory", description: "Primary way to open phone — street trap, deliveries, plug contacts, rep." },
      { command: "Street trap", usage: "Phone UI", description: "Start auto or manual buyer runs — sell drugs, risk robbery, build street rep." },
      { command: "Delivery jobs", usage: "Phone UI", description: "Accept phone calls, deliver product to drop-off for payout." },
    ],
    adminCommands: [
      { command: "/trapadmin", description: "Print admin command help list.", ace: "bmtb.trapphone.admin" },
      { command: "/trapstatus [id]", description: "Show trap phone status for a player — rep, active run, debt, plugs.", ace: "bmtb.trapphone.admin" },
      { command: "/trapstop [id]", description: "Force-stop active trap run for a player.", ace: "bmtb.trapphone.admin" },
      { command: "/trapdeliverycancel [id]", description: "Cancel active delivery mission for a player.", ace: "bmtb.trapphone.admin" },
      { command: "/trapmeetupfail [id]", description: "Fail active plug meetup for a player.", ace: "bmtb.trapphone.admin" },
      { command: "/traprep [id] [units]", description: "Set street rep units sold for a player.", ace: "bmtb.trapphone.admin" },
      { command: "/trapbadrep [id] [amount|clear]", description: "Set or clear bad rep for a player.", ace: "bmtb.trapphone.admin" },
      { command: "/trapdebt [id] [plugId] [amount]", description: "Set plug tab debt for a player.", ace: "bmtb.trapphone.admin" },
      { command: "/trapcleardebt [id] [plugId]", description: "Clear plug tab debt (omit plugId for all plugs).", ace: "bmtb.trapphone.admin" },
      { command: "/trapgivephone [id] [item]", description: "Give a trap phone item to a player.", ace: "bmtb.trapphone.admin" },
      { command: "/trapreset [id]", description: "Wipe stats, rep, plugs, and messages — fresh start.", ace: "bmtb.trapphone.admin" },
    ]
  },
  {
    slug: "bmtb-strippers",
    name: "BMTB Strippers",
    desc: "Full strip club business system — dancer shifts, pole dance, VIP rooms, NPC customers, and owner management.",
    fullDesc: "Run a complete Vanilla Unicorn-style club with dancer shifts, pole dancing, VIP rooms, NPC customers, player lap dances, owner revenue, staff management, reputation, and club popularity. Available in both ESX Legacy and QBCore versions.",
    price: "$10",
    tag: "PREMIUM",
    frameworks: ["ESX", "QBCore"],
    downloads: 0,
    version: "v1.0.0",
    updatedOn: "2026-06-21",
    imageUrl: "/bmtb-strippers-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/w6uihCRH7fM",
    buyUrl: "https://bmtbscripts.tebex.io/category/premium-scripts",
    requirements: [
      "ESX Legacy (primary build)",
      "ox_lib",
      "oxmysql",
      "ox_inventory recommended",
      "ox_target or qb-target",
      "esx_addonaccount",
      "Optional: bmtb_elevators (start AFTER strippers)",
    ],
    installSteps: [
      "Install bmtb_strippers ESX build into [scripts]/ or [bmtb]/.",
      "Import SQL (jobs + reputation) from sql/esx/.",
      "Add/refresh clubowner job and society account — run /refreshjobs.",
      "Ensure oxmysql → ox_lib → es_extended → inventory/target → bmtb_strippers.",
      "Add ACE: add_ace group.admin bmtb.strippers.admin allow",
      "If using elevators: ensure bmtb_strippers then bmtb_elevators + ACE bmtb_elevators.admin.",
      "Restart and test shifts, poles, VIP, /clubmanage.",
    ],
    infoHeading: "BMTB Strippers v1.0.0",
    updateNotes: [
      "Full strip club RP — shifts, poles, lap dances, VIP rooms, tips.",
      "Club owner management panel and popularity system.",
      "ESX society accounts and job integration.",
    ],
    notes: [
      "Admin ACE: bmtb.strippers.admin",
      "Always start bmtb_strippers before bmtb_elevators.",
      "Elevator admin ACE: bmtb_elevators.admin",
    ],
    acePermissions: [
      "add_ace group.admin bmtb.strippers.admin allow",
      "add_ace group.admin bmtb_elevators.admin allow",
    ],
    adminGuide: [
      "Import all SQL files (install.sql, jobs.sql, reputation.sql) before first start.",
      "Grant bmtb.strippers.admin ACE to club managers and head staff.",
      "Configure club locations, poles, and VIP rooms in config.lua.",
      "Always start bmtb_strippers before bmtb_elevators if using elevator integration.",
      "Use /clubmanage to verify owner/staff workflows before opening club to public.",
    ],
    playerCommands: [
      { command: "/throwtip", description: "Throw cash tips at dancers during pole routines." },
      { command: "Club interactions", usage: "ox_target / E-key", description: "Clock in/out, pole dance, lap dances, VIP rooms, bar, and register interactions." },
    ],
    adminCommands: [
      { command: "/clubmanage", description: "Open club owner/manager panel — staff, finances, popularity.", ace: "bmtb.strippers.admin" },
      { command: "/setclubjob [id] [job]", description: "Assign club job to a player.", ace: "bmtb.strippers.admin" },
      { command: "/hirestripper [id]", description: "Hire a player as a stripper for the club.", ace: "bmtb.strippers.admin" },
      { command: "/firestripper [id]", description: "Fire a stripper from the club roster.", ace: "bmtb.strippers.admin" },
      { command: "/newpole", description: "Place a new pole at your current position.", ace: "bmtb.strippers.admin" },
      { command: "/removepole", description: "Remove nearest pole placement.", ace: "bmtb.strippers.admin" },
      { command: "/previewseat", description: "Preview lap dance seat placement.", ace: "bmtb.strippers.admin" },
      { command: "/previewstripper", description: "Preview stripper stage placement.", ace: "bmtb.strippers.admin" },
    ]
  },
  {
    slug: "bmtb-chains-as-items",
    name: "BMTB Chains As Items",
    desc: "Wearable chain items with inventory/shop integration for ESX/QBCore.",
    fullDesc: "Wearable chain system with inventory and shop flow. Includes item setup support for modern FiveM frameworks and clean, simple integration.",
    price: "$1",
    tag: "PREMIUM",
    frameworks: ["ESX", "QBCore"],
    downloads: 6,
    updatedOn: "2026-05-06",
    imageUrl: "/bmtb-chains-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/H_YG2Vr96bE?si=a3qN9aNwu3i16FKc",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtb-chains",
    gumroadUrl: "https://bankrollmadethisbeat.gumroad.com/l/vxdcr",
    acePermissions: [],
    requirements: [
      "ox_lib",
      "ox_inventory (required)",
      "Optional clothing stream pack (ensure before bmtb_chains if provided)",
    ],
    installSteps: [
      "Drop bmtb_chains into resources/[scripts]/.",
      "Merge ox_inventory items + images from install files.",
      "Ensure ox_lib → ox_inventory → bmtb_chains.",
      "Configure jewelry shop zones in config.lua.",
      "ensure bmtb_chains — restart inventory + chains and test equip/shop.",
    ],
    updateNotes: [
      "Wearable jewelry chains using clothing component 7.",
      "E-key shop interaction and equip animations.",
      "ox_lib + ox_inventory focused install.",
    ],
    notes: [
      "No dedicated ACE — item/shop driven.",
      "Live resource folder is bmtb_chains.",
      "Stash-only transfer rules reduce dump/dupe abuse.",
    ],
    adminGuide: [
      "Merge chain items with correct drawable/component metadata.",
      "Configure shop zones and prices in config.lua or setup.html.",
      "Test equip animation and stash-only transfer rules before go-live.",
    ],
    playerCommands: [
      { command: "chain items", usage: "Inventory", description: "Use chain items to equip jewelry on clothing component 7 with animations." },
      { command: "Jewelry shop", usage: "E-key zones", description: "Buy chains at configured shop locations." },
      { command: "/chainid", usage: "Debug", description: "Print current drawable/component ID for chain tuning." },
    ],
    adminCommands: []
  },
  {
    slug: "watermark-server-logo-script",
    name: "Watermark Server Logo Script",
    desc: "Simple server logo watermark display script for FiveM servers.",
    fullDesc: "Lightweight overlay script that displays your server logo and keeps branding visible while players are in-game.",
    price: "FREE",
    tag: "FREE",
    downloads: 19,
    updatedOn: "2026-05-06",
    imageUrl: "/bmtb-watermark-thumb.png",
    youtubeEmbed: "",
    buyUrl: TEBEX_FREE_CATEGORY_URL,
    gumroadUrl: "https://bankrollmadethisbeat.gumroad.com/l/xrfdt",
    acePermissions: [],
    requirements: [
      "None — standalone client overlay",
    ],
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
    notes: [
      "No ACE required. Lightweight NUI watermark / server logo overlay.",
    ],
    adminGuide: [
      "Swap logo PNG with your server branding.",
      "Tune position/opacity in resource config if available.",
      "No local ESX resource copy — verify overlay after Tebex download.",
    ],
    playerCommands: [],
    adminCommands: []
  },
  {
    slug: "bmtb-loading-screen",
    name: "BMTB Loading Screen",
    desc: "Premium animated loading screen with customizable branding support.",
    fullDesc: "Animated loading experience with clean transitions and customizable branding blocks for your server identity.",
    price: "FREE",
    tag: "FREE",
    downloads: 58,
    updatedOn: "2026-05-06",
    imageUrl: "/bmtb-loading-screen-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/7WA86HFSyPY?si=dtLFYxR1Y6FcvYeA",
    buyUrl: TEBEX_FREE_CATEGORY_URL,
    gumroadUrl: "https://bankrollmadethisbeat.gumroad.com/l/bpysy",
    acePermissions: [],
    requirements: [
      "None — standalone loadscreen resource",
    ],
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
      "Standalone — no framework dependency.",
    ],
    adminGuide: [
      "Replace asset files with your server branding before go-live.",
      "Ensure loadscreen starts early in server.cfg.",
      "Configure Discord/Tebex link blocks in CONFIG.",
      "No local ESX resource copy — verify assets after each Tebex update.",
    ],
    playerCommands: [],
    adminCommands: []
  },
  {
    slug: "bmtb-cooking",
    name: "BMTB Cooking",
    desc: "Interactive cooking/crafting gameplay system for roleplay servers.",
    fullDesc: "Roleplay-focused cooking and crafting system with configurable recipes and progression-ready gameplay loops.",
    price: "FREE",
    tag: "FREE",
    frameworks: ["ESX", "QBCore"],
    downloads: 107,
    assetId: "934974",
    updatedOn: "2026-04-30",
    imageUrl: "/bmtb-cooking-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/F44NM6_q-bM?si=edqVb7DIYfm5nnde",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtbcooking",
    gumroadUrl: "https://bankrollmadethisbeat.gumroad.com/l/qoupl",
    acePermissions: [],
    requirements: [
      "ox_lib",
      "ESX Legacy",
      "ox_inventory",
      "ox_target",
    ],
    installSteps: [
      "Drop bmtb_cooking into [scripts]/ or [bmtb]/.",
      "Merge install items (install me/items_ox_inventory.lua).",
      "Ensure order: ox_lib → es_extended → ox_inventory → ox_target → bmtb_cooking.",
      "ensure bmtb_cooking — place stove / use world grills and test skill-check cook.",
    ],
    updateNotes: [
      "Placeable stove and world grill cooking.",
      "Skill-check cooking loops.",
      "Coke brick + crack style outputs (config driven).",
    ],
    notes: [
      "No dedicated ACE on current builds.",
      "ESX Legacy only.",
    ],
    adminGuide: [
      "Merge portable stove item and cooking ingredients before go-live.",
      "Configure world grill locations and recipes in config.",
      "Test one portable stove placement and one world grill cook.",
    ],
    playerCommands: [
      { command: "portable_stove", usage: "Inventory item", description: "Place a portable stove and cook recipes with skill-check minigames." },
      { command: "World grills", usage: "ox_target / E-key", description: "Interact with configured world grill zones to cook." },
      { command: "/bmtb_potoffset", usage: "Debug", description: "Tune pot prop offset during development." },
    ],
    adminCommands: []
  },
  {
    slug: "bmtb-weapon-repair",
    name: "BMTB Weapon Repair",
    desc: "Weapon repair bench system with immersive crafting and repair flow.",
    fullDesc: "Bench-based repair mechanics with configurable costs and immersive interactions for realistic server economy gameplay.",
    price: "$10",
    tag: "PREMIUM",
    frameworks: ["ESX", "QBCore"],
    downloads: 0,
    assetId: "934956",
    version: "v1.2",
    updatedOn: "2026-03-25",
    imageUrl: "/bmtb-weapon-repair-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/MvgPu0LbuGM?si=plSjTNBaXd5G8xF_",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtbweaponrepair",
    gumroadUrl: "https://bankrollmadethisbeat.gumroad.com/l/rsclql",
    tebexUrl: "https://bmtbscripts.tebex.io/package/bmtbweaponrepair",
    infoHeading: "BMTB Weapon Repair - Release Build",
    updateNotes: [
      "Bench-based weapon repair with configurable costs.",
      "Attachment crafting system.",
      "Multi-framework ESX / QBCore auto-detect.",
    ],
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
      "Gunsmith bench commands are job-gated, not ACE-gated.",
      "Auto-detect weapons/ammo/attachments enabled by default.",
    ],
    acePermissions: [],
    adminGuide: [
      "Import SQL and gunsmith job data if using job-gated benches.",
      "Configure repair costs, farming zones, and bench locations in config.",
      "Test weapon repair and attachment crafting before go-live.",
    ],
    playerCommands: [
      { command: "/craft", usage: "At bench", description: "Open attachment crafting menu at a weapon bench." },
      { command: "Weapon bench", usage: "Target / item", description: "Repair weapons with configurable costs and animations." },
    ],
    adminCommands: [
      { command: "/placewbench", description: "Gunsmith job — place a weapon bench in the world.", ace: "Job: gunsmith" },
      { command: "/delwbench", description: "Gunsmith job — delete nearest placed weapon bench.", ace: "Job: gunsmith" },
    ]
  },
  {
    slug: "bmtb-wigs",
    name: "BMTB Wigs",
    desc: "Wig/hair inventory system with clothing integration and UI support.",
    fullDesc: "Inventory-backed wig system with appearance handling and framework-compatible integration hooks.",
    price: "$1",
    tag: "PREMIUM",
    frameworks: ["ESX", "QBCore"],
    downloads: 17,
    assetId: "934961",
    updatedOn: "2026-04-23",
    imageUrl: "https://dunb17ur4ymx4.cloudfront.net/packages/images/581b5174063646063e13bb2d9d6bdf1416188bda.png",
    youtubeEmbed: "https://www.youtube.com/embed/2mXbZH_iDxE?si=BHjRtOqM0P_22bmd",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtbwigs",
    gumroadUrl: "https://bankrollmadethisbeat.gumroad.com/l/qtoaao",
    tebexUrl: "https://bmtbscripts.tebex.io/package/bmtbwigs",
    acePermissions: [],
    requirements: [
      "ox_lib",
      "ESX Legacy",
      "Inventory backend (ox / qb / auto)",
    ],
    installSteps: [
      "Drop bmtb_wigs into [scripts]/ or [bmtb]/.",
      "Merge install-me items/images into inventory.",
      "Ensure ox_lib → es_extended → inventory → bmtb_wigs.",
      "Set craft spots in config.lua then restart and test /wigsale.",
    ],
    updateNotes: [
      "Wig craft stations with configurable spots.",
      "Street selling to spawned customers (/wigsale).",
      "Multi-inventory auto-detect.",
    ],
    notes: [
      "No dedicated ACE on current builds.",
      "ESX Legacy only.",
    ],
    adminGuide: [
      "Configure craft station coords in config.lua before go-live.",
      "Merge all wig items and craft ingredients.",
      "Test craft flow and one street sale run.",
    ],
    playerCommands: [
      { command: "/wigsale", description: "Start street wig selling — spawned customers approach to buy." },
      { command: "/wigstop", description: "Stop the active wig sale run." },
      { command: "Craft stations", usage: "Target / zones", description: "Craft wigs at configured station locations." },
      { command: "/wigzones", usage: "Debug", description: "Show configured sale/craft zone debug markers." },
    ],
    adminCommands: []
  },
  {
    slug: "bmtb-chopshop",
    name: "BMTB Chopshop",
    desc: "Vehicle chopshop gameplay with immersive roleplay mechanics.",
    fullDesc: "Vehicle dismantling and chopshop progression flow built for immersive roleplay and risk/reward gameplay.",
    price: "FREE",
    tag: "FREE",
    frameworks: ["ESX", "QBCore"],
    downloads: 120,
    assetId: "929525",
    updatedOn: "2026-03-19",
    imageUrl: "/bmtb-chopshop-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/b-TVVsLpa9w?si=TPmmcreaORLX7gCR",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtbchopshop",
    gumroadUrl: "https://bankrollmadethisbeat.gumroad.com/l/gsgrww",
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
      "ensure each resource in order, then test a full chop run.",
    ],
    updateNotes: [
      "Per-part welding chopshop gameplay.",
      "FX/sound sync with payout.",
      "Optional delete from player_vehicles / owned vehicles.",
    ],
    notes: [
      "Always start tasknotify + taskbar before bmtb_chopshop.",
      "Uses BMTB taskbar + tasknotify helpers from [bmtbchopshop] pack.",
    ],
    adminGuide: [
      "Always start bmtb-tasknotify and bmtb-taskbar before bmtb_chopshop.",
      "Configure chop locations, NPC, and payout in config.lua or setup.html.",
      "Enable PartChopDebugCommand in config only for development.",
      "Test one full part-chop payout before go-live.",
    ],
    playerCommands: [
      { command: "Chopshop location", usage: "NPC / marker", description: "Drive eligible vehicles to the chopshop — weld parts off for payout with taskbar UI." },
    ],
    adminCommands: [
      { command: "/bmtb_chop_debug", usage: "Config-gated", description: "Toggle part-chop debug logging (enable PartChopDebugCommand in config)." },
    ]
  },
  {
    slug: "bmtb-tuning",
    name: "BMTB Tuning",
    desc: "Audio/tuning customization system for immersive vehicle upgrades.",
    fullDesc: "Customization-focused tuning setup designed to improve vehicle identity and immersive server car culture.",
    price: "FREE",
    tag: "FREE",
    frameworks: ["ESX", "QBCore"],
    downloads: 45,
    assetId: "953633",
    updatedOn: "2026-04-11",
    imageUrl: "/bmtb-tuning-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/_ynXdeLBico?si=8d2lLynUDBTyXTi9",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtbtuning",
    gumroadUrl: "https://bankrollmadethisbeat.gumroad.com/l/bmtbtuning",
    acePermissions: [
      "add_ace group.admin bmtb_tuning.admin allow",
    ],
    requirements: [
      "ox_lib",
      "oxmysql",
      "ESX or QBCore",
      "ox_inventory or compatible inventory",
      "OneSync recommended",
    ],
    installSteps: [
      "Drop bmtb_tuning into [scripts]/.",
      "CRITICAL: ensure bmtb_tuning BEFORE ox_inventory.",
      "Ensure oxmysql → ox_lib → bmtb_tuning → framework → inventory.",
      "Add ACE: add_ace group.admin bmtb_tuning.admin allow",
      "Merge tuning_tablet item — test engine-sound NUI + persistence.",
    ],
    updateNotes: [
      "Engine-sound tablet NUI with per-vehicle persistence.",
      "Mechanic online checks / job gates (config).",
      "Multi-framework inventory bridges.",
    ],
    notes: [
      "Admin ACE: bmtb_tuning.admin",
      "Must start before ox_inventory.",
    ],
    adminGuide: [
      "Start bmtb_tuning before ox_inventory so item exports register.",
      "Add sv_enableNetworkedScriptEntityStates true in server.cfg.",
      "Grant bmtb_tuning.admin ACE for diagnostic commands.",
      "Test tablet item and verify engine sound persists after restart.",
    ],
    playerCommands: [
      { command: "tuning_tablet", usage: "Inventory item", description: "Open engine-sound tuning NUI — apply and save per-vehicle audio." },
      { command: "/tuningplate", usage: "Debug", description: "Print/debug current vehicle plate for persistence testing." },
    ],
    adminCommands: [
      { command: "/tuningrefreshcache", description: "Refresh server-side tuning cache from database.", ace: "bmtb_tuning.admin" },
      { command: "/tuningcheck", description: "Run diagnostics on tuning persistence for nearby/current vehicle.", ace: "bmtb_tuning.admin" },
      { command: "/tuningowned", description: "List owned vehicles with saved tuning data.", ace: "bmtb_tuning.admin" },
    ]
  },
  {
    slug: "bmtb-car-wipe",
    name: "BMTB Car Wipe",
    desc: "Vehicle wipe/cleanup utility script for FiveM administrators.",
    fullDesc: "Admin utility resource to clean up unused vehicles and keep performance stable across server sessions.",
    price: "FREE",
    tag: "FREE",
    downloads: 41,
    assetId: "958554",
    updatedOn: "2026-04-16",
    imageUrl: "/bmtb-car-wipe-thumb.png",
    youtubeEmbed: "",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtb-carwipe",
    gumroadUrl: "https://bankrollmadethisbeat.gumroad.com/l/bmtbcarwipe",
    acePermissions: [
      "add_ace group.admin bmtb_carwipe.admin allow",
    ],
    requirements: [
      "ox_lib",
      "oxmysql",
      "Optional framework for notifies / ESX admin groups",
    ],
    installSteps: [
      "Drop bmtb_carwipe into [scripts]/ or [bmtb]/.",
      "Add ACE: add_ace group.admin bmtb_carwipe.admin allow (or set Config.Admins identifiers).",
      "Tune wipe interval, zones, and whitelist in config.lua or setup.html.",
      "ensure bmtb_carwipe after ox_lib/oxmysql — test auto wipe + /carwipe.",
    ],
    updateNotes: [
      "Auto + command vehicle wipe with NUI countdown.",
      "Whitelisted zones support.",
      "Admin via ACE, identifiers, or ESX admin groups.",
    ],
    notes: [
      "ACE: bmtb_carwipe.admin (Config.UseAcePermission = true by default).",
      "Also supports Config.Admins identifiers and ESX admin groups.",
    ],
    adminGuide: [
      "Configure at least one admin method: ACE, Config.Admins identifiers, or ESX admin groups.",
      "Set whitelisted zones for garages, dealerships, and player-owned areas.",
      "Test manual /carwipe with countdown before enabling aggressive auto-wipe intervals.",
    ],
    playerCommands: [],
    adminCommands: [
      { command: "/carwipe", description: "Start a manual vehicle wipe countdown.", ace: "bmtb_carwipe.admin" },
      { command: "/carwipe [seconds]", description: "Start wipe with custom countdown duration.", ace: "bmtb_carwipe.admin" },
      { command: "/carwipe cancel", description: "Cancel an in-progress wipe countdown.", ace: "bmtb_carwipe.admin" },
      { command: "/carwipe status", description: "Show current wipe timer and zone status.", ace: "bmtb_carwipe.admin" },
      { command: "carwipe", usage: "Server console", description: "Same as /carwipe but from server console (source 0).", ace: "bmtb_carwipe.admin" },
    ]
  },
  {
    slug: "bmtb-recycle-job",
    name: "BMTB Recycle Job",
    desc: "Beginner-friendly recycling side hustle with foreman NPC, sorting, and cash payouts.",
    fullDesc: "Clock in at the yard, grab boxes, sort recyclable material, and sell for cash. Supports ESX, QBCore, and Qbox with ox_lib menus, carry animations, and configurable locations and payouts.",
    price: "FREE",
    tag: "FREE",
    frameworks: ["ESX", "QBCore"],
    downloads: 1,
    updatedOn: "2026-05-28",
    imageUrl: "/bmtb-recycle-job-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/HXxlSWHGpBg",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtb-recyclejob",
    gumroadUrl: "https://bankrollmadethisbeat.gumroad.com/l/faxqs",
    requirements: [
      "ox_lib",
      "ESX Legacy / QBCore / Qbox",
      "ox_inventory recommended",
    ],
    installSteps: [
      "Drop bmtb_recyclingjob (or bmtb-recycle-job folder) into resources/[scripts]/.",
      "Add recycle_material and related items to your inventory.",
      "Ensure ox_lib → framework → inventory → recycling job resource.",
      "Add ensure bmtb_recyclingjob to server.cfg.",
      "Edit config.lua for yard location, payout, and blip settings.",
    ],
    acePermissions: [],
    adminGuide: [
      "Configure yard foreman NPC, sorting zones, and payout rates in config.lua.",
      "Add recycle items to inventory before go-live.",
      "No local ESX resource copy — verify install steps match your Tebex download folder name.",
      "Test clock-in → grab box → sort → sell loop once before opening job.",
    ],
    playerCommands: [
      { command: "Recycle yard", usage: "NPC / zones", description: "Clock in at foreman NPC, grab boxes, sort material, sell for cash payout." },
    ],
    adminCommands: [],
    notes: [
      "Resource folder may be bmtb_recyclingjob on server — match your Tebex download.",
      "No dedicated ACE — config-driven job locations and payouts.",
    ],
    updateNotes: [
      "Beginner-friendly recycling side hustle with foreman NPC.",
      "Sorting minigame and cash payouts.",
      "ESX / QBCore / Qbox support with ox_lib menus.",
    ]
  },
  {
    slug: "bmtb-givecar",
    name: "BMTB Givecar",
    desc: "Vehicle giveaway and ownership transfer utility script.",
    fullDesc: "Simple and reliable vehicle ownership assignment utility for staff workflows and giveaways.",
    price: "FREE",
    tag: "FREE",
    frameworks: ["ESX"],
    downloads: 43,
    assetId: "958555",
    updatedOn: "2026-04-16",
    imageUrl: "/bmtb-givecar-thumb.png",
    youtubeEmbed: "",
    buyUrl: "https://bmtbscripts.tebex.io/package/7397118",
    gumroadUrl: "https://bankrollmadethisbeat.gumroad.com/l/bmtbgivecar",
    acePermissions: [
      "add_ace group.admin bmtb_givecar.command allow",
    ],
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
      "ACE + AuthorizedRanks gates.",
    ],
    notes: [
      "Admin ACE: bmtb_givecar.command",
      "Also checks AuthorizedRanks in config.",
    ],
    adminGuide: [
      "Grant bmtb_givecar.command ACE to authorized staff.",
      "Configure AuthorizedRanks in config.lua as fallback.",
      "Run optional unique-plate SQL if your garage requires it.",
      "Test spawn, transfer, and delete flows before giving staff access.",
    ],
    playerCommands: [
      { command: "/givecar [id]", description: "Transfer ownership of the vehicle you are seated in to another player." },
    ],
    adminCommands: [
      { command: "/givecar me", description: "Spawn a vehicle for yourself (admin).", ace: "bmtb_givecar.command" },
      { command: "/givecar [id] [model]", description: "Spawn a vehicle model for a player.", ace: "bmtb_givecar.command" },
      { command: "/givecar offline [identifier] [model]", description: "Give a vehicle to an offline player by identifier.", ace: "bmtb_givecar.command" },
      { command: "/giveplane [id] [model]", description: "Spawn a plane for a player.", ace: "bmtb_givecar.command" },
      { command: "/giveboat [id] [model]", description: "Spawn a boat for a player.", ace: "bmtb_givecar.command" },
      { command: "/giveheli [id] [model]", description: "Spawn a helicopter for a player.", ace: "bmtb_givecar.command" },
      { command: "/delcarplate [plate]", description: "Delete a vehicle from the database by plate.", ace: "bmtb_givecar.command" },
      { command: "/listcars [id]", description: "List owned vehicles for a player.", ace: "bmtb_givecar.command" },
      { command: "/givecarmenu", description: "Open admin vehicle giveaway menu.", ace: "bmtb_givecar.command" },
    ]
  },
  {
    slug: "bmtb-nocrosshair",
    name: "BMTB NoCrosshair",
    desc: "Lightweight no-crosshair immersion script for realistic combat.",
    fullDesc: "Minimal script that removes crosshair UI for improved realism and roleplay-focused combat feel.",
    price: "FREE",
    tag: "FREE",
    downloads: 16,
    assetId: "958557",
    updatedOn: "2026-04-16",
    imageUrl: "/bmtb-nocrosshair-thumb.png",
    youtubeEmbed: "",
    buyUrl: "https://bmtbscripts.tebex.io/package/7397124",
    gumroadUrl: "https://bankrollmadethisbeat.gumroad.com/l/bmtbnocrosshair",
    acePermissions: [],
    requirements: [
      "None — standalone client script",
    ],
    installSteps: [
      "Drop bmtb_nocrosshair into [scripts]/ or [bmtb]/.",
      "ensure bmtb_nocrosshair (no config required on stock builds).",
      "Restart and confirm default GTA crosshair/reticle is hidden.",
    ],
    updateNotes: [
      "Hides default GTA crosshair / reticle.",
      "Client-only standalone resource.",
    ],
    notes: [
      "No ACE required.",
      "Client-only standalone resource.",
    ],
    adminGuide: [
      "No configuration required for stock install.",
      "Players can toggle crosshair visibility with /crosshair if enabled in config.",
    ],
    playerCommands: [
      { command: "/crosshair", description: "Toggle personal crosshair/reticle visibility on or off." },
    ],
    adminCommands: []
  },
  {
    slug: "bmtb-itemslist",
    name: "BMTB ITEMSLIST",
    desc: "Clean item list viewer for ESX/QBCore inventory systems.",
    fullDesc: "Item browser and quick lookup page for inventory systems so players and staff can view available items easily.",
    price: "FREE",
    tag: "FREE",
    frameworks: ["ESX", "QBCore"],
    downloads: 32,
    assetId: "958558",
    updatedOn: "2026-04-16",
    imageUrl: "/bmtb-itemslist-thumb.png",
    youtubeEmbed: "",
    buyUrl: "https://bmtbscripts.tebex.io/package/7397120",
    gumroadUrl: "https://bankrollmadethisbeat.gumroad.com/l/bmtbitemslist",
    acePermissions: [
      "add_ace group.admin bmtb_itemslist.admin allow",
    ],
    requirements: [
      "ox_lib",
      "ESX or QBCore",
      "Inventory backend (ox / qb / multi-inventory bridge)",
    ],
    installSteps: [
      "Drop bmtb_itemslist into [scripts]/ or [bmtb]/.",
      "Ensure ox_lib → framework → inventory → bmtb_itemslist.",
      "Add ACE: add_ace group.admin bmtb_itemslist.admin allow",
      "Enable Config.UseAcePermission if using ACE gating.",
      "ensure bmtb_itemslist — open with /itemslist or configured keybind.",
    ],
    updateNotes: [
      "Admin item catalog NUI with spawn to self/others.",
      "Multi-framework inventory bridges.",
      "Audit log support on many builds.",
    ],
    notes: [
      "ACE: bmtb_itemslist.admin (enable Config.UseAcePermission in config).",
      "QBPermissions / AdminGroups often used as fallback.",
    ],
    adminGuide: [
      "Grant bmtb_itemslist.admin ACE (or configure QBPermissions / AdminGroups).",
      "Enable audit logging in config if you want spawn tracking.",
      "Test spawn-to-self before giving full staff access.",
    ],
    playerCommands: [],
    adminCommands: [
      { command: "/itemslist", usage: "Page Down keybind", description: "Open admin item catalog NUI — search, spawn to self or others.", ace: "bmtb_itemslist.admin" },
    ]
  },
  {
    slug: "bmtb-moneywash",
    name: "BMTB Moneywash",
    desc: "Dirty money washing system with ESX, QBCore, and Qbox support.",
    fullDesc: "Money wash script with progress UX and framework support across ESX, QBCore, and Qbox, designed for realistic economy loops.",
    price: "FREE",
    tag: "FREE",
    frameworks: ["ESX", "QBCore"],
    downloads: 40,
    assetId: "967147",
    updatedOn: "2026-04-24",
    imageUrl: "/bmtb-moneywash-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/FwjHLkQs1O0?si=0BDRXL3dVHHUKANS",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtbmoneywash",
    gumroadUrl: "https://bankrollmadethisbeat.gumroad.com/l/bmtbmoneywash",
    acePermissions: [
      "add_ace group.admin bmtb_moneywash.admin allow",
    ],
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
      "ensure bmtb_moneywash — place washers with /moneywashplace and test wash flow.",
    ],
    updateNotes: [
      "Dirty → clean money wash with NUI progress.",
      "MySQL-backed washer locations + ghost placement.",
      "Multi-framework bridges.",
    ],
    notes: [
      "Admin ACE: bmtb_moneywash.admin",
      "FrameworkAdminGroups fallback supported on many builds.",
      "Optional bmtb_realmoney integration for physical dirty cash.",
    ],
    adminGuide: [
      "Import SQL or allow auto-migration on first start.",
      "Grant bmtb_moneywash.admin ACE to staff who manage washer locations.",
      "Place at least one washer with /moneywashplace before opening to players.",
      "Configure wash fee and dirty-money item names in config.lua.",
    ],
    playerCommands: [
      { command: "Money wash prop", usage: "ox_target / E-key", description: "Interact with placed washer props — deposit dirty money, NUI progress, receive clean payout." },
    ],
    adminCommands: [
      { command: "/moneywashadd [model]", description: "Add a washer prop model to the placement list.", ace: "bmtb_moneywash.admin" },
      { command: "/moneywashremove [id]", description: "Remove a washer by database ID.", ace: "bmtb_moneywash.admin" },
      { command: "/moneywashprop", description: "Preview/adjust washer prop at your position.", ace: "bmtb_moneywash.admin" },
      { command: "/moneywashplace", description: "Ghost-place a new washer at your location (saved to MySQL).", ace: "bmtb_moneywash.admin" },
      { command: "/moneywashrefresh", description: "Reload all washer props from database.", ace: "bmtb_moneywash.admin" },
      { command: "/moneywashlist", description: "List all placed washers with IDs and fees.", ace: "bmtb_moneywash.admin" },
      { command: "/moneywashfee [id] [fee]", description: "Set wash fee percentage for a washer.", ace: "bmtb_moneywash.admin" },
    ]
  },
];

// YouTube publish dates from @BMTBScripts/videos (newest uploads first).
const YOUTUBE_PUBLISH_DATES = {
  Y692o3yh944: "2026-08-11", // BMTB Physical Therapy
  QKEgxFD4f7Q: "2026-08-04", // BMTB Real Money
  "7zQVfRVvzWY": "2026-07-24", // BMTB Scamming
  qHyIuxg061o: "2026-06-24", // BMTB Pill Press
  w6uihCRH7fM: "2026-06-21", // BMTB Strippers
  PURhGct3rM4: "2026-06-15", // BMTB Trap Phone
  tNFsXiSSogM: "2026-06-11", // BMTB GoFetch
  HXxlSWHGpBg: "2026-05-28", // BMTB Recycle Job
  NvCfSDMEXDA: "2026-05-17", // BMTB Lean
  FwjHLkQs1O0: "2026-04-24", // BMTB Moneywash
  _ynXdeLBico: "2026-04-11", // BMTB Tuning
  "b-TVVsLpa9w": "2026-03-19", // BMTB Chopshop
  "2mXbZH_iDxE": "2026-03-09", // BMTB Wigs
  MvgPu0LbuGM: "2026-03-02", // BMTB Weapon Repair
  "F44NM6_q-bM": "2026-02-18", // BMTB Cooking
  "7WA86HFSyPY": "2026-02-13", // BMTB Loading Screen
  H_YG2Vr96bE: "2026-01-31", // BMTB Chains
  hW0s1sO1F9A: "2026-01-13", // BMTB PODS 2.0
};

const productBySlug = products.reduce((acc, product) => {
  acc[product.slug] = product;
  return acc;
}, {});

const TEST_CASES = [
  { name: "Discord link is present", pass: DISCORD_URL === "https://discord.gg/5rRMZ2R9EP" },
  { name: "At least 3 scripts are listed", pass: products.length >= 3 },
  { name: "Every product has a valid price", pass: products.every((product) => product.price === "FREE" || /^\$\d/.test(product.price)) },
  { name: "Every product has a slug", pass: products.every((product) => Boolean(product.slug)) },
  {
    name: "Every paid script has a direct buy link",
    pass: products.filter((product) => product.price !== "FREE").every((product) => Boolean(product.buyUrl)),
  },
];

function runSelfChecks() {
  const failed = TEST_CASES.filter((test) => !test.pass);
  if (failed.length > 0) {
    console.warn("BMTB Scripts website self-check failed:", failed.map((test) => test.name).join(", "));
  }
}

runSelfChecks();

const FRAMEWORK_TAG_STYLES = {
  ESX: "border-white/10 bg-white/[0.04] text-bmtb-muted",
  QBCore: "border-white/10 bg-white/[0.04] text-bmtb-muted",
  Qbox: "border-white/10 bg-white/[0.04] text-bmtb-muted",
  OX: "border-white/10 bg-white/[0.04] text-bmtb-muted",
};

function isProductNew(product) {
  return product?.slug === "bmtb-physical-therapy" || product?.slug === "bmtb-real-money" || product?.slug === "bmtb-scamming" || product?.slug === "bmtb-pillpress";
}

function hasGumroadLink(product) {
  return Boolean(product?.gumroadUrl);
}

function NewBadge({ size = "sm" }) {
  const sizeClass = size === "md"
    ? "px-3 py-1 text-xs"
    : "px-2.5 py-1 text-[10px]";

  return (
    <span className={`rounded-full border border-bmtb-accent/40 bg-bmtb-accent-soft font-semibold uppercase tracking-wide text-bmtb-accent ${sizeClass}`}>
      New
    </span>
  );
}

function FrameworkTags({ frameworks, size = "sm" }) {
  if (!frameworks?.length) {
    return null;
  }

  const sizeClass = size === "md"
    ? "px-3 py-1 text-xs"
    : "px-2.5 py-1 text-[10px]";

  return (
    <div className="flex flex-wrap gap-2">
      {frameworks.map((framework) => (
        <span
          key={framework}
          className={`rounded-full border font-semibold uppercase tracking-wide ${sizeClass} ${FRAMEWORK_TAG_STYLES[framework] || FRAMEWORK_TAG_STYLES.OX}`}
        >
          {framework === "QBCore" ? "QB" : framework}
        </span>
      ))}
    </div>
  );
}

function getProductVersion(product) {
  return product.version || "v1.0";
}

function getNumericPrice(price) {
  if (price === "FREE") {
    return 0;
  }
  return Number(String(price).replace(/[^0-9.]/g, "")) || 0;
}

function getTebexLink(product) {
  if (product?.buyUrl?.includes("tebex.io")) {
    return product.buyUrl;
  }
  if (product?.tebexUrl) {
    return product.tebexUrl;
  }
  return product?.price === "FREE" ? TEBEX_FREE_CATEGORY_URL : `${TEBEX_STORE_URL}/category/premium-scripts`;
}

function getGumroadLink(product) {
  return product?.gumroadUrl || null;
}

function getGithubLink(product) {
  if (!product?.githubUrl || product.tag !== "FREE") {
    return null;
  }
  return product.githubUrl;
}

function getYoutubeVideoId(product) {
  const embed = product?.youtubeEmbed || "";
  const match = embed.match(/(?:embed\/|youtu\.be\/|v=)([A-Za-z0-9_-]{11})/);
  return match?.[1] || null;
}

function getProductSortDate(product) {
  const videoId = getYoutubeVideoId(product);
  if (videoId && YOUTUBE_PUBLISH_DATES[videoId]) {
    return YOUTUBE_PUBLISH_DATES[videoId];
  }
  return product?.updatedOn || "";
}

function sortProductsByDownloads(list) {
  return [...list].sort((a, b) => {
    const downloadDiff = (b.downloads ?? 0) - (a.downloads ?? 0);
    if (downloadDiff !== 0) {
      return downloadDiff;
    }
    return a.name.localeCompare(b.name);
  });
}

function sortProductsByNewest(list) {
  return [...list].sort((a, b) => {
    const dateDiff = new Date(getProductSortDate(b)).getTime() - new Date(getProductSortDate(a)).getTime();
    if (dateDiff !== 0) {
      return dateDiff;
    }
    return a.name.localeCompare(b.name);
  });
}

function ProductCard({ product, featured = false }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-bmtb-line bg-bmtb-card shadow-soft transition-shadow duration-500 ease-luxury hover:border-bmtb-accent/35 hover:shadow-accent"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-bmtb-accent/10 blur-3xl" />
      </div>

      {product.imageUrl && (
        <div className={`${featured ? "p-4 pb-0" : "p-3 pb-0"}`}>
          <div className="overflow-hidden rounded-xl border border-bmtb-line bg-bmtb-elevated shadow-soft">
            <div className="flex items-center gap-1.5 border-b border-bmtb-line bg-bmtb-elevated px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="ml-2 truncate text-[10px] text-bmtb-muted">{product.name}</span>
            </div>
            <div className="overflow-hidden">
              <img
                src={product.imageUrl}
                alt={`${product.name} preview`}
                loading="lazy"
                decoding="async"
                className={`w-full object-cover object-center transition duration-700 ease-luxury group-hover:scale-[1.06] ${featured ? "h-52" : "h-44"}`}
              />
            </div>
          </div>
        </div>
      )}

      <div className="relative p-5 md:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <FrameworkTags frameworks={product.frameworks} />
          {isProductNew(product) && <NewBadge />}
        </div>
        <h3 className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-bmtb-muted">{product.desc}</p>
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-bmtb-line pt-5">
          <p className="font-display text-xl font-bold text-bmtb-accent">{product.price}</p>
          <Link
            to={`/scripts/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition duration-300 ease-luxury group-hover:text-bmtb-accent"
          >
            View Product <Icon name="chevron" size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function SupportSection() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = (event) => {
    event.preventDefault();
    const emailSubject = encodeURIComponent(subject.trim() || "BMTB Scripts Support Request");
    const emailBody = encodeURIComponent(message.trim());
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${emailSubject}&body=${emailBody}`;
  };

  return (
    <section id="support" className="mx-auto max-w-7xl px-6 py-20">
      <div className="bmtb-panel p-8 md:p-10">
        <div className="mb-8 text-center md:text-left">
          <p className="bmtb-eyebrow">Support</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">Get help from BMTB</h2>
          <p className="mt-4 max-w-2xl text-bmtb-muted">
            Send us an email for setup help, script questions, or store issues. You can also join Discord for faster community support.
          </p>
        </div>

        <form onSubmit={handleSendEmail} className="grid gap-4">
          <div>
            <label htmlFor="support-subject" className="mb-2 block text-sm font-medium text-bmtb-muted">
              Subject
            </label>
            <input
              id="support-subject"
              type="text"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="What do you need help with?"
              required
              className="bmtb-input"
            />
          </div>

          <div>
            <label htmlFor="support-message" className="mb-2 block text-sm font-medium text-bmtb-muted">
              Message
            </label>
            <textarea
              id="support-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Describe your issue, script name, framework, and any error messages."
              required
              rows={6}
              className="bmtb-input resize-y"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="bmtb-btn-primary">
              Send Email
            </button>
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="bmtb-btn-secondary">
              <Icon name="message" className="mr-2" size={18} /> Join Discord
            </a>
          </div>

          <p className="text-xs text-bmtb-muted">
            Send opens your email app with your message addressed to {SUPPORT_EMAIL}.
          </p>
        </form>
      </div>
    </section>
  );
}

function SupportPage() {
  return <SupportSection />;
}

function LiveStatusBar() {
  const chips = [
    { label: "Scripts", value: products.length, animated: true },
    { label: "Lifetime Updates", icon: true },
    { label: "Discord Support", icon: true },
    { label: "ESX & QB Ready", icon: true },
  ];

  return (
    <div className="border-b border-bmtb-line bg-bmtb-bg/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-2.5 text-xs text-bmtb-muted md:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {chips.map((chip) => (
            <span key={chip.label} className="inline-flex items-center gap-1.5">
              <Icon name="check" size={12} className="text-bmtb-accent" />
              {chip.animated ? (
                <span className="text-white">
                  <AnimatedCount value={chip.value} /> {chip.label}
                </span>
              ) : (
                <span>{chip.label}</span>
              )}
            </span>
          ))}
        </div>
        <span className="hidden text-bmtb-muted/80 md:inline">Premium FiveM Development</span>
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/scripts", label: "Scripts" },
  { to: "/docs", label: "Documentation" },
  { to: "/support", label: "Support" },
];

function SiteHeader() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-bmtb-line bg-bmtb-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <img
            src="/bmtb-logo.png"
            alt="BMTB logo"
            loading="eager"
            decoding="async"
            className="h-9 w-9 rounded-xl border border-bmtb-line bg-bmtb-card object-contain p-1 transition duration-300 group-hover:border-bmtb-accent/40"
          />
          <span className="font-display text-lg font-bold tracking-tight">BMTB</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-bmtb-muted md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="transition duration-300 hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/scripts"
            className="hidden items-center gap-2 rounded-xl border border-bmtb-line bg-white/[0.03] px-3 py-2 text-xs text-bmtb-muted transition duration-300 hover:border-white/20 hover:text-white md:inline-flex"
            aria-label="Search scripts"
          >
            <Icon name="search" size={14} /> Search
          </Link>
          <a href={TEBEX_STORE_URL} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-xl border border-bmtb-line bg-white/[0.03] px-3 py-2 text-xs text-bmtb-muted transition duration-300 hover:border-white/20 hover:text-white sm:inline-flex">
            Tebex
          </a>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="bmtb-btn-primary px-4 py-2 text-xs sm:text-sm">
            Discord
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-bmtb-line bg-white/[0.03] text-bmtb-muted transition hover:border-white/20 hover:text-white md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <Icon name={mobileOpen ? "close" : "menu"} size={18} />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="border-t border-bmtb-line bg-bmtb-bg/95 px-6 py-4 md:hidden">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-3 text-sm transition ${
                    location.pathname === link.to || (link.to !== "/" && location.pathname.startsWith(link.to))
                      ? "bg-bmtb-accent-soft font-semibold text-bmtb-accent"
                      : "text-bmtb-muted hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-bmtb-line pt-4">
            <a href={TEBEX_STORE_URL} target="_blank" rel="noreferrer" className="bmtb-btn-secondary px-3 py-2.5 text-center text-xs">
              Tebex
            </a>
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="bmtb-btn-primary px-3 py-2.5 text-center text-xs">
              Discord
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function AceCopyRow({ ace }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ace);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <li className="flex items-stretch gap-2">
      <code className="min-w-0 flex-1 rounded-lg border border-bmtb-line bg-bmtb-elevated/80 px-3 py-2 text-xs text-bmtb-accent md:text-sm">
        {ace}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-bmtb-line bg-white/[0.03] px-3 text-xs font-semibold text-bmtb-muted transition hover:border-bmtb-accent/40 hover:text-bmtb-accent"
        aria-label={copied ? "Copied" : "Copy ACE line"}
      >
        <Icon name={copied ? "check" : "copy"} size={14} />
        {copied ? "Copied" : "Copy"}
      </button>
    </li>
  );
}

function CommandRow({ entry, variant = "player" }) {
  const label = variant === "admin" ? "Admin" : "Player";
  return (
    <li className="rounded-xl border border-bmtb-line bg-bmtb-elevated/60 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <code className="rounded bg-white/5 px-2 py-1 text-sm font-semibold text-bmtb-accent">
              {entry.command}
            </code>
            {entry.usage && (
              <span className="text-xs text-bmtb-muted">{entry.usage}</span>
            )}
          </div>
          <p className="mt-2 text-sm leading-6 text-bmtb-muted">{entry.description}</p>
        </div>
        {entry.ace && (
          <span className="shrink-0 rounded-full border border-bmtb-accent/30 bg-bmtb-accent-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-bmtb-accent">
            ACE: {entry.ace}
          </span>
        )}
      </div>
      <span className="sr-only">{label} command</span>
    </li>
  );
}

function HomePage() {
  const popularProducts = sortProductsByDownloads(products).slice(0, 3);
  const popularJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: popularProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.desc,
        image: product.imageUrl,
        url: `/scripts/${product.slug}`,
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: getNumericPrice(product.price),
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(popularJsonLd) }} />

      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="flex flex-wrap items-center gap-3 md:gap-5">
              <p className="font-display text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-[5.5rem]">
                BMTB
              </p>
              <img
                src="/bmtb-cursor-loop.gif"
                alt=""
                aria-hidden="true"
                className="h-20 w-auto shrink-0 opacity-95 sm:h-24 md:h-32 lg:h-40"
                loading="eager"
                decoding="async"
              />
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Premium FiveM Development
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-bmtb-muted md:text-xl">
              Built for modern RP servers.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/80">
              {["Optimized.", "Maintained.", "Trusted."].map((word) => (
                <span key={word} className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-bmtb-accent" />
                  {word}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/scripts" className="bmtb-btn-primary px-8 py-4 text-base">
                Browse Scripts <Icon name="chevron" className="ml-2" size={18} />
              </Link>
              <a href={TEBEX_CUSTOM_SCRIPT_PACKAGE_URL} target="_blank" rel="noreferrer" className="bmtb-btn-secondary px-8 py-4 text-base">
                Custom Script Package
              </a>
              <a href={DISCORD_URL} className="bmtb-btn-secondary px-8 py-4 text-base">
                Join Discord
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="bmtb-divider mx-auto max-w-7xl" />

      <section className="mx-auto max-w-7xl px-6 pt-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="bmtb-glass overflow-hidden rounded-2xl border border-bmtb-accent/20"
        >
          <div className="grid md:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 md:p-8">
              <p className="bmtb-eyebrow">Custom Development</p>
              <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">Custom Script Package</h2>
              <p className="mt-3 text-sm leading-7 text-bmtb-muted md:text-base">
                Open a ticket and let&apos;s bring your idea to life. Custom script packages built for ESX Legacy, QBCore, or Standalone — ~3 business day turnaround on most projects.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={TEBEX_CUSTOM_SCRIPT_PACKAGE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="bmtb-btn-primary px-6 py-3"
                >
                  Tebex <Icon name="chevron" className="ml-2" size={18} />
                </a>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="bmtb-btn-secondary px-6 py-3"
                >
                  Discord
                </a>
              </div>
            </div>
            <div className="border-t border-bmtb-line md:border-l md:border-t-0">
              <img
                src="/bmtb-custom-script-package.png"
                alt="Custom Script Ticket — what to include in your order"
                className="h-full min-h-[260px] w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="bmtb-glass overflow-hidden rounded-2xl"
        >
          <div className="grid md:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 md:p-8">
              <p className="bmtb-eyebrow">New Release</p>
              <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">BMTB Physical Therapy v1.1.1</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-bmtb-muted md:text-base">
                Rehab RP with yoga mat sessions, skill-check exercises, therapy areas, optional Wasabi crutch bridge, and a full /ptadmin setup panel for ESX, QBCore, and Qbox.
              </p>
              <p className="mt-3 font-display text-xl font-bold text-bmtb-accent">FREE</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/scripts/bmtb-physical-therapy" className="bmtb-btn-primary px-6 py-3">
                  View Product
                </Link>
                <a href="https://bmtbscripts.tebex.io/package/bmtb-physicaltherapy" target="_blank" rel="noreferrer" className="bmtb-btn-secondary px-6 py-3">
                  Download on Tebex
                </a>
              </div>
            </div>
            <div className="border-t border-bmtb-line md:border-l md:border-t-0">
              <img
                src="/bmtb-physical-therapy-thumb.png"
                alt="BMTB Physical Therapy preview"
                className="h-full min-h-[220px] w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="bmtb-glass overflow-hidden rounded-2xl"
        >
          <div className="grid md:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 md:p-8">
              <p className="bmtb-eyebrow">Also New</p>
              <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">BMTB Real Money</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-bmtb-muted md:text-base">
                Real cash. Real RP. No fake money — physical bills, store registers, change-making, player handoffs, and dirty money for ESX, QBCore, and Qbox.
              </p>
              <p className="mt-3 font-display text-xl font-bold text-bmtb-accent">$5</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/scripts/bmtb-real-money" className="bmtb-btn-primary px-6 py-3">
                  View Product
                </Link>
                <a href="https://bmtbscripts.tebex.io/package/bmtb-real-money" target="_blank" rel="noreferrer" className="bmtb-btn-secondary px-6 py-3">
                  Buy on Tebex
                </a>
              </div>
            </div>
            <div className="border-t border-bmtb-line md:border-l md:border-t-0">
              <img
                src="/bmtb-real-money-thumb.png"
                alt="BMTB Real Money preview"
                className="h-full min-h-[220px] w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="bmtb-glass rounded-2xl p-6 md:p-8"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="bmtb-eyebrow">Coming Soon</p>
              <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">BMTB BagDrugs</h2>
              <p className="mt-2 max-w-xl text-sm text-bmtb-muted md:text-base">
                Releasing August 14, 2026 at 2:00 PM ET on Tebex.
              </p>
            </div>
            <div className="w-full max-w-md">
              <ComingSoonCountdown
                targetDate={BAG_DRUGS_RELEASE_AT}
                liveMessage="Release live — check the store for BMTB BagDrugs."
              />
            </div>
          </div>
        </motion.div>
      </section>

      <section id="popular-scripts" className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="bmtb-eyebrow">Store</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">Most Downloaded</h2>
            <p className="mt-3 max-w-lg text-bmtb-muted">Top BMTB scripts by Tebex and Gumroad downloads.</p>
          </div>
          <Link to="/scripts" className="inline-flex items-center gap-2 text-sm font-semibold text-bmtb-accent transition hover:text-white">
            View all scripts <Icon name="chevron" size={16} />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {popularProducts.map((product) => (
            <ProductCard key={product.slug} product={product} featured />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link to="/scripts" className="bmtb-btn-primary px-8 py-4">
            Browse all scripts
          </Link>
        </div>
      </section>
    </>
  );
}

const CATALOG_FILTERS = [
  { id: "all", label: "All" },
  { id: "FREE", label: "Free" },
  { id: "PREMIUM", label: "Premium" },
  { id: "ESX", label: "ESX" },
  { id: "QBCore", label: "QBCore" },
  { id: "Qbox", label: "Qbox" },
];

function ScriptsCatalogPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const catalogProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesQuery = !normalizedQuery || (
        product.name.toLowerCase().includes(normalizedQuery)
        || product.desc.toLowerCase().includes(normalizedQuery)
        || product.tag.toLowerCase().includes(normalizedQuery)
        || product.frameworks?.some((framework) => framework.toLowerCase().includes(normalizedQuery))
      );

      const matchesFilter = activeFilter === "all"
        || product.tag === activeFilter
        || product.frameworks?.includes(activeFilter);

      return matchesQuery && matchesFilter;
    });

    return sortProductsByNewest(filtered);
  }, [query, activeFilter]);

  const catalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: catalogProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.desc,
        image: product.imageUrl,
        url: `/scripts/${product.slug}`,
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: getNumericPrice(product.price),
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <section id="scripts" className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }} />
      <div className="mb-12">
        <p className="bmtb-eyebrow">Catalog</p>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">All Scripts</h2>
        <p className="mt-4 max-w-lg text-bmtb-muted">Browse the full BMTB Scripts catalog with previews, pricing, and info pages.</p>
      </div>
      <div className="mb-10">
        <div className="relative">
          <Icon name="search" size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-bmtb-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search scripts by name, tag, or description"
            className="bmtb-input pl-11"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {CATALOG_FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition duration-300 ease-luxury ${
                  isActive
                    ? "border-bmtb-accent bg-bmtb-accent text-black shadow-accent"
                    : "border-bmtb-line bg-bmtb-card/60 text-bmtb-muted hover:border-white/20 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
      {catalogProducts.length === 0 ? (
        <div className="bmtb-panel p-12 text-center">
          <p className="font-display text-xl font-bold text-white">No scripts match your filters</p>
          <p className="mt-2 text-sm text-bmtb-muted">Try clearing the search or choosing a different tag.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {catalogProducts.map((product) => (
            <ProductCard key={`${product.slug}-all`} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

function DetailSection({ eyebrow, title, children }) {
  return (
    <section className="scroll-mt-28">
      <p className="bmtb-eyebrow">{eyebrow}</p>
      {title && <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ScriptInfoPage() {
  const { slug } = useParams();
  const product = productBySlug[slug];
  const tebexLink = product ? getTebexLink(product) : TEBEX_FREE_CATEGORY_URL;
  const gumroadLink = product ? getGumroadLink(product) : GUMROAD_STORE_URL;
  const showGumroad = product ? hasGumroadLink(product) : true;
  const githubLink = product ? getGithubLink(product) : null;
  const mobileActionCols = 2 + (showGumroad ? 1 : 0) + (githubLink ? 1 : 0);

  if (!product) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="bmtb-panel p-10 text-center">
          <h1 className="font-display text-3xl font-bold">Script not found</h1>
          <p className="mt-3 text-bmtb-muted">This info page does not exist yet.</p>
          <Link to="/scripts" className="bmtb-btn-primary mt-6">
            Back to scripts
          </Link>
        </div>
      </section>
    );
  }

  const faqItems = [
    ["What frameworks are supported?", product.frameworks?.length ? product.frameworks.join(", ") : "See product details."],
    ["Where do I get support?", "Join the BMTB Discord or email support from the Support page."],
    ["How do I download?", showGumroad ? "Use Tebex or Gumroad links in the Purchase section below." : "Use the Tebex download link in the Purchase section below."],
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
      <Link to="/scripts" className="inline-flex items-center gap-2 text-sm font-semibold text-bmtb-muted transition hover:text-bmtb-accent">
        <Icon name="chevron" size={16} className="rotate-180" /> Back to all scripts
      </Link>

      <div className="sticky bottom-3 z-20 mt-4 grid gap-2 rounded-2xl border border-bmtb-line bg-bmtb-bg/90 p-2 backdrop-blur-xl md:hidden" style={{ gridTemplateColumns: `repeat(${mobileActionCols}, minmax(0, 1fr))` }}>
        <a href={tebexLink} target="_blank" rel="noreferrer" className="bmtb-btn-primary px-3 py-2 text-xs">
          Download
        </a>
        {showGumroad && gumroadLink && (
          <a href={gumroadLink} target="_blank" rel="noreferrer" className="bmtb-btn-secondary px-3 py-2 text-xs">
            Gumroad
          </a>
        )}
        {githubLink && (
          <a href={githubLink} target="_blank" rel="noreferrer" className="bmtb-btn-secondary px-3 py-2 text-xs">
            GitHub
          </a>
        )}
        <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="bmtb-btn-secondary px-3 py-2 text-xs">
          Discord
        </a>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 overflow-hidden rounded-2xl border border-bmtb-line bg-bmtb-card shadow-soft"
      >
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={`${product.name} hero`} className="aspect-[21/9] w-full object-cover md:aspect-[2.4/1]" />
        ) : (
          <div className="flex aspect-[2.4/1] items-center justify-center bg-bmtb-elevated text-bmtb-muted">No preview image</div>
        )}
        <div className="border-t border-bmtb-line p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-bmtb-accent/30 bg-bmtb-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-bmtb-accent">{product.tag}</span>
            {isProductNew(product) && <NewBadge size="md" />}
            <FrameworkTags frameworks={product.frameworks} size="md" />
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">{product.name}</h1>
          <p className="mt-2 text-sm text-bmtb-muted">{getProductVersion(product)} • Released {getProductSortDate(product) || "No date"}</p>
          <p className="mt-2 font-display text-2xl font-bold text-bmtb-accent">{product.price}</p>
        </div>
      </motion.div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.35fr_0.75fr]">
        <div className="space-y-14">
          <DetailSection eyebrow="Overview" title="About this resource">
            <p className="leading-8 text-bmtb-muted md:text-lg">{product.fullDesc || product.desc}</p>
          </DetailSection>

          {product.youtubeEmbed && (
            <DetailSection eyebrow="Demo" title="Video walkthrough">
              <div className="overflow-hidden rounded-2xl border border-bmtb-line shadow-soft">
                <iframe
                  title={`${product.name} preview video`}
                  src={product.youtubeEmbed}
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </DetailSection>
          )}

          {product.updateNotes?.length > 0 && (
            <DetailSection eyebrow="Features" title={product.infoHeading || "What you get"}>
              <ul className="space-y-3">
                {product.updateNotes.map((note) => (
                  <li key={note} className="flex gap-3 text-sm leading-6 text-bmtb-muted md:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bmtb-accent" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </DetailSection>
          )}

          {product.requirements?.length > 0 && (
            <DetailSection eyebrow="Compatibility" title="Requirements">
              <div className="flex flex-wrap gap-2">
                {product.requirements.map((requirement) => (
                  <span key={requirement} className="rounded-full border border-bmtb-line bg-bmtb-elevated px-3 py-1.5 text-xs font-medium text-bmtb-muted">
                    {requirement}
                  </span>
                ))}
              </div>
              {product.installSteps?.length > 0 && (
                <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm leading-6 text-bmtb-muted">
                  {product.installSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              )}
            </DetailSection>
          )}

          {product.imageUrl && (
            <DetailSection eyebrow="Gallery" title="Preview">
              <div className="overflow-hidden rounded-2xl border border-bmtb-line bg-bmtb-elevated shadow-soft">
                <div className="flex items-center gap-1.5 border-b border-bmtb-line px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                </div>
                <img src={product.imageUrl} alt={`${product.name} gallery`} className="w-full object-cover" />
              </div>
            </DetailSection>
          )}

          {product.notes?.length > 0 && (
            <DetailSection eyebrow="Notes" title="Good to know">
              <ul className="space-y-2 text-sm leading-6 text-bmtb-muted">
                {product.notes.map((note) => (
                  <li key={note} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bmtb-accent" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </DetailSection>
          )}

          <DetailSection eyebrow="FAQ" title="Common questions">
            <div className="space-y-3">
              {faqItems.map(([q, a]) => (
                <div key={q} className="rounded-2xl border border-bmtb-line bg-bmtb-card/80 p-5">
                  <p className="font-semibold text-white">{q}</p>
                  <p className="mt-2 text-sm leading-6 text-bmtb-muted">{a}</p>
                </div>
              ))}
            </div>
          </DetailSection>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="bmtb-panel p-6">
            <p className="bmtb-eyebrow">Purchase</p>
            <p className="mt-3 font-display text-3xl font-bold text-bmtb-accent">{product.price}</p>
            <div className="mt-5 grid gap-3">
              <a href={tebexLink} target="_blank" rel="noreferrer" className="bmtb-btn-primary">
                Download on Tebex
              </a>
              {showGumroad && gumroadLink && (
                <a href={gumroadLink} target="_blank" rel="noreferrer" className="bmtb-btn-secondary">
                  Gumroad
                </a>
              )}
              {githubLink && (
                <a href={githubLink} target="_blank" rel="noreferrer" className="bmtb-btn-secondary">
                  GitHub
                </a>
              )}
              <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="bmtb-btn-secondary">
                Discord Support
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-wide text-bmtb-muted">
              <span className="rounded-full border border-bmtb-line px-3 py-1">Instant Delivery</span>
              <span className="rounded-full border border-bmtb-line px-3 py-1">Lifetime Updates</span>
              {githubLink && <span className="rounded-full border border-bmtb-line px-3 py-1">Open Source</span>}
            </div>
          </div>

          <div className="bmtb-panel p-6">
            <p className="bmtb-eyebrow">Support</p>
            <p className="mt-3 text-sm leading-6 text-bmtb-muted">
              Join the BMTB Scripts Discord for help on every script — free and premium.
            </p>
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="bmtb-btn-primary mt-5 w-full">
              Join Discord
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

function DocsScriptPage() {
  const { slug } = useParams();
  const [docsQuery, setDocsQuery] = useState("");
  const docsList = useMemo(
    () => [...products].sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );
  const filteredDocs = useMemo(() => {
    const q = docsQuery.trim().toLowerCase();
    if (!q) return docsList;
    return docsList.filter((item) => {
      const haystack = [
        item.name,
        item.slug,
        item.desc,
        ...(item.frameworks || []),
        ...(item.acePermissions || []),
        ...(item.playerCommands || []).flatMap((cmd) => [cmd.command, cmd.description, cmd.usage]),
        ...(item.adminCommands || []).flatMap((cmd) => [cmd.command, cmd.description, cmd.ace]),
        ...(item.adminGuide || []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [docsList, docsQuery]);
  const product = slug ? productBySlug[slug] : null;
  const active = product || docsList[0];

  if (!active) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="bmtb-panel p-10 text-center">
          <h1 className="font-display text-3xl font-bold">No scripts yet</h1>
          <Link to="/" className="bmtb-btn-primary mt-6">Back home</Link>
        </div>
      </section>
    );
  }

  if (slug && !product) {
    return <Navigate to={`/docs/${docsList[0].slug}`} replace />;
  }

  if (!slug) {
    return <Navigate to={`/docs/${active.slug}`} replace />;
  }

  const currentIndex = docsList.findIndex((item) => item.slug === active.slug);
  const prev = currentIndex > 0 ? docsList[currentIndex - 1] : null;
  const next = currentIndex < docsList.length - 1 ? docsList[currentIndex + 1] : null;

  return (
    <section className="relative min-h-[calc(100vh-4.5rem)]">
      <aside className="flex min-h-[calc(100vh-4.5rem)] w-full flex-col border-b border-bmtb-line bg-bmtb-bg md:fixed md:bottom-0 md:left-0 md:top-[4.5rem] md:z-20 md:w-[280px] md:min-h-0 md:border-b-0 md:border-r md:border-bmtb-line">
        <div className="shrink-0 border-b border-bmtb-line px-5 py-4">
            <p className="bmtb-eyebrow">Documentation</p>
            <p className="mt-2 font-display text-lg font-bold tracking-tight">BMTB Docs</p>
            <p className="mt-1 text-xs text-bmtb-muted">Install guides for every script</p>
            <Link
              to="/"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-bmtb-line px-3 py-2 text-xs font-semibold text-bmtb-muted transition hover:border-bmtb-accent/40 hover:text-bmtb-accent"
            >
              ← Home
            </Link>
            <label className="mt-4 block">
              <span className="sr-only">Search docs</span>
              <div className="relative">
                <Icon name="search" size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-bmtb-muted" />
                <input
                  type="search"
                  value={docsQuery}
                  onChange={(event) => setDocsQuery(event.target.value)}
                  placeholder="Search scripts…"
                  className="w-full rounded-lg border border-bmtb-line bg-bmtb-elevated/60 py-2 pl-9 pr-3 text-sm text-white placeholder:text-bmtb-muted outline-none transition focus:border-bmtb-accent/50"
                />
              </div>
            </label>
          </div>
          <nav className="bmtb-scrollbar-hidden min-h-0 flex-1 overflow-y-auto p-3">
            <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-bmtb-muted">
              Scripts{docsQuery.trim() ? ` (${filteredDocs.length})` : ""}
            </p>
            {filteredDocs.length === 0 ? (
              <p className="px-2 py-3 text-sm text-bmtb-muted">No scripts match “{docsQuery.trim()}”.</p>
            ) : (
              <ul className="space-y-0.5">
                {filteredDocs.map((item) => {
                  const isActive = item.slug === active.slug;
                  return (
                    <li key={item.slug}>
                      <Link
                        to={`/docs/${item.slug}`}
                        className={`block rounded-lg px-3 py-2 text-sm transition duration-300 ${
                          isActive
                            ? "bg-bmtb-accent-soft font-semibold text-bmtb-accent"
                            : "text-bmtb-muted hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>
      </aside>

      <article className="min-w-0 px-5 py-8 md:ml-[280px] md:px-12 md:py-12">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-bmtb-line px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-bmtb-muted">
              {active.tag}
            </span>
            <FrameworkTags frameworks={active.frameworks} />
            <span className="text-xs text-bmtb-muted">{getProductVersion(active)}</span>
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{active.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-bmtb-muted md:text-lg">
            {active.fullDesc || active.desc}
          </p>

          <div className="bmtb-divider my-10" />

          <DocsSection title="Overview">
            <p className="leading-7 text-bmtb-muted">{active.fullDesc || active.desc}</p>
          </DocsSection>

          <DocsSection title="Requirements">
            {active.requirements?.length > 0 ? (
              <ul className="space-y-2">
                {active.requirements.map((requirement) => (
                  <li key={requirement} className="flex gap-3 text-sm leading-6 text-bmtb-muted">
                    <Icon name="check" size={14} className="mt-1 shrink-0 text-bmtb-accent" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-6 text-bmtb-muted">
                Framework support: {active.frameworks?.join(", ") || "See product page"}. Check the store page or Discord if you need stack-specific requirements.
              </p>
            )}
          </DocsSection>

          {active.acePermissions?.length > 0 && (
            <DocsSection title="ACE permissions">
              <p className="mb-3 text-sm text-bmtb-muted">Add these to <code className="rounded bg-white/5 px-1.5 py-0.5 text-white">server.cfg</code> (or your ACE source) for admin access:</p>
              <ul className="space-y-2">
                {active.acePermissions.map((ace) => (
                  <AceCopyRow key={ace} ace={ace} />
                ))}
              </ul>
            </DocsSection>
          )}

          <DocsSection title="Installation">
            {active.installSteps?.length > 0 ? (
              <ol className="list-decimal space-y-3 pl-5 text-sm leading-7 text-bmtb-muted">
                {active.installSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            ) : (
              <div className="rounded-xl border border-bmtb-line bg-bmtb-elevated/60 p-4 text-sm leading-6 text-bmtb-muted">
                <p>Drop the resource into your server resources folder, add <code className="rounded bg-white/5 px-1.5 py-0.5 text-white">ensure {active.slug.replace(/-/g, "_")}</code> to <code className="rounded bg-white/5 px-1.5 py-0.5 text-white">server.cfg</code>, then restart and test.</p>
                <p className="mt-3">For detailed setup help, open the product page or join Discord.</p>
              </div>
            )}
          </DocsSection>

          <DocsSection title="Player commands">
            {active.playerCommands?.length > 0 ? (
              <ul className="space-y-3">
                {active.playerCommands.map((entry) => (
                  <CommandRow key={entry.command} entry={entry} variant="player" />
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-6 text-bmtb-muted">
                No chat commands — use inventory items, target interactions, or keybinds documented in the Features section.
              </p>
            )}
          </DocsSection>

          {active.adminGuide?.length > 0 && (
            <DocsSection title="Admin guide">
              <ol className="list-decimal space-y-3 pl-5 text-sm leading-7 text-bmtb-muted">
                {active.adminGuide.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </DocsSection>
          )}

          <DocsSection title="Admin commands">
            {active.adminCommands?.length > 0 ? (
              <ul className="space-y-3">
                {active.adminCommands.map((entry) => (
                  <CommandRow key={entry.command} entry={entry} variant="admin" />
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-6 text-bmtb-muted">
                No dedicated admin commands — access is job-gated, ACE-gated via target interactions, or configured through framework admin groups only.
              </p>
            )}
          </DocsSection>

          <DocsSection title="Features">
            {active.updateNotes?.length > 0 ? (
              <ul className="space-y-2">
                {active.updateNotes.map((note) => (
                  <li key={note} className="flex gap-3 text-sm leading-6 text-bmtb-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bmtb-accent" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-6 text-bmtb-muted">{active.fullDesc || active.desc}</p>
            )}
          </DocsSection>

          {active.notes?.length > 0 && (
            <DocsSection title="Notes">
              <ul className="space-y-2">
                {active.notes.map((note) => (
                  <li key={note} className="flex gap-3 text-sm leading-6 text-bmtb-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bmtb-accent" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </DocsSection>
          )}

          <DocsSection title="Download & support">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to={`/scripts/${active.slug}`} className="bmtb-btn-primary">
                View product page
              </Link>
              <a href={getTebexLink(active)} target="_blank" rel="noreferrer" className="bmtb-btn-secondary">
                Download
              </a>
              <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="bmtb-btn-secondary">
                Discord
              </a>
            </div>
          </DocsSection>

          <div className="mt-12 grid max-w-3xl gap-3 border-t border-bmtb-line pt-6 sm:grid-cols-2">
            {prev ? (
              <Link to={`/docs/${prev.slug}`} className="rounded-xl border border-bmtb-line bg-bmtb-card/60 p-4 transition hover:border-bmtb-accent/35">
                <p className="text-xs uppercase tracking-wider text-bmtb-muted">Previous</p>
                <p className="mt-1 font-semibold text-white">{prev.name}</p>
              </Link>
            ) : <div />}
            {next ? (
              <Link to={`/docs/${next.slug}`} className="rounded-xl border border-bmtb-line bg-bmtb-card/60 p-4 text-right transition hover:border-bmtb-accent/35">
                <p className="text-xs uppercase tracking-wider text-bmtb-muted">Next</p>
                <p className="mt-1 font-semibold text-white">{next.name}</p>
              </Link>
            ) : null}
          </div>
        </article>
    </section>
  );
}

function DocsSection({ title, children }) {
  return (
    <section className="mb-10 scroll-mt-28">
      <h2 className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-bmtb-line px-6 py-14">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">BMTB</p>
          <p className="mt-2 text-sm text-bmtb-muted">Premium FiveM Development</p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-3">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Links</p>
            <Link to="/" className="block text-bmtb-muted transition hover:text-white">Home</Link>
            <Link to="/scripts" className="block text-bmtb-muted transition hover:text-white">Scripts</Link>
            <Link to="/docs" className="block text-bmtb-muted transition hover:text-white">Documentation</Link>
            <a href={TEBEX_STORE_URL} target="_blank" rel="noreferrer" className="block text-bmtb-muted transition hover:text-white">Tebex</a>
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="block text-bmtb-muted transition hover:text-white">Discord</a>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Legal</p>
            <a href="#terms" className="block text-bmtb-muted transition hover:text-white">Terms</a>
            <a href="#refund" className="block text-bmtb-muted transition hover:text-white">Refund Policy</a>
          </div>
        </div>
      </div>
      <div className="bmtb-divider mx-auto mt-10 max-w-7xl" />
      <p className="mx-auto mt-6 max-w-7xl text-center text-sm text-bmtb-muted md:text-left">
        © 2026 BMTB Scripts. All rights reserved.
      </p>
    </footer>
  );
}

export default function BMTBScriptsWebsite() {
  const location = useLocation();
  const isDocsPage = location.pathname.startsWith("/docs");

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent font-sans text-white">
      <AmbientBackground />
      <div className="relative z-10">
        {!isDocsPage && <LiveStatusBar />}
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scripts" element={<ScriptsCatalogPage />} />
          <Route path="/scripts/:slug" element={<ScriptInfoPage />} />
          <Route path="/docs" element={<DocsScriptPage />} />
          <Route path="/docs/:slug" element={<DocsScriptPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {!isDocsPage && (
          <>
            <section className="mx-auto max-w-5xl px-6 py-16">
              <h2 className="text-center font-display text-3xl font-bold tracking-tight md:text-4xl">FAQ</h2>
              <div className="mt-8 space-y-3">
                {[
                  ["Do the scripts support ESX and QBCore?", "Most BMTB resources can be built with ESX/QBCore support depending on the script. Add compatibility details per product."],
                  ["How do customers get support?", "Visit the Support page to email bankrollmadethisbeat@gmail.com or join the BMTB Discord for help."],
                  ["Where do I download scripts?", "Use the Download button on each script card for Tebex, or open the script info page for Tebex and Gumroad download links."],
                ].map(([q, a]) => (
                  <div key={q} className="rounded-2xl border border-bmtb-line bg-bmtb-card/80 p-5">
                    <p className="font-semibold text-white">{q}</p>
                    <p className="mt-2 text-sm leading-6 text-bmtb-muted">{a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="terms" className="mx-auto max-w-5xl scroll-mt-28 px-6 pb-16">
              <h2 className="text-center font-display text-3xl font-bold tracking-tight md:text-4xl">Terms, Refund, and License</h2>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-bmtb-line bg-bmtb-card/80 p-5">
                  <p className="font-semibold text-white">License</p>
                  <p className="mt-2 text-sm leading-6 text-bmtb-muted">Each purchase grants usage rights for your server setup. Redistribution, leaking, or re-selling files is not allowed.</p>
                </div>
                <div id="refund" className="scroll-mt-28 rounded-2xl border border-bmtb-line bg-bmtb-card/80 p-5">
                  <p className="font-semibold text-white">Refund Policy</p>
                  <p className="mt-2 text-sm leading-6 text-bmtb-muted">Digital products are generally non-refundable after delivery. Payment disputes should be handled through support first.</p>
                </div>
                <div className="rounded-2xl border border-bmtb-line bg-bmtb-card/80 p-5">
                  <p className="font-semibold text-white">Support</p>
                  <p className="mt-2 text-sm leading-6 text-bmtb-muted">Email bankrollmadethisbeat@gmail.com on the Support page or join Discord for setup help after downloading from Tebex or Gumroad.</p>
                </div>
              </div>
            </section>
          </>
        )}

        {!isDocsPage && <SiteFooter />}
      </div>
    </div>
  );
}


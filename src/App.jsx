import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import AmbientBackground from "./AmbientBackground";

const DISCORD_URL = "https://discord.gg/5rRMZ2R9EP";
const SUPPORT_EMAIL = "bankrollmadethisbeat@gmail.com";
const TEBEX_STORE_URL = "https://bmtbscripts.tebex.io";
const TEBEX_FREE_CATEGORY_URL = "https://bmtbscripts.tebex.io/category/scripts";
const GUMROAD_STORE_URL = "https://bankrollmadethisbeat.gumroad.com/?section=Hn1qT-Kqt-tN59rEoI51ZQ%3D%3D";
const REAL_MONEY_RELEASE_AT = new Date("2026-08-01T18:00:00Z"); // August 1, 2026 2:00 PM ET

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
    slug: "bmtb-scamming",
    name: "BMTB Scamming",
    desc: "Carding and ATM scamming RP — buy dumps, cash out, heat/burn risk, police dispatch, ranks, and a full bmtb os laptop workflow.",
    fullDesc: "BMTB Scamming v1.0 brings a complete criminal finance loop to ESX and QBCore — buy dumps from vendors, encode cards, hit ATMs with burn-risk mechanics, manage heat, climb ranks, and run operations from a custom bmtb os laptop NUI. Includes police dispatch triggers, decline/burn feedback, and configurable payout/risk tuning for immersive scam RP.",
    price: "FREE",
    tag: "FREE",
    frameworks: ["ESX", "QBCore"],
    downloads: 0,
    version: "v1.0",
    updatedOn: "2026-07-24",
    imageUrl: "/bmtb-scamming-thumb.png",
    youtubeEmbed: "",
    buyUrl: "https://bmtbscripts.tebex.io/package/7577885",
    tebexUrl: "https://bmtbscripts.tebex.io/package/7577885",
    infoHeading: "BMTB Scamming v1.0",
    updateNotes: [
      "Buy dumps — vendor flow for card data (Visa, MasterCard, etc.).",
      "Card encoder / programmer bench setup with streamed props.",
      "ATM cash-out with decline, burn risk, and police dispatch events.",
      "Heat + rank progression tied to scam activity.",
      "bmtb os laptop NUI for dump catalog, status, and operations.",
      "Multi-framework bridges for ESX Legacy and QBCore.",
      "Tebex-only release — no Gumroad listing for this script.",
    ],
    requirements: [
      "ESX Legacy or QBCore",
      "ox_lib recommended",
      "ox_inventory or compatible inventory",
      "oxmysql recommended",
    ],
    installSteps: [
      "Drop bmtb_scamming into resources/[scripts]/ or [bmtb]/.",
      "Merge install items/images into your inventory if provided.",
      "Ensure framework → ox_lib → inventory → bmtb_scamming.",
      "ensure bmtb_scamming — edit config.lua for payouts, heat, dispatch, and ranks.",
      "Restart and test dump buy, encode, and ATM cash-out flow.",
    ],
    notes: [
      "Tebex-only — download from the Tebex package page.",
      "Tune burn risk / police dispatch in config before going live.",
    ],
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
      "Pill bottles — fill, open, deposit, and withdraw via slot metadata (contents).",
      "Pill use — take animation, stacking window, overdose blackout, random rolls on perc/bars.",
      "Press durability — wear per craft, fail chance when low, repair kit flow.",
      "Street demand — hot/cold rotation each restart; BMTB UI panel via /pilldemand.",
      "Pill admin — /pilladmin NUI for per-pill perk/visual tuning (ACE + framework admin fallback).",
      "Built-in BMTB UI — notify, progress, craft menu, list menu, dialogs (no ox_lib).",
      "Multi-framework — ESX Legacy, QBCore, Qbox auto-detect (ESX → QBCore → Qbox).",
      "Multi-inventory — ox, qb/ps/lj, qs, codem, core, ak47, ESX default via auto bridge.",
      "Optional bmtb_trapphone — demand multipliers apply to trap phone pill street payouts.",
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
      "Live volume updates, click-to-set / drag knob, Shift fine control.",
      "Multi-framework / multi-inventory auto-detect (ESX + QBCore).",
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
      "Add the pods/airpods item to inventory; keep stream/ props intact.",
      "Framework/inventory bridges auto-register on most stacks.",
      "Restart xsound + bmtb_pods and test the item (fallback may be /airpods).",
    ],
    acePermissions: [],
    notes: [
      "No dedicated ACE — player item use only.",
      "Live resource name is bmtb_pods (not bmtb_airpods).",
      "Always start xsound before bmtb_pods.",
    ],
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
      "Lean bottle → baby bottle with line-based pouring (16 lines → 8 per pour).",
      "Double cup + Feyzo Cream Soda prep with mixed lean variants (purple / red / green).",
      "Hold / drink mixed lean with on-screen cup HUD (G drink / K add / X put away).",
      "Additives: ice, Rancherz, Perc, Xan Bar — with sip buffs on mixed cups.",
      "Lean carry command — walk with cup in hand.",
      "Sip effects: timecycle tint, overlay, and walk style (configurable).",
      "Custom prop attachments, streamed animations, and BMTB NUI menus.",
      "ESX Legacy build — ox_inventory, ESX default F2, ak47, qs, codem, and more.",
      "QBCore build — qb-inventory, ox_inventory, qs, ak47, lj/ps, codem, core_inventory.",
      "14 languages — set Config.LocaleLanguage in config.lua.",
      "Buyer-friendly config.lua — gameplay, drink, HUD, and UI tuning without code edits.",
      "Admin tools: /leanrebuildbaby (ESX), /leanqbcheck (QBCore), prop tuner, and metadata repair.",
    ],
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
    acePermissions: [
      "add_ace group.admin bmtb_lean.debug allow",
    ],
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
      "Test with /giveitem [id] gofetch_tablet 1 (or your install-me item name).",
    ],
    infoHeading: "BMTB GoFetch v1.0.0",
    updateNotes: [
      "Live shop catalog from ox_inventory, qb-shops, and other popular inventory backends.",
      "Server-authoritative checkout with validated prices and anti-exploit collect gates.",
      "NPC fleet delivery with burrito van courier and optional GoFetch Express upgrade.",
      "Supports ESX, QBCore, and Qbox with auto-detected inventory and payment bridges.",
      "Up to 2 active orders per player with order history and Discord logging.",
    ],
    acePermissions: [
      "add_ace group.admin bmtb.gofetch.admin allow",
    ],
    notes: [
      "Admin ACE: bmtb.gofetch.admin",
      "Start shops/inventory before GoFetch so catalogs populate.",
    ],
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
      "CRITICAL order: oxmysql → es_extended → ox_lib → bmtb_trapphone → ox_inventory (trapphone BEFORE ox_inventory).",
      "Add trap phone + drug items to ox_inventory/data/items.lua per README.",
      "Add ACE: add_ace group.admin bmtb.trapphone.admin allow",
      "ensure bmtb_trapphone — restart and test /giveitem [id] bmtb_trapphone 1.",
    ],
    infoHeading: "BMTB Trap Phone v1.0.0",
    updateNotes: [
      "Trap phone NUI with calls, messages, status, settings, Trapperz.net, wallpapers, and ringtones.",
      "Street trap runs with buyer spawns, handoffs, robbery/chase, and optional ox_target sell.",
      "Delivery missions with incoming calls, GPS drops, and incapacitation cancel.",
      "Plug system with rotating plugs, chat, trust/mood, front orders, meetups, and debt tabs.",
      "8 reputation tiers, career stats, Trapperz demand index, and police heat on bad rep.",
      "Drug loops: bagging, blow brick pack/unpack, weed pound unpack, and sellable item list.",
    ],
    acePermissions: [
      "add_ace group.admin bmtb.trapphone.admin allow",
    ],
    notes: [
      "Admin ACE: bmtb.trapphone.admin",
      "Must start BEFORE ox_inventory so item exports register.",
      "ESX Legacy only on current builds.",
    ],
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
    infoHeading: "BMTB Strippers v1.0.0",
    updateNotes: [
      "Stripper job system — apply at reception, clock in/out, dancer/manager/owner grades, live shift HUD, server-side settlement.",
      "Built-in pole dancing — multiple routines, looping scenes, shift tracking, /newpole and /removepole placement tools.",
      "Lap dances and VIP rooms — NPC and player private dances, VIP chairs, stripper spots, premium booth payouts.",
      "NPC customers and tips — spawn flow, stage tips, crowd watch/cheer/clap, supply modifiers.",
      "Club management — /clubmanage menu, hire/fire dancers and NPC staff, supplies, stage spot editor.",
      "Owner economy — club safe, live dashboard, passive revenue, owner cuts, configurable withdraw limits.",
      "Reputation and popularity — stripper XP, payout bonuses, club popularity score and decay.",
      "Outfits and locker — preset stage/VIP outfits, saved locker slots, illenium-appearance support.",
      "Production ready — server-side payout validation, cooldowns, anti-AFK, zone checks, ACE-gated admin tools.",
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
    ]
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
      "No ACE required. Author branding: BMTB watermark_logo on many servers.",
    ],
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
    ],
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
    notes: [
      "No dedicated ACE on current builds.",
    ],
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
      "Fully tested and confirmed stable in-game.",
      "Weapon bench placement fixed for interiors/MLOs and ground-level preview behavior.",
      "Duplicate bench spawn issue resolved (no double bench on place).",
      "Inventory compatibility flow improved for addon weapon components.",
      "Config supports auto-detect first for weapons, ammo, and attachments.",
      "Vanilla defaults are present, with clean custom addon example slots for quick setup.",
      "Runtime Lua files are obfuscated for release distribution.",
      "No linter or syntax issues in updated release files.",
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
      "No dedicated ACE found — usually job/framework gated.",
      "Auto-detect weapons/ammo/attachments enabled by default.",
      "Use Config.CustomItemSources for non-standard inventory exports.",
    ],
    acePermissions: [],
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
    notes: [
      "No dedicated ACE on current builds.",
    ],
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
    notes: [
      "Admin ACE: bmtb_tuning.admin",
    ],
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
      "No dedicated bmtb.* ACE — often uses IsPlayerAceAllowed(..., \"command\") or Config.Admins.",
      "On many servers add_ace group.admin command allow covers wipe admins.",
    ],
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
    requirements: ["ox_lib", "ESX Legacy / QBCore / Qbox", "ox_inventory recommended"],
    installSteps: [
      "Drop the resource into your server resources folder.",
      "Add recycle_material to your inventory items.",
      "Add ensure bmtb_recyclingjob to server.cfg.",
      "Edit config.lua for locations, payout, and blip settings.",
    ],
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
      "ACE + AuthorizedRanks (god/admin/superadmin) gates.",
    ],
    notes: [
      "Admin ACE: bmtb_givecar.command",
      "Also checks AuthorizedRanks in config.",
    ],
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
    ],
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
];

// YouTube publish dates from @BMTBScripts/videos (newest uploads first).
const YOUTUBE_PUBLISH_DATES = {
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
  return product?.slug === "bmtb-scamming" || product?.slug === "bmtb-pillpress";
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
          <a href={DISCORD_URL} className="bmtb-btn-primary px-4 py-2 text-xs sm:text-sm">
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
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/scripts" className="bmtb-btn-primary px-8 py-4 text-base">
                Browse Scripts <Icon name="chevron" className="ml-2" size={18} />
              </Link>
              <a href={DISCORD_URL} className="bmtb-btn-secondary px-8 py-4 text-base">
                Join Discord
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="bmtb-divider mx-auto max-w-7xl" />

      <section className="mx-auto max-w-7xl px-6 py-14">
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
              <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">BMTB Real Money</h2>
              <p className="mt-2 max-w-xl text-sm text-bmtb-muted md:text-base">
                Releasing August 1, 2026 at 2:00 PM ET on Tebex.
              </p>
            </div>
            <div className="w-full max-w-md">
              <ComingSoonCountdown
                targetDate={REAL_MONEY_RELEASE_AT}
                liveMessage="Release live — check the store for BMTB Real Money."
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
              <p className="bmtb-eyebrow">New Release</p>
              <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">BMTB Scamming v1.0</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-bmtb-muted md:text-base">
                Buy dumps. Cash out. Get ranks. Full carding / ATM scam RP with heat, burn risk, police dispatch, and bmtb os — free on Tebex.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/scripts/bmtb-scamming" className="bmtb-btn-primary px-6 py-3">
                  View Product
                </Link>
                <a href="https://bmtbscripts.tebex.io/package/7577885" target="_blank" rel="noreferrer" className="bmtb-btn-secondary px-6 py-3">
                  Download on Tebex
                </a>
              </div>
            </div>
            <div className="border-t border-bmtb-line md:border-l md:border-t-0">
              <img
                src="/bmtb-scamming-thumb.png"
                alt="BMTB Scamming preview"
                className="h-full min-h-[220px] w-full object-cover"
                loading="lazy"
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
    <section className="flex min-h-[calc(100vh-4.5rem)] flex-col">
      <div className="mx-auto flex w-full max-w-none flex-1 md:grid md:grid-cols-[280px_1fr]">
        <aside className="border-b border-bmtb-line bg-bmtb-bg/75 backdrop-blur-xl md:sticky md:top-[4.5rem] md:h-[calc(100vh-4.5rem)] md:border-b-0 md:border-r md:border-bmtb-line">
          <div className="border-b border-bmtb-line px-5 py-4">
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
          <nav className="max-h-[40vh] overflow-y-auto p-3 md:max-h-[calc(100vh-10rem)]">
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

        <article className="min-w-0 flex-1 px-5 py-8 md:px-12 md:py-12">
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
      </div>
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
            <a href={DISCORD_URL} className="block text-bmtb-muted transition hover:text-white">Discord</a>
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
              <h2 className="text-center font-display text-3xl font-bold tracking-tight md:text-4xl">Latest Changelog</h2>
              <div className="bmtb-panel mt-8 p-6">
                <ul className="space-y-2 text-sm leading-6 text-bmtb-muted">
                  <li>- Luxury Developer UI restyle: matte black, frosted glass, Electric Violet accent.</li>
                  <li>- Added per-script info pages with image, video, and action buttons.</li>
                  <li>- Introduced buy/Discord/CFX action flow and purchase ticket template helper.</li>
                  <li>- Updated script cards to show thumbnail strips and status badges.</li>
                </ul>
              </div>
            </section>

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


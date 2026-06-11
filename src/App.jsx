import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";

const DISCORD_URL = "https://discord.gg/5rRMZ2R9EP";
const SUPPORT_EMAIL = "bankrollmadethisbeat@gmail.com";
const TEBEX_STORE_URL = "https://bmtbscripts.tebex.io";
const TEBEX_FREE_CATEGORY_URL = "https://bmtbscripts.tebex.io/category/scripts";
const GUMROAD_STORE_URL = "https://bankrollmadethisbeat.gumroad.com/?section=Hn1qT-Kqt-tN59rEoI51ZQ%3D%3D";
const TRAPHONE_RELEASE_AT = new Date("2026-05-15T14:00:00-04:00");

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
};

function getCountdownParts(targetDate) {
  const diffMs = targetDate.getTime() - Date.now();
  if (diffMs <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function TrapPhoneCountdown() {
  const [countdown, setCountdown] = useState(() => getCountdownParts(TRAPHONE_RELEASE_AT));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdownParts(TRAPHONE_RELEASE_AT));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  if (!countdown) {
    return (
      <p className="mt-3 text-sm font-black uppercase tracking-wide text-black/80">
        Release live — check the store for BMTB TRAPHONE.
      </p>
    );
  }

  const units = [
    { label: "Days", value: countdown.days },
    { label: "Hrs", value: countdown.hours },
    { label: "Min", value: countdown.minutes },
    { label: "Sec", value: countdown.seconds },
  ];

  return (
    <div className="mt-4">
      <p className="text-xs font-bold uppercase tracking-wide text-black/60">Releases May 15, 2026 at 2:00 PM ET</p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {units.map((unit) => (
          <div key={unit.label} className="rounded-xl bg-black/10 px-2 py-2 text-center">
            <p className="text-xl font-black leading-none">{String(unit.value).padStart(2, "0")}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-black/60">{unit.label}</p>
          </div>
        ))}
      </div>
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

const products = [
  {
    slug: "bmtb-pods-2",
    name: "BMTB PODS 2.0",
    desc: "Advanced FiveM props/pods system for immersive server interactions.",
    fullDesc: "BMTB PODS 2.0 adds configurable prop and pod placements to support immersive server scenes and interactions.",
    price: "FREE",
    tag: "FREE",
    downloads: 339,
    assetId: "934971",
    version: "v2.0",
    updatedOn: "2026-03-25",
    imageUrl: "/bmtb-pods-2-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/hW0s1sO1F9A?si=pa2eww6S7jxc42-O",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtbpods",
    infoHeading: "UPDATED - NEW LOOK",
    updateNotes: [
      "Reworked to a full modernized Figma-based interface for cleaner visuals and better UX.",
      "Added dynamic theme color customization with preset colors plus custom hex picker.",
      "Improved readability with stronger text contrast and shadow styling.",
      "UI now opens only when the player uses pods (no auto-open on resource restart).",
      "Added close button and ESC handling with cleaner focus behavior.",
      "Enabled movement while UI is open (WASD passthrough).",
      "Added real-time live volume updates while audio is already playing.",
      "Refined volume knob behavior for more accurate mouse tracking and cleaner interaction.",
      "Removed decimal volume display and standardized to whole-number volume.",
      "Added precise click-to-set and drag-from-current knob interaction flow.",
      "Added Shift-based fine volume control for tighter adjustments.",
      "Updated NUI wiring and resource bindings for bmtb_pods naming consistency.",
      "Strengthened compatibility with FiveM NUI build/output flow for stable deployment.",
    ],
    requirements: ["ox_lib", "xsound"],
    installSteps: [
      "Drop folder: resources/[scripts]/bmtb_airpods/",
      "Ensure order: ensure ox_lib, ensure xsound, ensure bmtb_airpods",
      "Add item airpods to your inventory system (ESX items table / ox_inventory data items, QBCore shared items, QS shared items).",
      "Make it usable: no extra code required - server bridge auto-registers for ESX/QB/QS.",
      "Worst case fallback command: /airpods",
    ],
  },
  {
    slug: "bmtb-lean",
    name: "BMTB Lean",
    desc: "Full lean workflow with custom props, animations, and BMTB UI for ESX servers.",
    fullDesc: "Lean bottle pouring, Feyzo soda cup prep, mixed variants, sip FX, and in-world cup carry — built for polished roleplay servers with ox_inventory support and 14 locale options.",
    price: "$10",
    tag: "PREMIUM",
    downloads: 1,
    version: "v1.1.0",
    updatedOn: "2026-05-28",
    imageUrl: "https://dunb17ur4ymx4.cloudfront.net/packages/images/89df115a0ecfdc8b20fcb81c3a69b58c9023bbc8.png",
    youtubeEmbed: "https://www.youtube.com/embed/NvCfSDMEXDA",
    buyUrl: "https://bmtbscripts.tebex.io/package/7452186",
    requirements: ["ox_lib", "ESX Legacy (or compatible auto-detect)", "ox_inventory recommended"],
    installSteps: [
      "Drop the resource in your [scripts] folder.",
      "Add items from the install folder to your inventory.",
      "Ensure order: ensure ox_lib, ensure ox_inventory, ensure bmtb_lean",
      "Edit config.lua for language, sip FX, props, and notify duration.",
      "Restart and test in-game.",
    ],
  },
  {
    slug: "bmtb-gofetch",
    name: "BMTB GoFetch",
    desc: "Delivery tablet with live shop catalogs, NPC fleet delivery, and multi-framework support.",
    fullDesc: "GoFetch lets players browse live shop catalogs from ox_inventory, qb-shops, and other inventories, place orders, pay cash or bank, and receive items through an NPC burrito van courier with optional GoFetch Express upgrades.",
    price: "$1",
    tag: "PREMIUM",
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
    ],
    installSteps: [
      "Drop bmtb_gofetch into resources/[bmtb]/ and merge install-me items into your inventory.",
      "Ensure ox_lib, oxmysql, your framework, inventory, and qb-shops (QBCore) start before GoFetch.",
      "Add ensure bmtb_gofetch and add_ace group.admin bmtb.gofetch.admin allow to server.cfg.",
      "Restart inventory + GoFetch, then test with /giveitem [id] gofetch_tablet 1.",
    ],
    infoHeading: "BMTB GoFetch v1.0.0",
    updateNotes: [
      "Live shop catalog from ox_inventory, qb-shops, and other popular inventory backends.",
      "Server-authoritative checkout with validated prices and anti-exploit collect gates.",
      "NPC fleet delivery with burrito van courier and optional GoFetch Express upgrade.",
      "Supports ESX, QBCore, and Qbox with auto-detected inventory and payment bridges.",
      "Up to 2 active orders per player with order history and Discord logging.",
    ],
  },
  {
    slug: "bmtb-chains-as-items",
    name: "BMTB Chains As Items",
    desc: "Wearable chain items with inventory/shop integration for ESX/QBCore.",
    fullDesc: "Wearable chain system with inventory and shop flow. Includes item setup support for modern FiveM frameworks and clean, simple integration.",
    price: "$1",
    tag: "PREMIUM",
    downloads: 6,
    updatedOn: "2026-05-06",
    imageUrl: "/bmtb-chains-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/H_YG2Vr96bE?si=a3qN9aNwu3i16FKc",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtb-chains",
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
  },
  {
    slug: "bmtb-cooking",
    name: "BMTB Cooking",
    desc: "Interactive cooking/crafting gameplay system for roleplay servers.",
    fullDesc: "Roleplay-focused cooking and crafting system with configurable recipes and progression-ready gameplay loops.",
    price: "FREE",
    tag: "FREE",
    downloads: 88,
    assetId: "934974",
    updatedOn: "2026-04-30",
    imageUrl: "/bmtb-cooking-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/F44NM6_q-bM?si=edqVb7DIYfm5nnde",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtbcooking",
  },
  {
    slug: "bmtb-weapon-repair",
    name: "BMTB Weapon Repair",
    desc: "Weapon repair bench system with immersive crafting and repair flow.",
    fullDesc: "Bench-based repair mechanics with configurable costs and immersive interactions for realistic server economy gameplay.",
    price: "$10",
    tag: "PREMIUM",
    downloads: 0,
    assetId: "934956",
    version: "v1.2",
    updatedOn: "2026-03-25",
    imageUrl: "/bmtb-weapon-repair-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/MvgPu0LbuGM?si=plSjTNBaXd5G8xF_",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtbweaponrepair",
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
      "Framework: ESX or QBCore",
      "Inventory: ox_inventory or compatible source exports",
    ],
    installSteps: [
      "Place bmtb_weaponrepair in your resources.",
      "Ensure dependencies start before it.",
      "Import included SQL files.",
      "Add ensure bmtb_weaponrepair to server.cfg.",
      "Restart server and test bench, crafting, and repair flow.",
    ],
    notes: [
      "Auto-detect is enabled by default.",
      "Manual addon examples are included for fallback/customization.",
      "If your server uses non-standard inventory item exports, configure Config.CustomItemSources.",
    ],
  },
  {
    slug: "bmtb-wigs",
    name: "BMTB Wigs",
    desc: "Wig/hair inventory system with clothing integration and UI support.",
    fullDesc: "Inventory-backed wig system with appearance handling and framework-compatible integration hooks.",
    price: "$1",
    tag: "PREMIUM",
    downloads: 17,
    assetId: "934961",
    updatedOn: "2026-04-23",
    imageUrl: "https://dunb17ur4ymx4.cloudfront.net/packages/images/581b5174063646063e13bb2d9d6bdf1416188bda.png",
    youtubeEmbed: "https://www.youtube.com/embed/2mXbZH_iDxE?si=BHjRtOqM0P_22bmd",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtbwigs",
    tebexUrl: "https://bmtbscripts.tebex.io/package/bmtbwigs",
  },
  {
    slug: "bmtb-chopshop",
    name: "BMTB Chopshop",
    desc: "Vehicle chopshop gameplay with immersive roleplay mechanics.",
    fullDesc: "Vehicle dismantling and chopshop progression flow built for immersive roleplay and risk/reward gameplay.",
    price: "FREE",
    tag: "FREE",
    downloads: 84,
    assetId: "929525",
    updatedOn: "2026-03-19",
    imageUrl: "/bmtb-chopshop-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/b-TVVsLpa9w?si=TPmmcreaORLX7gCR",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtbchopshop",
  },
  {
    slug: "bmtb-tuning",
    name: "BMTB Tuning",
    desc: "Audio/tuning customization system for immersive vehicle upgrades.",
    fullDesc: "Customization-focused tuning setup designed to improve vehicle identity and immersive server car culture.",
    price: "FREE",
    tag: "FREE",
    downloads: 45,
    assetId: "953633",
    updatedOn: "2026-04-11",
    imageUrl: "/bmtb-tuning-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/_ynXdeLBico?si=8d2lLynUDBTyXTi9",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtbtuning",
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
  },
  {
    slug: "bmtb-recycle-job",
    name: "BMTB Recycle Job",
    desc: "Beginner-friendly recycling side hustle with foreman NPC, sorting, and cash payouts.",
    fullDesc: "Clock in at the yard, grab boxes, sort recyclable material, and sell for cash. Supports ESX, QBCore, and Qbox with ox_lib menus, carry animations, and configurable locations and payouts.",
    price: "FREE",
    tag: "FREE",
    downloads: 1,
    updatedOn: "2026-05-28",
    imageUrl: "/bmtb-recycle-job-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/HXxlSWHGpBg",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtb-recyclejob",
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
    downloads: 43,
    assetId: "958555",
    updatedOn: "2026-04-16",
    imageUrl: "/bmtb-givecar-thumb.png",
    youtubeEmbed: "",
    buyUrl: "https://bmtbscripts.tebex.io/package/7397118",
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
  },
  {
    slug: "bmtb-itemslist",
    name: "BMTB ITEMSLIST",
    desc: "Clean item list viewer for ESX/QBCore inventory systems.",
    fullDesc: "Item browser and quick lookup page for inventory systems so players and staff can view available items easily.",
    price: "FREE",
    tag: "FREE",
    downloads: 32,
    assetId: "958558",
    updatedOn: "2026-04-16",
    imageUrl: "/bmtb-itemslist-thumb.png",
    youtubeEmbed: "",
    buyUrl: "https://bmtbscripts.tebex.io/package/7397120",
  },
  {
    slug: "bmtb-moneywash",
    name: "BMTB Moneywash",
    desc: "Dirty money washing system with ESX, QBCore, and Qbox support.",
    fullDesc: "Money wash script with progress UX and framework support across ESX, QBCore, and Qbox, designed for realistic economy loops.",
    price: "FREE",
    tag: "FREE",
    downloads: 40,
    assetId: "967147",
    updatedOn: "2026-04-24",
    imageUrl: "/bmtb-moneywash-thumb.png",
    youtubeEmbed: "https://www.youtube.com/embed/FwjHLkQs1O0?si=0BDRXL3dVHHUKANS",
    buyUrl: "https://bmtbscripts.tebex.io/package/bmtbmoneywash",
  },
];

const productBySlug = products.reduce((acc, product) => {
  acc[product.slug] = product;
  return acc;
}, {});

const features = [
  { icon: "shield", title: "Secure Server Logic", text: "Built with anti-exploit checks, validated events, and clean server authority." },
  { icon: "zap", title: "Optimized Performance", text: "Lightweight loops, smart state handling, and clean FiveM resource structure." },
  { icon: "package", title: "ESX / QBCore Ready", text: "Scripts designed for modern FiveM stacks with ox_lib, ox_inventory, and target support." },
  { icon: "users", title: "Community Support", text: "Join the Discord for updates, support, previews, and new script announcements." },
];

const TEST_CASES = [
  { name: "Discord link is present", pass: DISCORD_URL === "https://discord.gg/5rRMZ2R9EP" },
  { name: "At least 3 scripts are listed", pass: products.length >= 3 },
  { name: "Every feature has a local icon", pass: features.every((feature) => Boolean(icons[feature.icon])) },
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

function getProductStatuses(product) {
  return [
    product.price === "FREE" ? "Free" : "Paid",
    product.buyUrl ? "Direct Buy" : "Discord Delivery",
    product.gumroadUrl ? "Gumroad" : "Gumroad Store",
    product.updateNotes?.length ? "Updated" : null,
  ].filter(Boolean);
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
  return product?.gumroadUrl || GUMROAD_STORE_URL;
}

function sortProductsByUpdatedOn(list) {
  return [...list].sort((a, b) => new Date(b.updatedOn || 0).getTime() - new Date(a.updatedOn || 0).getTime());
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
    <section id="support" className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950/80 p-8 md:p-10">
        <div className="mb-8 text-center md:text-left">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">Support</p>
          <h2 className="mt-3 text-4xl font-black">Get help from BMTB</h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Send us an email for setup help, script questions, or store issues. You can also join Discord for faster community support.
          </p>
        </div>

        <form onSubmit={handleSendEmail} className="grid gap-4">
          <div>
            <label htmlFor="support-subject" className="mb-2 block text-sm font-bold text-zinc-300">
              Subject
            </label>
            <input
              id="support-subject"
              type="text"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="What do you need help with?"
              required
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-yellow-400/60"
            />
          </div>

          <div>
            <label htmlFor="support-message" className="mb-2 block text-sm font-bold text-zinc-300">
              Message
            </label>
            <textarea
              id="support-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Describe your issue, script name, framework, and any error messages."
              required
              rows={6}
              className="w-full resize-y rounded-xl border border-zinc-700 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-yellow-400/60"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-6 py-3 text-sm font-black text-black transition hover:scale-[1.02]"
            >
              Send Email
            </button>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/70 px-6 py-3 text-sm font-black text-white transition hover:border-yellow-400/60"
            >
              <Icon name="message" className="mr-2" size={18} /> Join Discord
            </a>
          </div>

          <p className="text-xs text-zinc-500">
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

function FeaturesPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <div className="mb-10 text-center">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">Why BMTB</p>
        <h1 className="mt-3 text-4xl font-black md:text-5xl">Built for premium roleplay servers</h1>
        <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
          Every BMTB resource is designed for performance, immersion, and modern FiveM server stacks.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6 shadow-xl shadow-black/20">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
              <Icon name={feature.icon} size={24} />
            </div>
            <h2 className="text-xl font-black">{feature.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <Link to="/" className="flex items-center gap-3">
        <img
          src="/bmtb-logo.png"
          alt="BMTB logo"
          loading="eager"
          decoding="async"
          className="h-11 w-11 rounded-2xl border border-yellow-400/30 bg-black object-contain p-1 shadow-lg shadow-yellow-400/20"
        />
        <div>
          <p className="text-lg font-black tracking-wide">BMTB Scripts</p>
          <p className="text-xs text-zinc-400">Premium FiveM Resources</p>
        </div>
      </Link>
      <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
        <Link to="/scripts" className="hover:text-yellow-300">Scripts</Link>
        <Link to="/features" className="hover:text-yellow-300">Features</Link>
        <Link to="/support" className="hover:text-yellow-300">Support</Link>
      </nav>
      <div className="flex items-center gap-3">
        <Link to="/scripts" className="hidden rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-xs font-bold text-white transition hover:border-yellow-400/60 md:inline-flex">
          Open Store
        </Link>
        <a href={DISCORD_URL} className="rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-bold text-black shadow-lg shadow-yellow-400/20 transition hover:scale-105">
          Join Discord
        </a>
      </div>
    </header>
  );
}

function HomePage() {
  const latestProducts = sortProductsByUpdatedOn(products).slice(0, 3);
  const popularJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: latestProducts.map((product, index) => ({
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
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm text-yellow-200">
            <Icon name="star" size={16} /> Premium FiveM Scripts Built for Serious Servers
          </div>
          <h1 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Build your server with <span className="text-yellow-400">BMTB quality</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
            Professional FiveM scripts with clean UI, immersive gameplay, optimized code, and support for modern ESX/QBCore server stacks.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link to="/scripts" className="group inline-flex items-center justify-center rounded-2xl bg-yellow-400 px-7 py-4 font-black text-black shadow-xl shadow-yellow-400/20 transition hover:scale-105">
              View Scripts <Icon name="chevron" className="ml-2 transition group-hover:translate-x-1" size={20} />
            </Link>
            <a href={DISCORD_URL} className="inline-flex items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900/70 px-7 py-4 font-bold text-white transition hover:border-yellow-400/60">
              <Icon name="message" className="mr-2" size={20} /> Join Community
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative">
          <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950/80 p-5 shadow-2xl shadow-black/50 backdrop-blur">
            <div className="rounded-[1.5rem] border border-yellow-400/20 bg-gradient-to-br from-zinc-900 to-black p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Live Resource Panel</p>
                  <p className="text-2xl font-black">BMTB Store</p>
                </div>
                <div className="rounded-full bg-green-400/15 px-3 py-1 text-sm font-bold text-green-300">Online</div>
              </div>
              <div className="space-y-3">
                {["Secure Events", "Modern UI", "Optimized Loops", "Discord Support"].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-black/40 p-4">
                    <span className="font-bold">{item}</span>
                    <span className="text-yellow-400">Enabled</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-yellow-400 p-5 text-black">
                <p className="text-sm font-bold uppercase tracking-widest">Coming Soon</p>
                <p className="mt-1 text-2xl font-black">BMTB TRAPHONE</p>
                <p className="mt-2 text-sm font-semibold text-black/70">Trap phone script dropping soon on Tebex and Gumroad.</p>
                <TrapPhoneCountdown />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="popular" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">Store</p>
            <h2 className="mt-3 text-4xl font-black">Latest Scripts</h2>
          </div>
          <p className="max-w-lg text-zinc-400">Recently updated BMTB scripts, newest first.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {latestProducts.map((product) => (
            <div key={product.name} className="group rounded-[2rem] border border-zinc-800 bg-zinc-950/80 p-6 transition hover:-translate-y-1 hover:border-yellow-400/40">
              {product.imageUrl && (
                <div className="mb-5 overflow-hidden rounded-2xl border border-zinc-800">
                  <img
                    src={product.imageUrl}
                    alt={`${product.name} card preview`}
                    loading="lazy"
                    decoding="async"
                    className="h-32 w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-sm font-bold text-yellow-300">{product.tag}</span>
                <Icon name="code" className="text-zinc-500 group-hover:text-yellow-400" />
              </div>
              <h3 className="text-2xl font-black">{product.name}</h3>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">{getProductVersion(product)} • {product.updatedOn || "No date"}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {getProductStatuses(product).map((status) => (
                  <span key={`${product.slug}-${status}`} className="rounded-full border border-zinc-700 bg-zinc-900/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-zinc-300">
                    {status}
                  </span>
                ))}
              </div>
              <p className="mt-3 min-h-[88px] text-sm leading-6 text-zinc-400">{product.desc}</p>
              <div className="mt-7 flex items-center justify-between border-t border-zinc-800 pt-5">
                <p className="text-2xl font-black text-yellow-400">{product.price}</p>
                <div className="flex items-center gap-2">
                  <a
                    href={getTebexLink(product)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-white px-4 py-2 text-sm font-black text-black transition hover:bg-yellow-400"
                  >
                    Download
                  </a>
                  <Link to={`/scripts/${product.slug}`} className="rounded-xl border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm font-black text-white transition hover:border-yellow-400/60">
                    Info
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}

function ScriptsCatalogPage() {
  const [query, setQuery] = useState("");
  const catalogProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      if (!normalizedQuery) {
        return true;
      }
      return (
        product.name.toLowerCase().includes(normalizedQuery)
        || product.desc.toLowerCase().includes(normalizedQuery)
        || product.tag.toLowerCase().includes(normalizedQuery)
      );
    });

    return sortProductsByUpdatedOn(filtered);
  }, [query]);

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
    <section id="scripts" className="mx-auto max-w-7xl px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }} />
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">Catalog</p>
          <h2 className="mt-3 text-4xl font-black">All Scripts</h2>
        </div>
        <p className="max-w-lg text-zinc-400">Browse the full BMTB Scripts catalog with previews, pricing, and info pages.</p>
      </div>
      <div className="mb-8">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search scripts by name, tag, or description"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-yellow-400/60"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {catalogProducts.map((product) => (
          <div key={`${product.slug}-all`} className="group rounded-[2rem] border border-zinc-800 bg-zinc-950/80 p-6 transition hover:-translate-y-1 hover:border-yellow-400/40">
            {product.imageUrl && (
              <div className="mb-5 overflow-hidden rounded-2xl border border-zinc-800">
                <img
                  src={product.imageUrl}
                  alt={`${product.name} card preview`}
                  loading="lazy"
                  decoding="async"
                  className="h-24 w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                />
              </div>
            )}
            <div className="mb-5 flex items-center justify-between">
              <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-sm font-bold text-yellow-300">{product.tag}</span>
              <Icon name="code" className="text-zinc-500 group-hover:text-yellow-400" />
            </div>
            <h3 className="text-2xl font-black">{product.name}</h3>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">{getProductVersion(product)} • {product.updatedOn || "No date"}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {getProductStatuses(product).map((status) => (
                <span key={`${product.slug}-all-${status}`} className="rounded-full border border-zinc-700 bg-zinc-900/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-zinc-300">
                  {status}
                </span>
              ))}
            </div>
            <p className="mt-3 min-h-[88px] text-sm leading-6 text-zinc-400">{product.desc}</p>
            <div className="mt-7 flex items-center justify-between border-t border-zinc-800 pt-5">
              <p className="text-2xl font-black text-yellow-400">{product.price}</p>
              <div className="flex items-center gap-2">
                <a
                  href={getTebexLink(product)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-white px-4 py-2 text-sm font-black text-black transition hover:bg-yellow-400"
                >
                  Download
                </a>
                <Link to={`/scripts/${product.slug}`} className="rounded-xl border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm font-black text-white transition hover:border-yellow-400/60">
                  Info
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ScriptInfoPage() {
  const { slug } = useParams();
  const product = productBySlug[slug];
  const tebexLink = product ? getTebexLink(product) : TEBEX_FREE_CATEGORY_URL;
  const gumroadLink = product ? getGumroadLink(product) : GUMROAD_STORE_URL;
  const [assetIdCopied, setAssetIdCopied] = useState(false);

  const handleCopyAssetId = async () => {
    if (!product?.assetId) {
      return;
    }
    try {
      await navigator.clipboard.writeText(String(product.assetId));
      setAssetIdCopied(true);
      setTimeout(() => setAssetIdCopied(false), 1800);
    } catch {
      setAssetIdCopied(false);
    }
  };

  if (!product) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8 text-center">
          <h1 className="text-3xl font-black">Script not found</h1>
          <p className="mt-3 text-zinc-400">This info page does not exist yet.</p>
          <Link to="/" className="mt-6 inline-flex rounded-xl bg-yellow-400 px-5 py-3 font-black text-black">
            Back to scripts
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-yellow-300 hover:text-yellow-200">
        <Icon name="chevron" size={16} className="rotate-180" /> Back to all scripts
      </Link>

      <div className="sticky bottom-3 z-20 mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-zinc-700 bg-black/80 p-2 backdrop-blur md:hidden">
        <a href={tebexLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl bg-yellow-400 px-3 py-2 text-xs font-black text-black">
          Download
        </a>
        <a href={gumroadLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl border border-zinc-600 bg-zinc-900 px-3 py-2 text-xs font-black text-white">
          Gumroad
        </a>
        <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl border border-zinc-600 bg-zinc-900 px-3 py-2 text-xs font-black text-white">
          Discord
        </a>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.9fr]">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-4 md:p-6">
          {product.youtubeEmbed ? (
            <iframe
              title={`${product.name} preview video`}
              src={product.youtubeEmbed}
              className="aspect-video w-full rounded-2xl border border-zinc-800"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={product.imageUrl}
              alt={`${product.name} preview`}
              loading="lazy"
              decoding="async"
              className="w-full rounded-2xl border border-zinc-800 object-cover"
            />
          )}
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-yellow-300">{product.tag}</span>
              <span className="text-sm font-bold text-zinc-400">{product.price}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {getProductStatuses(product).map((status) => (
                <span key={`${product.slug}-detail-${status}`} className="rounded-full border border-zinc-700 bg-zinc-900/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-zinc-300">
                  {status}
                </span>
              ))}
            </div>
            <h1 className="mt-3 text-3xl font-black md:text-4xl">{product.name}</h1>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">{getProductVersion(product)} • Updated on {product.updatedOn || "No date"}</p>
            <p className="mt-4 leading-7 text-zinc-300">{product.fullDesc}</p>
          </div>

          {(product.updateNotes || product.requirements || product.installSteps) && (
            <div className="mt-6 rounded-2xl border border-zinc-800 bg-black/30 p-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-400">{product.infoHeading || "Info"}</p>

              {product.updateNotes && product.updateNotes.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-black text-white">What changed</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-300">
                    {product.updateNotes.map((note) => (
                      <li key={note} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.requirements && product.requirements.length > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-black text-white">Requirements</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.requirements.map((requirement) => (
                      <span key={requirement} className="rounded-full border border-yellow-400/40 bg-yellow-400/10 px-3 py-1 text-xs font-bold text-yellow-200">
                        {requirement}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.installSteps && product.installSteps.length > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-black text-white">Setup</p>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-zinc-300">
                    {product.installSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}

              {product.notes && product.notes.length > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-black text-white">Notes</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-300">
                    {product.notes.map((note) => (
                      <li key={note} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-400" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/80">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={`${product.name} thumbnail`} loading="lazy" decoding="async" className="aspect-video w-full object-cover" />
            ) : (
              <div className="flex aspect-video items-center justify-center px-6 text-center text-sm text-zinc-400">
                Upload or set an image URL to show a dedicated thumbnail in this side panel.
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-400">Actions</p>
            <div className="mt-4 grid gap-3">
              <a
                href={tebexLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center rounded-xl bg-yellow-400 px-5 py-3 text-sm font-black text-black transition hover:scale-[1.02]"
              >
                Download
              </a>
              <a
                href={gumroadLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center rounded-xl border border-yellow-400/50 bg-yellow-400/10 px-5 py-3 text-sm font-black text-yellow-200 transition hover:border-yellow-300 hover:bg-yellow-400/20"
              >
                Gumroad
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center rounded-xl border border-zinc-700 bg-zinc-900/70 px-5 py-3 text-sm font-black text-white transition hover:border-yellow-400/60"
              >
                Join Discord for Support
              </a>
              {product.assetId && (
                <button
                  type="button"
                  onClick={handleCopyAssetId}
                  className="inline-flex justify-center rounded-xl border border-zinc-700 bg-zinc-900/70 px-5 py-3 text-sm font-black text-white transition hover:border-yellow-400/60"
                >
                  {assetIdCopied ? `Asset ID Copied (${product.assetId})` : `Copy Asset ID (${product.assetId})`}
                </button>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-wide text-zinc-400">
              <span className="rounded-full border border-zinc-700 bg-zinc-900/70 px-3 py-1">Instant Delivery</span>
              <span className="rounded-full border border-zinc-700 bg-zinc-900/70 px-3 py-1">Discord Support</span>
              <span className="rounded-full border border-zinc-700 bg-zinc-900/70 px-3 py-1">{product.gumroadUrl ? "Gumroad" : "Gumroad Store"}</span>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-400">How to Receive Files</p>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Download from either store below. Both deliver the script files instantly after checkout.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-zinc-300">
              <li>Open <strong className="text-white">Tebex</strong> or <strong className="text-white">Gumroad</strong> using the buttons below.</li>
              <li>Add the script to your basket on Tebex, or open the product on Gumroad and complete checkout (free scripts included).</li>
              <li>Download the files from your Tebex account or Gumroad library right after checkout.</li>
              <li>Extract the resource folder into your server&apos;s <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-yellow-200">resources</code> directory and follow the setup steps on this page.</li>
              <li>Join Discord if you need install help or support.</li>
            </ol>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={tebexLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-xl bg-yellow-400 px-4 py-2 text-sm font-black text-black transition hover:scale-[1.02]"
              >
                Download on Tebex
              </a>
              <a
                href={gumroadLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-xl border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm font-black text-white transition hover:border-yellow-400/60"
              >
                Download on Gumroad
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-xl border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm font-black text-white transition hover:border-yellow-400/60"
              >
                Discord Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-zinc-900 px-6 py-8 text-center text-sm text-zinc-500">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <p>© 2026 BMTB Scripts. All rights reserved.</p>
        <div className="flex items-center gap-2 text-zinc-400"><Icon name="server" size={16} /> Premium FiveM Resources</div>
      </div>
    </footer>
  );
}

export default function BMTBScriptsWebsite() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#080808] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.18),transparent_35%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_25%)]" />
      <div className="relative z-10">
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scripts" element={<ScriptsCatalogPage />} />
          <Route path="/scripts/:slug" element={<ScriptInfoPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-center text-4xl font-black">Latest Changelog</h2>
          <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
            <ul className="space-y-2 text-sm leading-6 text-zinc-300">
              <li>- Added per-script info pages with image, video, and action buttons.</li>
              <li>- Introduced buy/Discord/CFX action flow and purchase ticket template helper.</li>
              <li>- Updated script cards to show thumbnail strips and status badges.</li>
              <li>- Added SEO metadata, terms/refund/license blocks, and optional analytics hooks.</li>
            </ul>
          </div>
        </section>
        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-center text-4xl font-black">FAQ</h2>
          <div className="mt-8 space-y-4">
            {[
              ["Do the scripts support ESX and QBCore?", "Most BMTB resources can be built with ESX/QBCore support depending on the script. Add compatibility details per product."],
              ["How do customers get support?", "Visit the Support page to email bankrollmadethisbeat@gmail.com or join the BMTB Discord for help."],
              ["Where do I download scripts?", "Use the Download button on each script card for Tebex, or open the script info page for Tebex and Gumroad download links."],
            ].map(([q, a]) => (
              <div key={q} className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
                <p className="font-black">{q}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{a}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <h2 className="text-center text-4xl font-black">Terms, Refund, and License</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
              <p className="font-black">License</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">Each purchase grants usage rights for your server setup. Redistribution, leaking, or re-selling files is not allowed.</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
              <p className="font-black">Refund Policy</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">Digital products are generally non-refundable after delivery. Payment disputes should be handled through support first.</p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
              <p className="font-black">Support</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">Email bankrollmadethisbeat@gmail.com on the Support page or join Discord for setup help after downloading from Tebex or Gumroad.</p>
            </div>
          </div>
        </section>
        <SiteFooter />
      </div>
    </div>
  );
}

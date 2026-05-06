import React from "react";
import { motion } from "framer-motion";

const DISCORD_URL = "https://discord.gg/5rRMZ2R9EP";

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

function Icon({ name, size = 22, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d={icons[name]} />
    </svg>
  );
}

const products = [
  {
    name: "BMTB Scamming",
    desc: "Immersive street-card cloning, burner phone jobs, ATM flow, heat system, and crew gameplay.",
    price: "$24.99",
    tag: "Featured",
  },
  {
    name: "BMTB RealEstate",
    desc: "Starter apartments, shells, property tools, bills integration, and admin testing support.",
    price: "$34.99",
    tag: "Premium",
  },
  {
    name: "BMTB TextUI",
    desc: "Advanced standalone TextUI and 3D prompts with ox_lib-style flexibility and clean animations.",
    price: "$14.99",
    tag: "Utility",
  },
];

const features = [
  { icon: "shield", title: "Secure Server Logic", text: "Built with anti-exploit checks, validated events, and clean server authority." },
  { icon: "zap", title: "Optimized Performance", text: "Lightweight loops, smart state handling, and clean FiveM resource structure." },
  { icon: "package", title: "ESX / QBCore Ready", text: "Scripts designed for modern FiveM stacks with ox_lib, ox_inventory, and target support." },
  { icon: "users", title: "Community Support", text: "Join the Discord for updates, support, previews, and new script announcements." },
];

export const TEST_CASES = [
  { name: "Discord link is present", pass: DISCORD_URL === "https://discord.gg/5rRMZ2R9EP" },
  { name: "At least 3 scripts are listed", pass: products.length >= 3 },
  { name: "Every feature has a local icon", pass: features.every((feature) => Boolean(icons[feature.icon])) },
  { name: "Every product has a price", pass: products.every((product) => /^\$\d/.test(product.price)) },
];

function runSelfChecks() {
  const failed = TEST_CASES.filter((test) => !test.pass);
  if (failed.length > 0) {
    console.warn("BMTB Scripts website self-check failed:", failed.map((test) => test.name).join(", "));
  }
}

runSelfChecks();

export default function BMTBScriptsWebsite() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#080808] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.18),transparent_35%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_25%)]" />
      <div className="relative z-10">
        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400 font-black text-black shadow-lg shadow-yellow-400/20">B</div>
            <div>
              <p className="text-lg font-black tracking-wide">BMTB Scripts</p>
              <p className="text-xs text-zinc-400">Premium FiveM Resources</p>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
            <a href="#scripts" className="hover:text-yellow-300">Scripts</a>
            <a href="#features" className="hover:text-yellow-300">Features</a>
            <a href="#support" className="hover:text-yellow-300">Support</a>
          </nav>
          <a href={DISCORD_URL} className="rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-bold text-black shadow-lg shadow-yellow-400/20 transition hover:scale-105">
            Join Discord
          </a>
        </header>

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
              <a href="#scripts" className="group inline-flex items-center justify-center rounded-2xl bg-yellow-400 px-7 py-4 font-black text-black shadow-xl shadow-yellow-400/20 transition hover:scale-105">
                View Scripts <Icon name="chevron" className="ml-2 transition group-hover:translate-x-1" size={20} />
              </a>
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
                  <p className="text-sm font-bold uppercase tracking-widest">New Release</p>
                  <p className="mt-1 text-2xl font-black">BMTB Scamming</p>
                  <p className="mt-2 text-sm font-semibold text-black/70">Card cloning, burner jobs, ATM gameplay, and crew heat system.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10 text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">Why BMTB</p>
            <h2 className="mt-3 text-4xl font-black">Built for premium roleplay servers</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-6 shadow-xl shadow-black/20">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon name={feature.icon} size={24} />
                </div>
                <h3 className="text-xl font-black">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="scripts" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">Store</p>
              <h2 className="mt-3 text-4xl font-black">Featured Scripts</h2>
            </div>
            <p className="max-w-lg text-zinc-400">Add your real product images, videos, docs, and checkout links here when ready.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <div key={product.name} className="group rounded-[2rem] border border-zinc-800 bg-zinc-950/80 p-6 transition hover:-translate-y-1 hover:border-yellow-400/40">
                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-sm font-bold text-yellow-300">{product.tag}</span>
                  <Icon name="code" className="text-zinc-500 group-hover:text-yellow-400" />
                </div>
                <h3 className="text-2xl font-black">{product.name}</h3>
                <p className="mt-3 min-h-[88px] text-sm leading-6 text-zinc-400">{product.desc}</p>
                <div className="mt-7 flex items-center justify-between border-t border-zinc-800 pt-5">
                  <p className="text-2xl font-black text-yellow-400">{product.price}</p>
                  <a href={DISCORD_URL} className="rounded-xl bg-white px-4 py-2 text-sm font-black text-black transition hover:bg-yellow-400">Buy / Info</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="support" className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[2rem] border border-yellow-400/20 bg-gradient-to-r from-yellow-400 to-yellow-300 p-8 text-black md:p-12">
            <div className="grid gap-8 md:grid-cols-[1.5fr_0.8fr] md:items-center">
              <div>
                <p className="font-black uppercase tracking-[0.25em]">BMTB Community</p>
                <h2 className="mt-3 text-4xl font-black md:text-5xl">Need support or want previews?</h2>
                <p className="mt-4 max-w-2xl text-lg font-semibold text-black/70">
                  Join the Discord to see updates, ask questions, get setup help, and follow new BMTB script releases.
                </p>
              </div>
              <a href={DISCORD_URL} className="inline-flex items-center justify-center rounded-2xl bg-black px-8 py-5 text-lg font-black text-white shadow-xl transition hover:scale-105">
                <Icon name="message" className="mr-3" /> Join Discord
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-center text-4xl font-black">FAQ</h2>
          <div className="mt-8 space-y-4">
            {[
              ["Do the scripts support ESX and QBCore?", "Most BMTB resources can be built with ESX/QBCore support depending on the script. Add compatibility details per product."],
              ["How do customers get support?", "Send customers to the Discord and create private ticket channels for verified buyers."],
              ["Can I add Tebex or another checkout later?", "Yes. Replace the Buy / Info buttons with your product checkout links when your store is ready."],
            ].map(([q, a]) => (
              <div key={q} className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
                <p className="font-black">{q}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t border-zinc-900 px-6 py-8 text-center text-sm text-zinc-500">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
            <p>© 2026 BMTB Scripts. All rights reserved.</p>
            <div className="flex items-center gap-2 text-zinc-400"><Icon name="server" size={16} /> Premium FiveM Resources</div>
          </div>
        </footer>
      </div>
    </div>
  );
}

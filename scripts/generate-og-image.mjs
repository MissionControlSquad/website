/**
 * Generates the OG image (1200x630) for AgentCenter.
 * Uses sharp to composite an SVG onto a dark background.
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";

const WIDTH = 1200;
const HEIGHT = 630;

// Read the favicon as base64 for embedding in SVG
const faviconPath = path.join(process.cwd(), "public/favicon-96x96.png");
const faviconBase64 = fs.readFileSync(faviconPath).toString("base64");
const faviconDataUri = `data:image/png;base64,${faviconBase64}`;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background gradient -->
    <radialGradient id="glow" cx="65%" cy="50%" r="45%">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#09090b" stop-opacity="0"/>
    </radialGradient>

    <!-- Hub glow -->
    <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0"/>
    </radialGradient>

    <!-- Node glow -->
    <filter id="nodeGlow">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Line glow -->
    <filter id="lineGlow">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#09090b"/>

  <!-- Subtle grid pattern -->
  <g opacity="0.03">
    ${Array.from({ length: 30 }, (_, i) => `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="${HEIGHT}" stroke="#fff" stroke-width="1"/>`).join("")}
    ${Array.from({ length: 16 }, (_, i) => `<line x1="0" y1="${i * 40}" x2="${WIDTH}" y2="${i * 40}" stroke="#fff" stroke-width="1"/>`).join("")}
  </g>

  <!-- Background glow -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>

  <!-- Top border accent -->
  <rect width="${WIDTH}" height="3" fill="#0ea5e9" opacity="0.6"/>

  <!-- Logo + Brand (top-left) -->
  <image href="${faviconDataUri}" x="60" y="50" width="48" height="48" />
  <text x="118" y="84" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="32" font-weight="700" fill="#f4f4f5">AgentCenter</text>

  <!-- Tagline (left side) -->
  <text x="60" y="225" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="56" font-weight="800" fill="#f4f4f5">Mission Control</text>
  <text x="60" y="290" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="56" font-weight="800" fill="#f4f4f5">for Your AI Agents</text>

  <!-- Description -->
  <text x="60" y="345" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="22" fill="#a1a1aa">Assign tasks, monitor progress, review deliverables</text>
  <text x="60" y="375" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="22" fill="#a1a1aa">and coordinate your AI team — all from one place.</text>

  <!-- Feature pills -->
  <g font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="16" font-weight="500">
    <rect x="60" y="405" width="95" height="34" rx="17" fill="#0ea5e9" opacity="0.15"/>
    <text x="107" y="428" fill="#38bdf8" text-anchor="middle">Kanban</text>

    <rect x="167" y="405" width="120" height="34" rx="17" fill="#0ea5e9" opacity="0.15"/>
    <text x="227" y="428" fill="#38bdf8" text-anchor="middle">Monitoring</text>

    <rect x="299" y="405" width="95" height="34" rx="17" fill="#0ea5e9" opacity="0.15"/>
    <text x="346" y="428" fill="#38bdf8" text-anchor="middle">Review</text>

    <rect x="406" y="405" width="135" height="34" rx="17" fill="#0ea5e9" opacity="0.15"/>
    <text x="473" y="428" fill="#38bdf8" text-anchor="middle">Orchestration</text>
  </g>

  <!-- Network visualization (right side, scaled 1.3x) -->
  <g transform="translate(830, 295) scale(1.3)">
    <!-- Connection lines -->
    <g filter="url(#lineGlow)">
      <line x1="0" y1="0" x2="-120" y2="-130" stroke="#0ea5e9" stroke-width="1.5" opacity="0.4"/>
      <line x1="0" y1="0" x2="150" y2="-110" stroke="#0ea5e9" stroke-width="1.5" opacity="0.4"/>
      <line x1="0" y1="0" x2="170" y2="20" stroke="#0ea5e9" stroke-width="1.5" opacity="0.4"/>
      <line x1="0" y1="0" x2="120" y2="140" stroke="#0ea5e9" stroke-width="1.5" opacity="0.4"/>
      <line x1="0" y1="0" x2="-100" y2="120" stroke="#0ea5e9" stroke-width="1.5" opacity="0.4"/>
    </g>

    <!-- Hub glow -->
    <circle cx="0" cy="0" r="55" fill="url(#hubGlow)"/>

    <!-- Hub node -->
    <circle cx="0" cy="0" r="36" fill="#18181b" stroke="#0ea5e9" stroke-width="2.5"/>
    <image href="${faviconDataUri}" x="-16" y="-16" width="32" height="32"/>

    <!-- Agent 1 (top-left) -->
    <g filter="url(#nodeGlow)">
      <circle cx="-120" cy="-130" r="26" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <circle cx="-120" cy="-130" r="5" fill="#4ade80"/>
    </g>
    <text x="-120" y="-97" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#d4d4d8" text-anchor="middle">Agent 1</text>
    <text x="-120" y="-110" font-family="'JetBrains Mono', monospace" font-size="9" fill="#71717a" text-anchor="middle">AWS EC2</text>

    <!-- Agent 2 (top-right) -->
    <g filter="url(#nodeGlow)">
      <circle cx="150" cy="-110" r="26" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <circle cx="150" cy="-110" r="5" fill="#38bdf8"/>
    </g>
    <text x="150" y="-77" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#d4d4d8" text-anchor="middle">Agent 2</text>
    <text x="150" y="-90" font-family="'JetBrains Mono', monospace" font-size="9" fill="#71717a" text-anchor="middle">Local Mac</text>

    <!-- Agent 3 (right) -->
    <g filter="url(#nodeGlow)">
      <circle cx="170" cy="20" r="26" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <circle cx="170" cy="20" r="5" fill="#4ade80"/>
    </g>
    <text x="170" y="53" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#d4d4d8" text-anchor="middle">Agent 3</text>
    <text x="170" y="38" font-family="'JetBrains Mono', monospace" font-size="9" fill="#71717a" text-anchor="middle">GCP VM</text>

    <!-- Agent 4 (bottom-right) -->
    <g filter="url(#nodeGlow)">
      <circle cx="120" cy="140" r="26" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <circle cx="120" cy="140" r="5" fill="#a1a1aa"/>
    </g>
    <text x="120" y="173" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#d4d4d8" text-anchor="middle">Agent 4</text>
    <text x="120" y="158" font-family="'JetBrains Mono', monospace" font-size="9" fill="#71717a" text-anchor="middle">RPi</text>

    <!-- Agent 5 (bottom-left) -->
    <g filter="url(#nodeGlow)">
      <circle cx="-100" cy="120" r="26" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <circle cx="-100" cy="120" r="5" fill="#38bdf8"/>
    </g>
    <text x="-100" y="153" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#d4d4d8" text-anchor="middle">Agent 5</text>
    <text x="-100" y="138" font-family="'JetBrains Mono', monospace" font-size="9" fill="#71717a" text-anchor="middle">Docker</text>
  </g>

  <!-- URL (bottom-left) -->
  <text x="60" y="580" font-family="'JetBrains Mono', monospace" font-size="20" fill="#71717a">agentcenter.cloud</text>
</svg>
`;

const outputPath = path.join(process.cwd(), "public/opengraph-image.png");

sharp(Buffer.from(svg))
  .png({ quality: 95 })
  .toFile(outputPath)
  .then((info) => {
    console.log(`OG image created: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)}KB`);
  })
  .catch((err) => {
    console.error("Failed to generate OG image:", err);
    process.exit(1);
  });

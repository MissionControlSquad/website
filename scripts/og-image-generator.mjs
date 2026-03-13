/**
 * Core OG image generator for AgentCenter.
 * Builds a 1200x630 PNG from SVG using sharp.
 *
 * Usage:
 *   import { generateOgImage } from "./og-image-generator.mjs";
 *   await generateOgImage({ category, title, subtitle, outputPath, accentColor });
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";

const WIDTH = 1200;
const HEIGHT = 630;

const faviconPath = path.join(process.cwd(), "public/favicon-96x96.png");
const faviconBase64 = fs.readFileSync(faviconPath).toString("base64");
const faviconDataUri = `data:image/png;base64,${faviconBase64}`;

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Wrap text into lines of at most maxCharsPerLine characters, up to maxLines.
 */
function wrapText(text, maxCharsPerLine, maxLines = 3) {
  const words = text.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    if (current.length === 0) {
      current = word;
    } else if ((current + " " + word).length <= maxCharsPerLine) {
      current += " " + word;
    } else {
      lines.push(current);
      current = word;
      if (lines.length >= maxLines) break;
    }
  }

  if (current) {
    if (lines.length < maxLines) {
      lines.push(current);
    } else {
      // Truncate last line with ellipsis if remaining text doesn't fit
      lines[lines.length - 1] = lines[lines.length - 1].slice(0, maxCharsPerLine - 3) + "...";
    }
  }

  return lines.slice(0, maxLines);
}

/**
 * Pick font size and wrap settings based on title length.
 */
function getTitleConfig(title) {
  const len = title.length;
  if (len <= 28) return { fontSize: 52, maxCharsPerLine: 28, lineHeight: 65 };
  if (len <= 48) return { fontSize: 44, maxCharsPerLine: 32, lineHeight: 57 };
  if (len <= 75) return { fontSize: 36, maxCharsPerLine: 38, lineHeight: 47 };
  return { fontSize: 30, maxCharsPerLine: 44, lineHeight: 40 };
}

function buildSvg({ category, title, subtitle, accentColor = "#0ea5e9" }) {
  const { fontSize, maxCharsPerLine, lineHeight } = getTitleConfig(title);
  const titleLines = wrapText(title, maxCharsPerLine, 3);
  const subtitleLines = subtitle ? wrapText(subtitle, 56, 2) : [];

  // Y layout: logo at top, category pill, title block, subtitle, URL at bottom
  const categoryPillH = category ? 55 : 0;
  const titleBlockH = titleLines.length * lineHeight;
  const subtitleBlockH = subtitleLines.length > 0 ? 28 + subtitleLines.length * 30 : 0;
  const totalBlockH = categoryPillH + titleBlockH + subtitleBlockH;

  // Center the content block in the space between y=110 and y=545
  const availableH = 545 - 110;
  const blockTop = 110 + Math.max(0, Math.floor((availableH - totalBlockH) / 2));

  const categoryPillY = blockTop;
  const titleStartY = blockTop + categoryPillH + fontSize * 0.82; // SVG text y is baseline
  const subtitleStartY = titleStartY + (titleLines.length - 1) * lineHeight + 32;

  // Category pill
  const pillWidth = category ? category.length * 9.5 + 30 : 0;
  const categoryPillSvg = category
    ? `
  <!-- Category pill -->
  <rect x="60" y="${categoryPillY}" width="${pillWidth}" height="32" rx="16" fill="${accentColor}" opacity="0.15"/>
  <text x="${60 + pillWidth / 2}" y="${categoryPillY + 22}" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="13" font-weight="600" letter-spacing="1.5" fill="${accentColor}" text-anchor="middle">${escapeXml(category)}</text>`
    : "";

  // Title lines
  const titleSvg = titleLines
    .map(
      (line, i) =>
        `  <text x="60" y="${titleStartY + i * lineHeight}" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="${fontSize}" font-weight="800" fill="#f4f4f5">${escapeXml(line)}</text>`
    )
    .join("\n");

  // Subtitle lines
  const subtitleSvg = subtitleLines
    .map(
      (line, i) =>
        `  <text x="60" y="${subtitleStartY + i * 30}" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="20" fill="#a1a1aa">${escapeXml(line)}</text>`
    )
    .join("\n");

  return `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="65%" cy="50%" r="45%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#09090b" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0"/>
    </radialGradient>
    <filter id="nodeGlow">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="lineGlow">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#09090b"/>

  <!-- Subtle grid -->
  <g opacity="0.03">
    ${Array.from({ length: 30 }, (_, i) => `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="${HEIGHT}" stroke="#fff" stroke-width="1"/>`).join("")}
    ${Array.from({ length: 16 }, (_, i) => `<line x1="0" y1="${i * 40}" x2="${WIDTH}" y2="${i * 40}" stroke="#fff" stroke-width="1"/>`).join("")}
  </g>

  <!-- Background glow -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>

  <!-- Top border accent -->
  <rect width="${WIDTH}" height="3" fill="${accentColor}" opacity="0.7"/>

  <!-- Logo + Brand -->
  <image href="${faviconDataUri}" x="60" y="50" width="48" height="48"/>
  <text x="118" y="84" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="32" font-weight="700" fill="#f4f4f5">AgentCenter</text>
${categoryPillSvg}

  <!-- Title -->
${titleSvg}

  <!-- Subtitle -->
${subtitleSvg}

  <!-- Network visualization (right side) -->
  <g transform="translate(830, 295) scale(1.3)">
    <g filter="url(#lineGlow)">
      <line x1="0" y1="0" x2="-120" y2="-130" stroke="#0ea5e9" stroke-width="1.5" opacity="0.4"/>
      <line x1="0" y1="0" x2="150" y2="-110" stroke="#0ea5e9" stroke-width="1.5" opacity="0.4"/>
      <line x1="0" y1="0" x2="170" y2="20" stroke="#0ea5e9" stroke-width="1.5" opacity="0.4"/>
      <line x1="0" y1="0" x2="120" y2="140" stroke="#0ea5e9" stroke-width="1.5" opacity="0.4"/>
      <line x1="0" y1="0" x2="-100" y2="120" stroke="#0ea5e9" stroke-width="1.5" opacity="0.4"/>
    </g>
    <circle cx="0" cy="0" r="55" fill="url(#hubGlow)"/>
    <circle cx="0" cy="0" r="36" fill="#18181b" stroke="#0ea5e9" stroke-width="2.5"/>
    <image href="${faviconDataUri}" x="-16" y="-16" width="32" height="32"/>
    <g filter="url(#nodeGlow)">
      <circle cx="-120" cy="-130" r="26" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <circle cx="-120" cy="-130" r="5" fill="#4ade80"/>
    </g>
    <text x="-120" y="-97" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#d4d4d8" text-anchor="middle">Agent 1</text>
    <text x="-120" y="-110" font-family="'JetBrains Mono', monospace" font-size="9" fill="#71717a" text-anchor="middle">AWS EC2</text>
    <g filter="url(#nodeGlow)">
      <circle cx="150" cy="-110" r="26" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <circle cx="150" cy="-110" r="5" fill="#38bdf8"/>
    </g>
    <text x="150" y="-77" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#d4d4d8" text-anchor="middle">Agent 2</text>
    <text x="150" y="-90" font-family="'JetBrains Mono', monospace" font-size="9" fill="#71717a" text-anchor="middle">Local Mac</text>
    <g filter="url(#nodeGlow)">
      <circle cx="170" cy="20" r="26" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <circle cx="170" cy="20" r="5" fill="#4ade80"/>
    </g>
    <text x="170" y="53" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#d4d4d8" text-anchor="middle">Agent 3</text>
    <text x="170" y="38" font-family="'JetBrains Mono', monospace" font-size="9" fill="#71717a" text-anchor="middle">GCP VM</text>
    <g filter="url(#nodeGlow)">
      <circle cx="120" cy="140" r="26" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <circle cx="120" cy="140" r="5" fill="#a1a1aa"/>
    </g>
    <text x="120" y="173" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#d4d4d8" text-anchor="middle">Agent 4</text>
    <text x="120" y="158" font-family="'JetBrains Mono', monospace" font-size="9" fill="#71717a" text-anchor="middle">RPi</text>
    <g filter="url(#nodeGlow)">
      <circle cx="-100" cy="120" r="26" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
      <circle cx="-100" cy="120" r="5" fill="#38bdf8"/>
    </g>
    <text x="-100" y="153" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#d4d4d8" text-anchor="middle">Agent 5</text>
    <text x="-100" y="138" font-family="'JetBrains Mono', monospace" font-size="9" fill="#71717a" text-anchor="middle">Docker</text>
  </g>

  <!-- URL -->
  <text x="60" y="580" font-family="'JetBrains Mono', monospace" font-size="20" fill="#71717a">agentcenter.cloud</text>
</svg>`;
}

/**
 * Generate a single OG image PNG.
 *
 * @param {object} opts
 * @param {string|null} opts.category  - Label pill text (e.g. "BLOG", "COMPARISON"). Null for none.
 * @param {string}      opts.title     - Main headline, will be auto-wrapped.
 * @param {string}      opts.subtitle  - Smaller text below title, will be auto-wrapped.
 * @param {string}      opts.outputPath - Absolute path to write the PNG.
 * @param {string}      [opts.accentColor="#0ea5e9"] - Hex accent colour.
 */
export async function generateOgImage({ category, title, subtitle, outputPath, accentColor = "#0ea5e9" }) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const svg = buildSvg({ category, title, subtitle, accentColor });

  const info = await sharp(Buffer.from(svg))
    .png({ quality: 95 })
    .toFile(outputPath);

  return info;
}

import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputPath = process.argv[2];
const outputPath = resolve(__dirname, "../public/images/logo.png");

if (!inputPath) {
  console.error("Usage: node remove-logo-background.mjs <input-image>");
  process.exit(1);
}

const image = sharp(readFileSync(inputPath));
const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

const threshold = 240;
for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  if (r >= threshold && g >= threshold && b >= threshold) {
    data[i + 3] = 0;
  }
}

await sharp(data, {
  raw: {
    width: info.width,
    height: info.height,
    channels: 4,
  },
})
  .png()
  .toFile(outputPath);

console.log(`Saved transparent logo to ${outputPath}`);

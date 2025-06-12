const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'public', 'lovable-uploads');
const outputDir = inputDir;

// Get all image files in the directory
const images = fs.readdirSync(inputDir).filter(file =>
  /\.(jpg|jpeg|png)$/i.test(file)
);

async function processImage(img) {
  const base = path.parse(img).name;
  const inputPath = path.join(inputDir, img);

  // 400w
  const out400 = path.join(outputDir, `${base}-400w.webp`);
  try {
    await sharp(inputPath).resize(400).toFile(out400);
    const stat = fs.statSync(out400);
    if (stat.size === 0) {
      console.error(`❌ 0-byte file for ${out400}`);
    } else {
      console.log(`✅ Created ${out400} (${stat.size} bytes)`);
    }
  } catch (err) {
    console.error(`Error processing ${img} (400w):`, err);
  }

  // 800w
  const out800 = path.join(outputDir, `${base}-800w.webp`);
  try {
    await sharp(inputPath).resize(800).toFile(out800);
    const stat = fs.statSync(out800);
    if (stat.size === 0) {
      console.error(`❌ 0-byte file for ${out800}`);
    } else {
      console.log(`✅ Created ${out800} (${stat.size} bytes)`);
    }
  } catch (err) {
    console.error(`Error processing ${img} (800w):`, err);
  }
}

(async () => {
  for (const img of images) {
    await processImage(img);
  }
  console.log('Image conversion complete. Check /public/lovable-uploads/ for new .webp files.');
})(); 
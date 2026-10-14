import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = '/Users/abhinavkumar/.gemini/antigravity-ide/brain/465c9e6b-8b40-4e57-818d-c7163303a3c9/screenshots';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const LOCAL_OUT_DIR = path.resolve('screenshots');
if (!fs.existsSync(LOCAL_OUT_DIR)) {
  fs.mkdirSync(LOCAL_OUT_DIR, { recursive: true });
}

async function run() {
  console.log('Launching headless Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();

  const widths = [
    { name: 'mobile-360', width: 360, height: 740 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'desktop-1440', width: 1440, height: 900 },
  ];

  const themes = ['dark', 'light'];

  // 1. Problem List Page
  for (const theme of themes) {
    for (const v of widths) {
      await page.setViewport({ width: v.width, height: v.height, deviceScaleFactor: 2 });
      await page.goto('http://localhost:5173/problems', { waitUntil: 'networkidle0' });
      await page.evaluate((th) => {
        document.documentElement.setAttribute('data-theme', th);
        localStorage.setItem('abhicode-theme', th);
      }, theme);
      await new Promise((r) => setTimeout(r, 400));

      const filename = `list_${theme}_${v.name}.png`;
      const outPath = path.join(OUT_DIR, filename);
      await page.screenshot({ path: outPath, fullPage: false });
      fs.copyFileSync(outPath, path.join(LOCAL_OUT_DIR, filename));
      console.log(`Saved screenshot: ${filename}`);
    }
  }

  // 2. Detail Page
  for (const theme of themes) {
    for (const v of widths) {
      await page.setViewport({ width: v.width, height: v.height, deviceScaleFactor: 2 });
      await page.goto('http://localhost:5173/problems/6a80ad57349b8eb983d61bdb', {
        waitUntil: 'networkidle0',
      });
      await page.evaluate((th) => {
        document.documentElement.setAttribute('data-theme', th);
        localStorage.setItem('abhicode-theme', th);
      }, theme);
      await new Promise((r) => setTimeout(r, 400));

      const filename = `detail_${theme}_${v.name}.png`;
      const outPath = path.join(OUT_DIR, filename);
      await page.screenshot({ path: outPath, fullPage: false });
      fs.copyFileSync(outPath, path.join(LOCAL_OUT_DIR, filename));
      console.log(`Saved screenshot: ${filename}`);
    }
  }

  // 3. New Problem Form Page
  for (const theme of themes) {
    for (const v of widths) {
      await page.setViewport({ width: v.width, height: v.height, deviceScaleFactor: 2 });
      await page.goto('http://localhost:5173/problems/new', {
        waitUntil: 'networkidle0',
      });
      await page.evaluate((th) => {
        document.documentElement.setAttribute('data-theme', th);
        localStorage.setItem('abhicode-theme', th);
      }, theme);
      await new Promise((r) => setTimeout(r, 400));

      const filename = `create_${theme}_${v.name}.png`;
      const outPath = path.join(OUT_DIR, filename);
      await page.screenshot({ path: outPath, fullPage: false });
      fs.copyFileSync(outPath, path.join(LOCAL_OUT_DIR, filename));
      console.log(`Saved screenshot: ${filename}`);
    }
  }

  await browser.close();
  console.log('All screenshots captured successfully.');
}

run().catch((err) => {
  console.error('Screenshot runner failed:', err);
  process.exit(1);
});

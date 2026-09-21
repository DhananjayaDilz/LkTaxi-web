import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const page = await browser.newPage();
  for (const [source, target, width] of [
    ['src/assets/airport-transfer.webp', 'src/assets/airport-transfer.webp', 1200],
    ['src/assets/long-tours.webp', 'src/assets/long-tours.webp', 1200],
    ['public/srilanaka_tour.png', 'public/srilanaka_tour.webp', 1600],
    ['public/srilanka_tour_mo.png', 'public/srilanka_tour_mo.webp', 900],
  ]) {
    const input = await readFile(source);
    const mime = source.endsWith('.png') ? 'image/png' : 'image/webp';
    const encoded = await page.evaluate(async ({ data, width }) => {
      const img = new Image(); img.src = data; await img.decode();
      const canvas = document.createElement('canvas');
      canvas.width = Math.min(img.width, width); canvas.height = Math.round(img.height * canvas.width / img.width);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/webp', 0.82).split(',')[1];
    }, { data: `data:${mime};base64,${input.toString('base64')}`, width });
    const output = Buffer.from(encoded, 'base64');
    await writeFile(target, output);
    console.log(`${target}: ${input.length} -> ${output.length} bytes`);
  }
} finally { await browser.close(); }

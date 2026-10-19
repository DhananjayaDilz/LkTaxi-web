import { readFile } from 'node:fs/promises';

const HOST = 'www.lktaxi.com';
const KEY = '87ed4e8947b330cfa68e66c17385abea';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow'
];

async function getUrls() {
  // Check if specific URLs were passed as CLI arguments
  const args = process.argv.slice(2).filter(arg => !arg.startsWith('--'));
  if (args.length > 0) {
    return args.map(url => (url.startsWith('http') ? url : `https://${HOST}${url.startsWith('/') ? '' : '/'}${url}`));
  }

  // Otherwise, load URLs from sitemap.xml
  try {
    const sitemapContent = await readFile('public/sitemap.xml', 'utf8');
    const matches = [...sitemapContent.matchAll(/<loc>(https:\/\/www\.lktaxi\.com[^<]*)<\/loc>/g)];
    const urls = matches.map(m => m[1].trim());
    if (urls.length > 0) return urls;
  } catch (err) {
    console.warn('Could not read public/sitemap.xml:', err.message);
  }

  // Fallback default core URLs
  return [
    `https://${HOST}/`,
    `https://${HOST}/routes`,
    `https://${HOST}/blogs`,
    `https://${HOST}/airport-transfer`,
    `https://${HOST}/yala-safari`,
    `https://${HOST}/private-driver-sri-lanka`,
    `https://${HOST}/sri-lanka-tour-packages`
  ];
}

async function submitIndexNow() {
  const isDryRun = process.argv.includes('--dry-run');
  const urls = await getUrls();

  console.log('='.repeat(60));
  console.log('IndexNow Submission — LKTaxi SEO');
  console.log('='.repeat(60));
  console.log(`Host:        ${HOST}`);
  console.log(`Key:         ${KEY}`);
  console.log(`Key Location:${KEY_LOCATION}`);
  console.log(`Total URLs:  ${urls.length}`);
  console.log('='.repeat(60));

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  if (isDryRun) {
    console.log('[DRY-RUN] Payload prepared successfully:');
    console.log(JSON.stringify({ ...payload, urlList: urls.slice(0, 5).concat(`...and ${urls.length - 5} more`) }, null, 2));
    console.log('\nDry run complete. No network request sent.');
    return;
  }

  console.log(`Submitting ${urls.length} URLs to IndexNow...`);

  let submitted = false;
  for (const endpoint of ENDPOINTS) {
    try {
      console.log(`\nSending request to: ${endpoint}`);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      console.log(`Status: ${res.status} ${res.statusText}`);
      if (res.status === 200 || res.status === 202) {
        console.log(`✓ Successfully accepted by ${endpoint} (HTTP ${res.status})`);
        submitted = true;
        break;
      } else {
        const text = await res.text();
        console.warn(`! Response: ${text || '(empty body)'}`);
      }
    } catch (err) {
      console.error(`Error connecting to ${endpoint}:`, err.message);
    }
  }

  if (submitted) {
    console.log('\n✓ IndexNow submission completed successfully!');
    console.log('Search engines (Bing, Yandex, Seznam, Naver) will process submitted URLs.');
  } else {
    console.log('\nNote: If verification failed with HTTP 403/422, ensure the key file is deployed live at:');
    console.log(`  ${KEY_LOCATION}`);
    console.log('Once your latest changes are deployed to production, re-run: npm run submit:indexnow');
  }
}

submitIndexNow();

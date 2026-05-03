const https = require('https');

https.get('https://soundrichhearing.com/services/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const urls = new Set();
    while ((match = imgRegex.exec(data)) !== null) {
      if (match[1].includes('wp-content/uploads')) {
        urls.add(match[1]);
      }
    }
    console.log(Array.from(urls).join('\n'));
  });
}).on('error', (e) => {
  console.error(e);
});

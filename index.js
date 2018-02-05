#!/usr/bin/env node
var package = require(require('path').resolve('./package.json'));
var collective = package.collective;
if (!collective) process.exit(0);
if (collective.logo) {
  require(/^https:/.test(collective.logo) ? 'https' : 'http')
    .get(collective.logo, function (response) {
      if (response.statusCode === 200) {
        response.setEncoding('utf8');
        var data = [];
        response.on('data', function (chunk) { data.push(chunk); });
        response.on('end', function () { showLogo(data.join('')) });
      }
      else showLogo(null);
    })
    .on('error', showLogo);
}
else showLogo(null);
function showLogo(data) {
  var logo = typeof data === 'string' ? data : '';
  var stars = '\x1B[1m***\x1B[0m';
  console.log('');
  if (logo) {
    console.log(logo);
    console.log('');
  }
  process.exit(0);
}

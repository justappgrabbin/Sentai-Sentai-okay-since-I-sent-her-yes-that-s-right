import { readFileSync } from 'node:fs';
const pkg=JSON.parse(readFileSync('package.json','utf8'));
const spectrum=JSON.parse(readFileSync('data/canonical/384-spectrum.json','utf8'));
if(pkg.name!=='synthia-morph-os-v2') throw new Error('wrong package');
if(spectrum.nodes.length!==384) throw new Error('384 spectrum missing');
console.log('smoke ok: package + 384 spectrum present');

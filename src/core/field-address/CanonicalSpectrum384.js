import spectrum from '../../../data/canonical/384-spectrum.json?raw';

const parsed = JSON.parse(spectrum);
export const CANONICAL_384 = parsed.nodes;
export const CANONICAL_384_COUNT = parsed.count;

export function nodeForIndex(index) {
  return CANONICAL_384.find(n => n.primaryIndex === index) || null;
}

export function nodeForHexLine(hexagram, line) {
  return CANONICAL_384.find(n => n.hexagram === Number(hexagram) && n.line === Number(line)) || null;
}

export function deterministicNodeForText(text='') {
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  const index = (hash % 384) + 1;
  return nodeForIndex(index);
}

export function virtualAddressCapacity() {
  return {
    minimumGlobalAddressSpace: '22T+',
    userMaterializedNodes: 384,
    reason: 'A person-local UI should materialize the 384 primary spectrum positions and activate deeper virtual addresses only as needed.'
  };
}

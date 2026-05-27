import { deterministicNodeForText } from '../field-address/CanonicalSpectrum384.js';
import { createFieldAddress } from '../field-address/FieldAddress.js';

export async function ingestFile(file, notes='') {
  const kind = detectKind(file);
  let text = '';
  if (kind.startsWith('text') || /json|javascript|typescript|html|css|markdown|csv/.test(file.type || file.name)) {
    text = await file.text();
  }
  const base = `${file.name}\n${file.type}\n${file.size}\n${text.slice(0,5000)}\n${notes}`;
  const node = deterministicNodeForText(base);
  const extracted = extractFieldSignals({name:file.name, type:file.type, kind, text, notes});
  const address = createFieldAddress({
    object: file.name,
    field: kind,
    node: node.id,
    hexagram: node.hexagram,
    line: node.line,
    colorBand: extracted.colorBand || node.colorBand,
    shapeBody: extracted.shapeBody || node.shapeBody,
    encodings: extracted.encodings,
    operators: extracted.operators,
    relations: extracted.relations,
    maturity: 'observed',
    notes
  });
  return {
    id: crypto.randomUUID(), name:file.name, size:file.size, type:file.type || 'unknown', kind,
    textPreview: text.slice(0,2000), extracted, address,
    maturity:'observed', createdAt:new Date().toISOString()
  };
}

export function ingestConversation(text) {
  const node = deterministicNodeForText(text);
  const extracted = extractFieldSignals({name:'conversation', type:'text/plain', kind:'conversation', text, notes:''});
  const address = createFieldAddress({object:'conversation', field:'conversation', node:node.id, hexagram:node.hexagram, line:node.line, colorBand:extracted.colorBand||node.colorBand, shapeBody:extracted.shapeBody||node.shapeBody, encodings:extracted.encodings, operators:extracted.operators, relations:extracted.relations, maturity:'observed', notes:text.slice(0,300)});
  return { id:crypto.randomUUID(), name:'conversation', kind:'conversation', textPreview:text.slice(0,2000), extracted, address, maturity:'observed', createdAt:new Date().toISOString() };
}

export function detectKind(file) {
  const name = file.name.toLowerCase();
  if (file.type?.startsWith('image/')) return 'image-field';
  if (file.type?.startsWith('audio/')) return 'audio-field';
  if (file.type?.startsWith('video/')) return 'video-field';
  if (name.endsWith('.zip')) return 'project-capsule';
  if (name.endsWith('.json')) return 'json-field';
  if (name.endsWith('.html')) return 'html-field';
  if (/\.(js|jsx|ts|tsx)$/.test(name)) return 'code-field';
  if (/\.(md|txt|csv)$/.test(name)) return 'text-field';
  if (name.endsWith('.pdf')) return 'document-field';
  return file.type || 'unknown-field';
}

export function extractFieldSignals({name='', type='', kind='', text='', notes=''}) {
  const source = `${name}\n${type}\n${kind}\n${text}\n${notes}`;
  const lower = source.toLowerCase();
  const operators = [];
  if (/deploy|publish|vercel|netlify|render|github/.test(lower)) operators.push('deploy');
  if (/build|create|generate|scaffold|make/.test(lower)) operators.push('generate');
  if (/encrypt|decrypt|cipher|rsa|decode|encode/.test(lower)) operators.push('encode-decode');
  if (/compare|same|equivalent|related|association|mapping/.test(lower)) operators.push('compare-equivalence');
  if (/test|repeat|validate|verify|canonical|canon/.test(lower)) operators.push('test-repeat-canonize');
  if (/route|send|message|mcp|deliver|handoff/.test(lower)) operators.push('route-deliver');
  const colorHits = [...source.matchAll(/\b(red|orange|yellow|gold|green|blue|indigo|violet|purple|black|white|gray|grey|teal|cyan|pink|crimson)\b/gi)].map(m=>m[1].toLowerCase());
  const shapeHits = [...source.matchAll(/\b(circle|triangle|square|diamond|hexagon|spiral|wave|line|grid|box|node|graph)\b/gi)].map(m=>m[1].toLowerCase());
  const numbers = [...source.matchAll(/\b\d+\b/g)].slice(0,40).map(m=>Number(m[0]));
  let encodings = { numbers };
  if (/^[\s\S]*[A-Za-z][\s\S]*$/.test(source)) encodings.alphabetic = true;
  if (/[01]{4,}/.test(source)) encodings.binaryLike = true;
  if (/\.-|-\.|\.\.|-/.test(source) && /morse|code/i.test(source)) encodings.morseLike = true;
  return {
    units: estimateUnits(source),
    encodings,
    operators: [...new Set(operators)],
    colorBand: colorHits[0] || null,
    colorHits: [...new Set(colorHits)],
    shapeBody: shapeHits[0] || null,
    shapeHits: [...new Set(shapeHits)],
    relations: inferRelations(lower),
    summary: summarize(kind, operators, colorHits, shapeHits, numbers)
  };
}

function estimateUnits(s){ return { chars:s.length, words:(s.trim().match(/\S+/g)||[]).length, lines:s.split(/\r?\n/).length }; }
function inferRelations(lower){ const r=[]; if(lower.includes('same')||lower.includes('equivalent')) r.push('equivalence'); if(lower.includes('inverse')||lower.includes('decode')) r.push('inverse'); if(lower.includes('parent')||lower.includes('child')) r.push('lineage'); if(lower.includes('color')||lower.includes('shape')) r.push('visual-address'); return r; }
function summarize(kind, ops, colors, shapes, nums){ return `${kind} with ${ops.length || 0} operator hints, ${colors.length || 0} color marks, ${shapes.length || 0} shape marks, ${nums.length || 0} number marks.`; }

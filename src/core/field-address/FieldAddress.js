export const ADDRESS_MATURITY = ['raw','observed','hypothesized','tested','repeated','canonical-ready','canonical'];

export function createFieldAddress(input = {}) {
  return {
    id: input.id || crypto.randomUUID(),
    object: input.object || 'unknown-object',
    field: input.field || 'unknown-field',
    node: input.node ?? null,
    hexagram: input.hexagram ?? null,
    line: input.line ?? null,
    colorBand: input.colorBand || null,
    shapeBody: input.shapeBody || null,
    position: input.position || {},
    encodings: input.encodings || {},
    operators: input.operators || [],
    relations: input.relations || [],
    spectrum: input.spectrum || {},
    maturity: input.maturity || 'raw',
    notes: input.notes || '',
    createdAt: new Date().toISOString()
  };
}

export function summarizeAddress(address) {
  const node = address.hexagram ? `H${String(address.hexagram).padStart(2,'0')}.L${address.line || '?'}` : address.node || 'unplaced';
  const faces = Object.keys(address.encodings || {}).concat(address.colorBand?['color']:[], address.shapeBody?['shape']:[]);
  return `${address.field}:${node} faces=${faces.join(',') || 'none'} maturity=${address.maturity}`;
}

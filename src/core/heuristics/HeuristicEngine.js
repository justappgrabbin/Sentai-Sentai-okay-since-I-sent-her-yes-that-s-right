export function scoreEquivalence(a, b) {
  const shared = [];
  if (a?.colorBand && a.colorBand === b?.colorBand) shared.push('colorBand');
  if (a?.shapeBody && a.shapeBody === b?.shapeBody) shared.push('shapeBody');
  if (a?.hexagram && a.hexagram === b?.hexagram) shared.push('hexagram');
  if (a?.line && a.line === b?.line) shared.push('line');
  const opsA = new Set(a?.operators || []); const opsB = new Set(b?.operators || []);
  for (const op of opsA) if (opsB.has(op)) shared.push(`operator:${op}`);
  const score = Math.min(1, shared.length / 5);
  return { score, shared, passed: score >= 0.4, rule:'field-equivalence-v0' };
}
export function repeatabilityStatus(testHistory=[]) {
  const passes = testHistory.filter(t=>t.passed).length;
  return passes >= 5 ? 'canonical-ready' : passes >= 3 ? 'repeated' : passes >= 1 ? 'tested' : 'hypothesized';
}

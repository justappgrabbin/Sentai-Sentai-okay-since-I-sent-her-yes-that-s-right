export function createRelation({source, target, type='resonance', operator='translate', evidence=[], maturity='hypothesized'}) {
  return {
    id: crypto.randomUUID(), source, target, type, operator, evidence, maturity,
    testHistory: [], createdAt: new Date().toISOString()
  };
}

export function recordRelationTest(relation, result) {
  const next = {...relation, testHistory: [...(relation.testHistory||[]), {...result, at: new Date().toISOString()}]};
  const passCount = next.testHistory.filter(t => t.passed).length;
  if (passCount >= 3) next.maturity = 'repeated';
  if (passCount >= 5) next.maturity = 'canonical-ready';
  return next;
}

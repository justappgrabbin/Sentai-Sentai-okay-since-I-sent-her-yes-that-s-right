export function canPromoteToCanon(candidate) {
  const tests = candidate.testHistory || [];
  const passes = tests.filter(t => t.passed).length;
  return { ok: passes >= 5 && candidate.maturity === 'canonical-ready', passes, required:5, reason: passes >= 5 ? 'repeatability threshold met' : 'needs repeated successful tests' };
}
export class Neo4jCanonAdapterStub {
  async promote(nodeOrRelation) { return { ok:false, reason:'Neo4j adapter stub only. Supabase/local remains working memory until canon graph is configured.', nodeOrRelation }; }
}

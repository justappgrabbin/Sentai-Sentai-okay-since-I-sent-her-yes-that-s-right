export function createMCPPacket({event, actor='system', project='Morph OS', currentGoal='', whatChanged='', whyItMatters='', affectedPeople=[], affectedSystems=[], requiredNextActions=[], canonicalContext=[], deliveryTargets=[], urgency='normal'}) {
  return { id:crypto.randomUUID(), event, actor, project, currentGoal, whatChanged, whyItMatters, affectedPeople, affectedSystems, requiredNextActions, canonicalContext, deliveryTargets, urgency, createdAt:new Date().toISOString() };
}
export function packetForProblem(problemFrame, target='self') {
  return createMCPPacket({
    event:'problem.frame.created', actor:'orchestrator', currentGoal:problemFrame.goal,
    whatChanged:problemFrame.perceivedProblem, whyItMatters:`stakes=${problemFrame.stakes}`,
    requiredNextActions:problemFrame.nextActions || [], canonicalContext:['recursive field-address graph','message-passing morphing','Supabase staging → Neo4j canon'], deliveryTargets:[{type:target}], urgency:problemFrame.stakes === 'high' ? 'high' : 'normal'
  });
}

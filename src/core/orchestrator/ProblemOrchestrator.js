export function frameProblem(input, context={}) {
  const text = String(input || '').trim();
  const lower = text.toLowerCase();
  const goal = detectGoal(lower);
  const stakes = /urgent|now|asap|deploy|production|client|money|legal|medical/.test(lower) ? 'high' : /should|need|important/.test(lower) ? 'medium' : 'low';
  const unknowns = [];
  if (/deploy|publish/.test(lower) && !/github|vercel|netlify|render/.test(lower)) unknowns.push('deployment target');
  if (/build|make|create/.test(lower) && text.length < 60) unknowns.push('desired output details');
  const candidateStrategies = generateStrategies(goal, lower);
  return { id:crypto.randomUUID(), rawConversation:text, perceivedProblem: text.slice(0,300), goal, constraints: inferConstraints(lower), unknowns, stakes, candidateStrategies, nextActions: candidateStrategies[0]?.actions || [], createdAt:new Date().toISOString(), context };
}
function detectGoal(lower){ if(/deploy|publish/.test(lower)) return 'deploy or publish artifact'; if(/build|make|create|generate/.test(lower)) return 'create artifact'; if(/understand|explain|analyze|read/.test(lower)) return 'understand and explain'; if(/send|tell|notify|mcp|handoff/.test(lower)) return 'deliver context'; return 'solve stated problem'; }
function inferConstraints(lower){ const c=[]; if(lower.includes('no iframe')) c.push('iframes only allowed for browser viewport and sandbox preview'); if(lower.includes('message')) c.push('morph through message passing'); if(lower.includes('approval')) c.push('ask before irreversible external action'); return c; }
function generateStrategies(goal, lower){
  if(goal.includes('deploy')) return [{name:'prepare deployment with approval', actions:['inspect artifact','verify repo/status','generate deployment packet','request approval','execute adapter']}];
  if(goal.includes('deliver')) return [{name:'MCP continuity packet', actions:['summarize change','identify recipients','build packet','deliver/update log']}];
  return [{name:'field-address problem solving', actions:['ingest context','extract field units','assign address','hypothesize relations','test/repeat if possible','brief user']}];
}

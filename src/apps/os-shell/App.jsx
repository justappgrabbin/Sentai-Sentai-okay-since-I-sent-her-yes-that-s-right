import React, {useMemo, useState} from 'react';
import { TopNav } from './components/TopNav.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Movement } from './pages/Movement.jsx';
import { Memory } from './pages/Memory.jsx';
import { Relation } from './pages/Relation.jsx';
import { Field } from './pages/Field.jsx';
import { Action } from './pages/Action.jsx';
import { morphBus } from '../../core/morph-engine/MorphBus.js';
import { resolveBehavior } from '../../core/morph-engine/BehaviorResolver.js';
import { ingestFile, ingestConversation } from '../../core/ingestion/UniversalIngestor.js';
import { memoryStore } from '../../core/memory/LocalMemoryStore.js';
import { frameProblem } from '../../core/orchestrator/ProblemOrchestrator.js';
import { packetForProblem, createMCPPacket } from '../../core/mcp/MCPContinuityCourier.js';

export default function App(){
  const [page,setPage]=useState('Dashboard');
  const [tick,setTick]=useState(0);
  const profile = useMemo(()=>({userId:'architect', role:'admin', activePurpose:'Assemble recursive field-address Morph OS', dashboardLayout:[], preferredNodePages:['Movement','Memory','Relation','Field','Action']}),[]);
  const db = memoryStore.db;
  function refresh(){ setTick(t=>t+1); }
  function emit(type,payload){ const ev=morphBus.emit(type,payload); const behavior=resolveBehavior(ev); memoryStore.add('events',{...ev, behavior}); refresh(); return ev; }
  async function onFiles(files, notes){ for(const file of files){ const cap=await ingestFile(file, notes); memoryStore.add('artifacts', cap); emit('file.ingested',{artifactId:cap.id,name:cap.name,address:cap.address}); memoryStore.add('briefings',{text:`Ingested ${cap.name} as ${cap.address.node} with ${cap.address.colorBand}/${cap.address.shapeBody}.`, payload:cap}); } refresh(); }
  function onTextIngest(text){ if(!text.trim()) return; const cap=ingestConversation(text); memoryStore.add('artifacts',cap); emit('conversation.ingested',{artifactId:cap.id,address:cap.address}); const problem=frameProblem(text,{address:cap.address}); const task=memoryStore.add('orchestrator_tasks',{problem, status:'planned'}); const packet=packetForProblem(problem,'dashboard'); memoryStore.add('mcp_packets', packet); emit('mcp.packet.created',{packetId:packet.id, taskId:task.id}); memoryStore.add('briefings',{text:`Problem framed: ${problem.goal}. Next: ${(problem.nextActions||[])[0] || 'review context'}.`, payload:problem}); refresh(); }
  function onBrowserEvent(evt){ emit(evt.type, evt); if(evt.type.includes('capture')||evt.type.includes('visited')){ const packet=createMCPPacket({event:evt.type, actor:'smart-browser', currentGoal:profile.activePurpose, whatChanged:evt.url, whyItMatters:'Browser movement can become context for ingestion, deployment, or handoff.', affectedSystems:['Movement','MCP','Orchestrator'], requiredNextActions:['capture notes if relevant','ingest URL context if needed'], deliveryTargets:[{type:'dashboard'}]}); memoryStore.add('mcp_packets',packet); refresh(); } }
  function onPlanDeploy(text){ const problem=frameProblem(text); const task=memoryStore.add('orchestrator_tasks',{problem,status:'approval-required'}); const packet=packetForProblem(problem,'github-or-deploy-adapter'); memoryStore.add('mcp_packets',packet); emit('deploy.requested',{taskId:task.id, packetId:packet.id}); memoryStore.add('briefings',{text:'Deployment plan staged. Approval required before external action.',payload:{problem,packet}}); refresh(); }
  const props={profile, memory:db, events:db.events, briefings:db.briefings, artifacts:db.artifacts, packets:db.mcp_packets, relations:db.relations, tasks:db.orchestrator_tasks, onFiles, onBrowserEvent, onTextIngest, onPlanDeploy};
  return <div className="os"><TopNav page={page} setPage={setPage}/>{page==='Dashboard'&&<Dashboard {...props}/>} {page==='Movement'&&<Movement {...props}/>} {page==='Memory'&&<Memory {...props}/>} {page==='Relation'&&<Relation {...props}/>} {page==='Field'&&<Field {...props}/>} {page==='Action'&&<Action {...props}/>}<footer>Message-passing morph engine active. Architecture is not rewritten; nodes/relations/behaviors activate through events.</footer></div>
}

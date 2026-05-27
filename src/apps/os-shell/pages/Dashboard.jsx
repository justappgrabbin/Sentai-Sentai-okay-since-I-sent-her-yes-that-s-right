import React from 'react';
export function Dashboard({profile, memory, events, briefings}) {
  return <main className="page"><section className="hero"><div><h1>Your Morph OS Dashboard</h1><p>Personal field surface. After signup/login, the user lands here. Astrology / Trinity / field coordinates belong here because they condition the whole system experience.</p></div><div className="purpose">Active purpose<br/><b>{profile.activePurpose}</b></div></section>
  <div className="grid three">
    <Card title="Current Field">384 active user-local nodes. Global address space: 22T+ virtual addresses, activated only as needed.</Card>
    <Card title="Recent Motion">{events.slice(0,5).map(e=><p key={e.id}>{e.type}</p>)}</Card>
    <Card title="Briefing">{briefings[0]?.text || 'No briefing yet.'}</Card>
  </div>
  {profile.role==='admin' && <section className="admin-panel"><h2>Admin Panel</h2><div className="grid four"><Card title="Canon Queue">Promote only repeated, tested understanding.</Card><Card title="Memory Inspector">Artifacts: {memory.artifacts.length}<br/>Events: {memory.events.length}</Card><Card title="MCP Monitor">Packets: {memory.mcp_packets.length}</Card><Card title="Orchestrator">Tasks: {memory.orchestrator_tasks.length}</Card></div></section>}
  </main>
}
function Card({title,children}){return <div className="card"><h3>{title}</h3><div>{children}</div></div>}

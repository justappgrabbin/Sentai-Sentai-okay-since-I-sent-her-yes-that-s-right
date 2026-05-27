import React from 'react';
export function SandboxPreview({html=''}) {
  return <div className="sandbox-card"><div className="browser-note">Allowed iframe role: sandbox preview for unfruited capsules/components only.</div><iframe title="Sandbox Preview" className="sandbox-frame" srcDoc={html || '<p style="font-family:sans-serif;padding:1rem">No sandbox capsule selected.</p>'} sandbox="allow-scripts" /></div>
}

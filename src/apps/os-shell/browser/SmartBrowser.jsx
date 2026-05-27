import React, {useState} from 'react';
export function SmartBrowser({onBrowserEvent}) {
  const [url,setUrl]=useState('https://example.com');
  const [active,setActive]=useState('https://example.com');
  function go(){ const fixed = url.startsWith('http') ? url : `https://${url}`; setActive(fixed); onBrowserEvent?.({type:'browser.visited', url:fixed}); }
  return <div className="browser-card">
    <div className="browser-bar"><input value={url} onChange={e=>setUrl(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')go()}}/><button onClick={go}>Go / Observe</button><button onClick={()=>onBrowserEvent?.({type:'browser.context.capture', url:active})}>Capture Context</button></div>
    <div className="browser-note">Movement surface. This is one of the two allowed iframe roles: browser viewport. If a site blocks embedding, open externally and capture URL/notes.</div>
    <iframe className="browser-frame" src={active} title="Smart Browser Viewport" sandbox="allow-scripts allow-forms allow-same-origin allow-popups" />
  </div>
}

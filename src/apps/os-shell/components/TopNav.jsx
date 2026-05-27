import React from 'react';
const pages = ['Dashboard','Movement','Memory','Relation','Field','Action'];
export function TopNav({page,setPage}) { return <nav className="topnav"><div className="brand">Synthia Morph OS <span>v2</span></div>{pages.map(p=><button key={p} className={page===p?'active':''} onClick={()=>setPage(p)}>{p}</button>)}</nav> }

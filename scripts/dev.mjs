import { spawn } from 'node:child_process';
const cmds = [ ['node',['server/mcp-continuity-server.js']], ['npx',['vite','--host','0.0.0.0']] ];
for (const [cmd,args] of cmds) { const p=spawn(cmd,args,{stdio:'inherit',shell:process.platform==='win32'}); p.on('exit', code=>{ if(code) console.error(`${cmd} exited ${code}`); }); }

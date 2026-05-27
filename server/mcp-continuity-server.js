import http from 'node:http';
const PORT = process.env.MCP_PORT || 3030;
const packets=[];
function json(res, code, body){res.writeHead(code, {'content-type':'application/json','access-control-allow-origin':'*','access-control-allow-methods':'GET,POST,OPTIONS','access-control-allow-headers':'content-type'});res.end(JSON.stringify(body,null,2));}
const server=http.createServer(async (req,res)=>{
  if(req.method==='OPTIONS') return json(res,200,{ok:true});
  if(req.url==='/health') return json(res,200,{ok:true,service:'mcp-continuity-server',packets:packets.length});
  if(req.url==='/v1/packets' && req.method==='GET') return json(res,200,{packets});
  if(req.url==='/v1/packets' && req.method==='POST') { let body=''; for await (const chunk of req) body+=chunk; const packet={id:crypto.randomUUID(),...JSON.parse(body||'{}'),receivedAt:new Date().toISOString()}; packets.unshift(packet); return json(res,200,{ok:true,packet}); }
  return json(res,404,{error:'not found'});
});
server.listen(PORT,()=>console.log(`MCP continuity server on http://localhost:${PORT}`));

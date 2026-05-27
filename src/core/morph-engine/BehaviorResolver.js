export function resolveBehavior(message, graph = {}) {
  const type = message.type || '';
  if (type.startsWith('browser.')) return { page:'Movement', behavior:'observe-route-capture', reason:'browser motion event' };
  if (type.startsWith('file.') || type.startsWith('ingest.')) return { page:'Memory', behavior:'capture-address-store', reason:'artifact entered memory' };
  if (type.startsWith('mcp.')) return { page:'Relation', behavior:'deliver-context-sync', reason:'continuity packet' };
  if (type.startsWith('field.')) return { page:'Field', behavior:'activate-address-face', reason:'field mapping changed' };
  if (type.startsWith('action.') || type.startsWith('deploy.')) return { page:'Action', behavior:'plan-execute-approve', reason:'external action requested' };
  return { page:'Dashboard', behavior:'brief', reason:'general system event' };
}

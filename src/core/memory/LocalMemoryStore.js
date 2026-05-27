const KEY = 'synthia.morph.os.v2.memory';
function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } }
function save(db) { localStorage.setItem(KEY, JSON.stringify(db)); }
const seed = { artifacts:[], events:[], field_nodes:[], address_faces:[], relations:[], hypotheses:[], tests:[], mcp_packets:[], orchestrator_tasks:[], briefings:[], user_profiles:[] };
export class LocalMemoryStore {
  constructor() { this.db = { ...seed, ...load() }; }
  all(table) { return this.db[table] || []; }
  add(table, record) { const row = { id: record.id || crypto.randomUUID(), ...record, createdAt: record.createdAt || new Date().toISOString() }; this.db[table] = [row, ...(this.db[table] || [])]; save(this.db); return row; }
  update(table, id, patch) { this.db[table] = (this.db[table]||[]).map(r => r.id===id ? {...r,...patch,updatedAt:new Date().toISOString()} : r); save(this.db); return this.db[table].find(r=>r.id===id); }
  clear() { this.db = {...seed}; save(this.db); }
}
export const memoryStore = new LocalMemoryStore();

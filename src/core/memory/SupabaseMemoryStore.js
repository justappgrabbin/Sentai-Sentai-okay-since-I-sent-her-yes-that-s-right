export const SUPABASE_SCHEMA = `
create table if not exists artifacts (id uuid primary key, name text, kind text, raw jsonb, address jsonb, maturity text, created_at timestamptz default now());
create table if not exists events (id uuid primary key, type text, payload jsonb, created_at timestamptz default now());
create table if not exists field_nodes (id text primary key, body jsonb, maturity text, created_at timestamptz default now());
create table if not exists address_faces (id uuid primary key, artifact_id uuid, face_type text, value jsonb, created_at timestamptz default now());
create table if not exists relations (id uuid primary key, source text, target text, type text, operator text, maturity text, evidence jsonb, created_at timestamptz default now());
create table if not exists hypotheses (id uuid primary key, claim text, evidence jsonb, maturity text, created_at timestamptz default now());
create table if not exists tests (id uuid primary key, hypothesis_id uuid, passed boolean, score numeric, result jsonb, created_at timestamptz default now());
create table if not exists mcp_packets (id uuid primary key, packet jsonb, delivered_to jsonb, created_at timestamptz default now());
create table if not exists orchestrator_tasks (id uuid primary key, problem jsonb, plan jsonb, status text, created_at timestamptz default now());
create table if not exists briefings (id uuid primary key, text text, payload jsonb, created_at timestamptz default now());
`;

export class SupabaseMemoryStore {
  constructor(client) { this.client = client; }
  async add(table, record) { const { data, error } = await this.client.from(table).insert(record).select().single(); if (error) throw error; return data; }
  async all(table) { const { data, error } = await this.client.from(table).select('*').order('created_at',{ascending:false}); if (error) throw error; return data; }
}

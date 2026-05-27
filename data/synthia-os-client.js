// ============================================================================
// SYNTHIA OS MCP CLIENT
// Drop this into your Synthia OS to connect to the MCP bridge
// ============================================================================

class SynthiaMCPClient {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
    this.agentId = null;
    this.connected = false;
    this.onBriefing = null;
    this.onMessage = null;
    this.syncInterval = null;
  }

  async registerAgent(agentConfig) {
    const res = await fetch(`${this.baseUrl}/mcp/synthia_register_agent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agentConfig)
    });
    const data = await res.json();
    this.agentId = agentConfig.agentId;
    this.connected = true;
    this.startSyncLoop();
    return data;
  }

  async ingestIntent(intent, priority = 'normal') {
    const res = await fetch(`${this.baseUrl}/mcp/synthia_ingest_intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ intent, priority })
    });
    return res.json();
  }

  async queryField(query) {
    const res = await fetch(`${this.baseUrl}/mcp/synthia_query_field`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    return res.json();
  }

  async getBriefing() {
    if (!this.agentId) return null;
    const res = await fetch(`${this.baseUrl}/mcp/synthia_get_briefing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentId: this.agentId })
    });
    const data = await res.json();
    if (this.onBriefing) this.onBriefing(data);
    return data;
  }

  async sendMessage(to, type, content, featureId = null) {
    const res = await fetch(`${this.baseUrl}/mcp/synthia_send_message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: this.agentId,
        to,
        type,
        content,
        featureId
      })
    });
    return res.json();
  }

  async createFeature(feature) {
    const res = await fetch(`${this.baseUrl}/mcp/synthia_create_feature`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feature)
    });
    return res.json();
  }

  async reportCompletion(goalId, output) {
    const res = await fetch(`${this.baseUrl}/mcp/synthia_report_completion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        agentId: this.agentId,
        goalId,
        output
      })
    });
    return res.json();
  }

  async setSleepMode(enable) {
    const res = await fetch(`${this.baseUrl}/mcp/synthia_sleep_mode`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enable })
    });
    return res.json();
  }

  async getHubStatus() {
    const res = await fetch(`${this.baseUrl}/mcp/synthia_hub_status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    return res.json();
  }

  startSyncLoop(interval = 30000) {
    this.syncInterval = setInterval(async () => {
      if (!this.agentId) return;
      const res = await fetch(`${this.baseUrl}/mcp/synthia_sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId: this.agentId })
      });
      const data = await res.json();
      if (data.messages?.length > 0 && this.onMessage) {
        this.onMessage(data.messages);
      }
    }, interval);
  }

  disconnect() {
    if (this.syncInterval) clearInterval(this.syncInterval);
    this.connected = false;
  }
}

// Example usage in your Synthia OS:
/*
const mcp = new SynthiaMCPClient('http://localhost:3000');

// Register this OS instance as an agent
await mcp.registerAgent({
  agentId: 'synthia-os-mobile',
  name: 'Synthia Mobile OS',
  role: 'interface',
  capabilities: ['ui', 'file-ingestion', 'user-input'],
  activeGates: [1, 8, 33, 56],
  dominantCenter: 'Throat'
});

// When user asks for something
await mcp.ingestIntent('Build a new app for tracking astrology transits', 'high');

// The substrate wakes up relevant agents and they start collaborating
// You sleep, they work, you wake up to progress

mcp.onBriefing = (briefing) => {
  // Show the user what the field is thinking
  console.log(briefing);
};

mcp.onMessage = (messages) => {
  // New messages from other agents
  messages.forEach(m => notifyUser(m.from, m.content));
};
*/

export { SynthiaMCPClient };

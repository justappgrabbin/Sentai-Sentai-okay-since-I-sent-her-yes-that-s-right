export class MorphBus {
  constructor() { this.listeners = new Map(); this.log = []; }
  on(type, handler) {
    const set = this.listeners.get(type) || new Set(); set.add(handler); this.listeners.set(type,set);
    return () => set.delete(handler);
  }
  emit(type, payload = {}) {
    const event = { id: crypto.randomUUID(), type, payload, at: new Date().toISOString() };
    this.log.unshift(event); this.log = this.log.slice(0, 500);
    for (const handler of this.listeners.get(type) || []) handler(event);
    for (const handler of this.listeners.get('*') || []) handler(event);
    return event;
  }
}
export const morphBus = new MorphBus();

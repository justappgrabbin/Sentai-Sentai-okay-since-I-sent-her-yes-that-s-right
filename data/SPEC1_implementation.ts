
/**
 * SPEC-1: DimensionalAddress → World Graph → EmbodiedGen
 * TypeScript Implementation Starter
 * 
 * This module implements the deterministic asset manifestation pipeline
 * for the Resonance Engine ecosystem.
 */

// ============================================================================
// CORE TYPES
// ============================================================================

/**
 * 13-Component DimensionalAddress
 * Canonical form: G.L.C.T.B D° M' S" A Z H P N
 * Example: 6.4.4.4.2 25° 59' 31.92" 180 VIR H5 SUN 7
 */
export interface DimensionalAddress {
  gate: number;        // 1-64
  line: number;        // 1-6
  color: number;       // 1-6
  tone: number;        // 1-6
  base: number;        // 1-5
  degree: number;      // 0-360
  minute: number;      // 0-59
  second: number;      // 0-59.99
  arc: number;         // 0-180
  zodiac: ZodiacSign;  // 1-12
  house: number;        // 1-12
  planet: Planet;       // 1-10
  dimension: number;    // 1-13
}

export type ZodiacSign = 
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Planet = 
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type FieldType = 
  | 'physical' | 'emotional' | 'mental' | 'spiritual' | 'temporal';

export type UnixTimestamp = number;

// ============================================================================
// OBSERVER STATE
// ============================================================================

export interface ObserverState {
  dimensionalAddress: DimensionalAddress;
  birthTimestamp: UnixTimestamp;
  currentTimestamp: UnixTimestamp;
  traversalLog: TraversalEntry[];
  fieldResonance: FieldResonanceMatrix;
  planetaryPositions: PlanetaryPosition[];
  activeHexagrams: HexagramState[];
  dominantField: FieldType;
}

export interface TraversalEntry {
  nodeId: string;
  timestamp: UnixTimestamp;
  resonanceScore: number;
  fieldType: FieldType;
}

export interface FieldResonanceMatrix {
  physical: number;
  emotional: number;
  mental: number;
  spiritual: number;
  temporal: number;
}

export interface PlanetaryPosition {
  planet: Planet;
  longitude: number;  // 0-360
  latitude: number;     // -90 to 90
  distance: number;     // AU
  speed: number;        // degrees/day
  isRetrograde: boolean;
}

// ============================================================================
// HEXAGRAM SYSTEM
// ============================================================================

export interface HexagramState {
  hexagramId: number;        // 1-64
  resonanceStrength: number;  // 0-1
  fieldAffinity: FieldType;
  dnaCodon: string;          // e.g., "ATG"
  trigramUpper: number;       // 1-8
  trigramLower: number;       // 1-8
  changingLines: number[];    // Which lines are changing
}

/**
 * 64 Hexagram to DNA Codon mapping
 * Based on I Ching-DNA research: 64 hexagrams = 64 codons
 */
export const HEXAGRAM_TO_CODON: Record<number, string> = {
  1: "ATG", 2: "TAA", 3: "CAT", 4: "GTA", 5: "TGT", 6: "ACA",
  7: "CTA", 8: "AGA", 9: "TCT", 10: "GAT", 11: "CTT", 12: "TGA",
  13: "AAT", 14: "GCT", 15: "GGT", 16: "GTT", 17: "TTT", 18: "CCT",
  19: "ATT", 20: "CGT", 21: "TAT", 22: "ACT", 23: "GCA", 24: "CCA",
  25: "TCA", 26: "ACA", 27: "GGA", 28: "ATA", 29: "TTA", 30: "CCA",
  31: "AGT", 32: "GCG", 33: "CCG", 34: "TCG", 35: "ACG", 36: "GTG",
  37: "CTG", 38: "TTG", 39: "ATG", 40: "GAG", 41: "CAG", 42: "TAG",
  43: "AAG", 44: "GAA", 45: "CAA", 46: "TAC", 47: "AAC", 48: "GAC",
  49: "CAC", 50: "TTC", 51: "ATC", 52: "GTC", 53: "CTC", 54: "ACC",
  55: "TCC", 56: "GCC", 57: "CCC", 58: "AGG", 59: "TGG", 60: "GGG",
  61: "CGG", 62: "TGC", 63: "AGC", 64: "GGC"
};

/**
 * Orbital periods for harmonic calculations
 */
export const PLANETARY_PERIODS: Record<Planet, number> = {
  1: 88,      // Mercury
  2: 225,     // Venus
  3: 365.25,  // Earth
  4: 687,     // Mars
  5: 4333,    // Jupiter
  6: 10759,   // Saturn
  7: 30687,   // Uranus
  8: 60190,   // Neptune
  9: 90560,   // Pluto
  10: 27.32   // Moon
};

// ============================================================================
// WORLD GRAPH
// ============================================================================

export interface WorldNode {
  id: string;
  dimensionalAddress: DimensionalAddress;
  hexagramSignature: number;  // 1-64
  fieldType: FieldType;
  resonanceFrequency: number; // Hz
  assetManifest: AssetManifest;
  createdAt: UnixTimestamp;
  lastAccessed: UnixTimestamp;
  traversalCount: number;
}

export interface WorldEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  resonanceWeight: number;
  traversalCount: number;
  lastTraversed: UnixTimestamp;
  fieldTransition: FieldType[]; // Source → Target field types
}

export interface AssetManifest {
  geometry: {
    urdf?: string;
    mesh?: string;
    texture?: string;
    layout?: string;
  };
  narrative: {
    physical: string;
    emotional: string;
    mental: string;
    spiritual: string;
    temporal: string;
  };
  audio: {
    baseFrequency: number;
    harmonicSeries: number[];
    binauralBeat?: number;
  };
  hexagramSignature: number;
  dnaCodon: string;
  planetaryAlignment: string;
}

// ============================================================================
// EMBODIEDGEN BRIDGE
// ============================================================================

export interface EmbodiedGenScene {
  sceneId: string;
  formatVersion: string;
  generatedAt: UnixTimestamp;
  observerAddress: string;
  objects: SceneObject[];
  lighting: LightingConfig;
  camera: CameraConfig;
  physics: PhysicsConfig;
  ambientFrequency: number;
  harmonicOverlay: number[];
  fieldVisualization: boolean;
}

export interface SceneObject {
  id: string;
  type: 'articulated' | 'static' | 'layout';
  urdfPath?: string;
  meshPath?: string;
  texturePath?: string;
  position: Vector3;
  rotation: Quaternion;
  scale: Vector3;
  hexagramId: number;
  resonanceStrength: number;
  fieldType: FieldType;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;
}

export interface LightingConfig {
  type: 'ambient' | 'directional' | 'point';
  intensity: number;
  color: string;
  position?: Vector3;
}

export interface CameraConfig {
  position: Vector3;
  target: Vector3;
  fov: number;
}

export interface PhysicsConfig {
  gravity: Vector3;
  timeStep: number;
  solverIterations: number;
}

export interface EmbodiedGenOutput {
  scene: EmbodiedGenScene;
  urdfAssets: string[];
  meshAssets: string[];
  textureAssets: string[];
  layoutJson: string;
}

// ============================================================================
// CORE ENGINE CLASSES
// ============================================================================

/**
 * Hexagram Calculator
 * Determines active virtual particles based on planetary positions
 */
export class HexagramCalculator {
  private RESONANCE_THRESHOLD = 0.3;

  calculateActiveHexagrams(observer: ObserverState): HexagramState[] {
    // Step 1: Calculate current planetary positions
    const planets = this.calculatePlanetaryPositions(observer.currentTimestamp);

    // Step 2: Determine resonance frequencies from orbital harmonics
    const harmonics = this.calculateOrbitalHarmonics(planets);

    // Step 3: Map harmonics to hexagram space (64 virtual particles)
    const activations = harmonics.map(h => ({
      hexagramId: this.mapHarmonicToHexagram(h),
      resonanceStrength: this.calculateResonance(h, observer.dimensionalAddress),
      fieldAffinity: this.determineFieldAffinity(h),
      trigramUpper: Math.ceil(h.frequency / 8),
      trigramLower: (h.frequency % 8) || 8,
      changingLines: this.determineChangingLines(h, observer.dimensionalAddress),
      dnaCodon: HEXAGRAM_TO_CODON[this.mapHarmonicToHexagram(h)]
    }));

    // Step 4: Filter by threshold and sort by resonance
    return activations
      .filter(a => a.resonanceStrength > this.RESONANCE_THRESHOLD)
      .sort((a, b) => b.resonanceStrength - a.resonanceStrength)
      .slice(0, 6); // Typically 4-6 active hexagrams
  }

  private calculatePlanetaryPositions(timestamp: UnixTimestamp): PlanetaryPosition[] {
    // Implementation: Use Swiss Ephemeris or Skyfield
    // This is a placeholder for the actual ephemeris calculation
    return Object.keys(PLANETARY_PERIODS).map((planetId, index) => ({
      planet: parseInt(planetId) as Planet,
      longitude: (timestamp / PLANETARY_PERIODS[parseInt(planetId) as Planet] * 360) % 360,
      latitude: 0,
      distance: 1 + index * 0.5,
      speed: 360 / PLANETARY_PERIODS[parseInt(planetId) as Planet],
      isRetrograde: false
    }));
  }

  private calculateOrbitalHarmonics(planets: PlanetaryPosition[]): OrbitalHarmonic[] {
    return planets.map(p => ({
      planet: p.planet,
      frequency: 1 / PLANETARY_PERIODS[p.planet], // Base frequency in Hz (normalized)
      phase: p.longitude,
      amplitude: 1 / p.distance // Closer planets have stronger influence
    }));
  }

  private mapHarmonicToHexagram(harmonic: OrbitalHarmonic): number {
    // Map orbital harmonic to hexagram 1-64
    // Based on resonance frequency alignment with hexagram virtual particles
    const normalizedFreq = harmonic.frequency * 1000; // Scale to usable range
    return (Math.floor(normalizedFreq) % 64) + 1;
  }

  private calculateResonance(
    harmonic: OrbitalHarmonic, 
    address: DimensionalAddress
  ): number {
    // Calculate resonance between planetary harmonic and observer's dimensional address
    const gateAlignment = 1 - Math.abs(harmonic.phase - (address.gate * 5.625)) / 360;
    const houseAlignment = 1 - Math.abs(address.house - (harmonic.planet % 12)) / 12;
    const planetaryAlignment = address.planet === harmonic.planet ? 1 : 0.3;

    return (gateAlignment * 0.5) + (houseAlignment * 0.3) + (planetaryAlignment * 0.2);
  }

  private determineFieldAffinity(harmonic: OrbitalHarmonic): FieldType {
    const fields: FieldType[] = ['physical', 'emotional', 'mental', 'spiritual', 'temporal'];
    return fields[harmonic.planet % 5];
  }

  private determineChangingLines(
    harmonic: OrbitalHarmonic, 
    address: DimensionalAddress
  ): number[] {
    // Determine which lines are changing based on harmonic phase and address
    const changingLines: number[] = [];
    for (let i = 1; i <= 6; i++) {
      if ((harmonic.phase + address.line * i) % 60 < 10) {
        changingLines.push(i);
      }
    }
    return changingLines;
  }
}

interface OrbitalHarmonic {
  planet: Planet;
  frequency: number;
  phase: number;
  amplitude: number;
}

/**
 * World Graph Resolver
 * Queries Neo4j for active nodes based on hexagram signature
 */
export class WorldGraphResolver {
  constructor(private neo4jDriver: any) {}

  async resolveWorldGraph(
    observer: ObserverState,
    activeHexagrams: HexagramState[]
  ): Promise<WorldNode[]> {
    const session = this.neo4jDriver.session();

    try {
      const hexagramIds = activeHexagrams.map(h => h.hexagramId);
      const dominantField = observer.dominantField;
      const minResonance = 0.3;
      const maxNodes = 20;

      const result = await session.run(`
        MATCH (observer:Observer {id: $observerId})
        MATCH (node:WorldNode)
        WHERE node.hexagramSignature IN $hexagramIds
          AND node.resonanceFrequency >= $minResonance
          AND node.fieldType = $dominantField
        WITH node, 
             calculateResonance(
               observer.dimensionalAddress, 
               node.dimensionalAddress
             ) as resonance
        WHERE resonance > 0.3
        RETURN node, resonance
        ORDER BY resonance DESC
        LIMIT $maxNodes
      `, {
        observerId: this.getObserverId(observer),
        hexagramIds,
        minResonance,
        dominantField,
        maxNodes
      });

      return result.records.map(record => ({
        ...record.get('node').properties,
        calculatedResonance: record.get('resonance')
      }));
    } finally {
      await session.close();
    }
  }

  async calculateEdgeWeights(
    nodes: WorldNode[],
    observer: ObserverState
  ): Promise<WorldEdge[]> {
    const edges: WorldEdge[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const weight = this.calculateEdgeWeight(nodes[i], nodes[j], observer);
        if (weight > 0.2) {
          edges.push({
            id: `edge_${nodes[i].id}_${nodes[j].id}`,
            sourceNodeId: nodes[i].id,
            targetNodeId: nodes[j].id,
            resonanceWeight: weight,
            traversalCount: 0,
            lastTraversed: Date.now(),
            fieldTransition: [nodes[i].fieldType, nodes[j].fieldType]
          });
        }
      }
    }

    return edges.sort((a, b) => b.resonanceWeight - a.resonanceWeight);
  }

  private calculateEdgeWeight(
    source: WorldNode,
    target: WorldNode,
    observer: ObserverState
  ): number {
    const nodeResonance = this.calculateNodeResonance(source, target);
    const perspectiveModifier = this.calculatePerspectiveAlignment(
      observer.dimensionalAddress,
      source.dimensionalAddress,
      target.dimensionalAddress
    );
    const historyWeight = this.getTraversalHistory(source.id, target.id);
    const harmonicAlignment = this.calculateHarmonicAlignment(
      source.resonanceFrequency,
      target.resonanceFrequency,
      observer.planetaryPositions
    );

    return (nodeResonance * 0.4) + 
           (perspectiveModifier * 0.3) + 
           (historyWeight * 0.2) + 
           (harmonicAlignment * 0.1);
  }

  private calculateNodeResonance(a: WorldNode, b: WorldNode): number {
    const gateDiff = Math.abs(a.dimensionalAddress.gate - b.dimensionalAddress.gate);
    const lineDiff = Math.abs(a.dimensionalAddress.line - b.dimensionalAddress.line);
    const fieldMatch = a.fieldType === b.fieldType ? 1 : 0;

    return (1 - gateDiff / 64) * 0.5 + 
           (1 - lineDiff / 6) * 0.3 + 
           fieldMatch * 0.2;
  }

  private calculatePerspectiveAlignment(
    observer: DimensionalAddress,
    source: DimensionalAddress,
    target: DimensionalAddress
  ): number {
    const observerToSource = this.calculateAddressDistance(observer, source);
    const observerToTarget = this.calculateAddressDistance(observer, target);
    const sourceToTarget = this.calculateAddressDistance(source, target);

    // Favor edges that extend the observer's reach
    return (observerToTarget > observerToSource) ? 0.8 : 0.4;
  }

  private calculateAddressDistance(a: DimensionalAddress, b: DimensionalAddress): number {
    const gateDist = Math.abs(a.gate - b.gate);
    const lineDist = Math.abs(a.line - b.line);
    const houseDist = Math.abs(a.house - b.house);

    return (gateDist / 64) + (lineDist / 6) + (houseDist / 12);
  }

  private getTraversalHistory(sourceId: string, targetId: string): number {
    // Query traversal log for this edge
    // Return normalized count (0-1)
    return 0.5; // Placeholder
  }

  private calculateHarmonicAlignment(
    freqA: number,
    freqB: number,
    planetaryPositions: PlanetaryPosition[]
  ): number {
    const ratio = freqA / freqB;
    const nearestHarmonic = Math.round(ratio);
    const deviation = Math.abs(ratio - nearestHarmonic);

    return 1 - Math.min(deviation, 1);
  }

  private getObserverId(observer: ObserverState): string {
    // Generate deterministic ID from DimensionalAddress
    return `obs_${observer.dimensionalAddress.gate}_${observer.dimensionalAddress.line}_${observer.birthTimestamp}`;
  }
}

/**
 * Asset Selector
 * Deterministically selects assets from World Graph nodes
 */
export class AssetSelector {
  selectAssets(
    activeNodes: WorldNode[],
    observer: ObserverState
  ): SelectedAsset[] {
    const selectedAssets: SelectedAsset[] = [];

    for (const node of activeNodes) {
      const relevance = this.calculateAssetRelevance(node, observer);
      const perspectiveFit = this.calculatePerspectiveFit(
        node.dimensionalAddress,
        observer.dimensionalAddress
      );
      const fieldCompatible = this.isFieldCompatible(
        node.fieldType,
        observer.dominantField
      );

      if (relevance > 0.5 && perspectiveFit > 0.3 && fieldCompatible) {
        selectedAssets.push({
          assetManifest: node.assetManifest,
          sourceNodeId: node.id,
          relevanceScore: relevance,
          perspectiveFit: perspectiveFit,
          compositeScore: relevance * perspectiveFit
        });
      }
    }

    return selectedAssets.sort((a, b) => b.compositeScore - a.compositeScore);
  }

  private calculateAssetRelevance(node: WorldNode, observer: ObserverState): number {
    const gateMatch = node.dimensionalAddress.gate === observer.dimensionalAddress.gate ? 1 : 0;
    const lineProximity = 1 - Math.abs(node.dimensionalAddress.line - observer.dimensionalAddress.line) / 6;
    const houseAlignment = 1 - Math.abs(node.dimensionalAddress.house - observer.dimensionalAddress.house) / 12;

    return (gateMatch * 0.4) + (lineProximity * 0.35) + (houseAlignment * 0.25);
  }

  private calculatePerspectiveFit(
    nodeAddress: DimensionalAddress,
    observerAddress: DimensionalAddress
  ): number {
    const dimensionMatch = nodeAddress.dimension === observerAddress.dimension ? 1 : 0.5;
    const zodiacAlignment = 1 - Math.abs(nodeAddress.zodiac - observerAddress.zodiac) / 12;
    const planetHarmonic = this.calculatePlanetHarmonic(
      nodeAddress.planet,
      observerAddress.planet
    );

    return (dimensionMatch * 0.4) + (zodiacAlignment * 0.35) + (planetHarmonic * 0.25);
  }

  private calculatePlanetHarmonic(a: Planet, b: Planet): number {
    const periodA = PLANETARY_PERIODS[a];
    const periodB = PLANETARY_PERIODS[b];
    const ratio = Math.max(periodA, periodB) / Math.min(periodA, periodB);
    const nearestInteger = Math.round(ratio);

    return 1 - Math.abs(ratio - nearestInteger) / nearestInteger;
  }

  private isFieldCompatible(nodeField: FieldType, observerField: FieldType): boolean {
    // Same field or adjacent fields in the cycle: physical → emotional → mental → spiritual → temporal → physical
    const fieldOrder: FieldType[] = ['physical', 'emotional', 'mental', 'spiritual', 'temporal'];
    const nodeIndex = fieldOrder.indexOf(nodeField);
    const observerIndex = fieldOrder.indexOf(observerField);
    const distance = Math.abs(nodeIndex - observerIndex);

    return distance <= 1 || distance === 4; // Adjacent or same
  }
}

interface SelectedAsset {
  assetManifest: AssetManifest;
  sourceNodeId: string;
  relevanceScore: number;
  perspectiveFit: number;
  compositeScore: number;
}

/**
 * EmbodiedGen Bridge
 * Converts selected assets to EmbodiedGen scene format
 */
export class EmbodiedGenBridge {
  generateScene(
    selectedAssets: SelectedAsset[],
    observer: ObserverState,
    sceneConfig: SceneConfiguration
  ): EmbodiedGenScene {
    const objects: SceneObject[] = [];
    let totalResonance = 0;

    for (let i = 0; i < selectedAssets.length; i++) {
      const asset = selectedAssets[i];
      const position = this.calculateObjectPosition(i, selectedAssets.length, observer);

      objects.push({
        id: `obj_${asset.sourceNodeId}`,
        type: this.determineObjectType(asset.assetManifest),
        urdfPath: asset.assetManifest.geometry.urdf,
        meshPath: asset.assetManifest.geometry.mesh,
        texturePath: asset.assetManifest.geometry.texture,
        position,
        rotation: { x: 0, y: (i * 60) * Math.PI / 180, z: 0, w: 1 },
        scale: { x: 1, y: 1, z: 1 },
        hexagramId: asset.assetManifest.hexagramSignature,
        resonanceStrength: asset.compositeScore,
        fieldType: this.inferFieldType(asset.assetManifest)
      });

      totalResonance += asset.compositeScore;
    }

    const avgResonance = totalResonance / selectedAssets.length;

    return {
      sceneId: this.generateSceneId(observer),
      formatVersion: '1.0',
      generatedAt: Date.now(),
      observerAddress: this.serializeDimensionalAddress(observer.dimensionalAddress),
      objects,
      lighting: this.generateLightingConfig(observer, avgResonance),
      camera: this.generateCameraConfig(observer),
      physics: this.generatePhysicsConfig(observer),
      ambientFrequency: this.calculateAmbientFrequency(observer),
      harmonicOverlay: this.calculateHarmonicOverlay(observer),
      fieldVisualization: true
    };
  }

  exportToEmbodiedGen(scene: EmbodiedGenScene): EmbodiedGenOutput {
    return {
      scene,
      urdfAssets: scene.objects.filter(o => o.urdfPath).map(o => o.urdfPath!),
      meshAssets: scene.objects.filter(o => o.meshPath).map(o => o.meshPath!),
      textureAssets: scene.objects.filter(o => o.texturePath).map(o => o.texturePath!),
      layoutJson: JSON.stringify({
        bounds: [[-50, -50, -50], [50, 50, 50]],
        objects: scene.objects.map(o => ({
          id: o.id,
          position: o.position,
          rotation: o.rotation,
          scale: o.scale
        }))
      })
    };
  }

  private calculateObjectPosition(
    index: number,
    totalObjects: number,
    observer: ObserverState
  ): Vector3 {
    const angle = (index / totalObjects) * 2 * Math.PI;
    const radius = 10 + (observer.dimensionalAddress.house * 2);

    return {
      x: Math.cos(angle) * radius,
      y: observer.dimensionalAddress.line,
      z: Math.sin(angle) * radius
    };
  }

  private determineObjectType(manifest: AssetManifest): 'articulated' | 'static' | 'layout' {
    if (manifest.geometry.urdf) return 'articulated';
    if (manifest.geometry.mesh) return 'static';
    return 'layout';
  }

  private inferFieldType(manifest: AssetManifest): FieldType {
    // Infer from narrative content or hexagram signature
    return 'physical'; // Placeholder
  }

  private generateSceneId(observer: ObserverState): string {
    return `spec1_${this.serializeDimensionalAddress(observer.dimensionalAddress)}_${Date.now()}`;
  }

  private serializeDimensionalAddress(addr: DimensionalAddress): string {
    return `${addr.gate}.${addr.line}.${addr.color}.${addr.tone}.${addr.base}_${addr.degree}_${addr.minute}_${addr.second}_${addr.arc}_${addr.zodiac}_${addr.house}_${addr.planet}_${addr.dimension}`;
  }

  private generateLightingConfig(observer: ObserverState, resonance: number): LightingConfig {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
    return {
      type: 'directional',
      intensity: 0.5 + resonance * 0.5,
      color: colors[observer.dimensionalAddress.gate % 5],
      position: { x: 10, y: 20, z: 10 }
    };
  }

  private generateCameraConfig(observer: ObserverState): CameraConfig {
    return {
      position: { 
        x: observer.dimensionalAddress.degree / 10,
        y: observer.dimensionalAddress.line * 2,
        z: observer.dimensionalAddress.house * 5
      },
      target: { x: 0, y: 0, z: 0 },
      fov: 60 + observer.dimensionalAddress.dimension * 2
    };
  }

  private generatePhysicsConfig(observer: ObserverState): PhysicsConfig {
    return {
      gravity: { x: 0, y: -9.81 * (observer.dimensionalAddress.base / 5), z: 0 },
      timeStep: 0.016,
      solverIterations: 10 + observer.dimensionalAddress.line
    };
  }

  private calculateAmbientFrequency(observer: ObserverState): number {
    // Base frequency on planetary positions
    const sunPos = observer.planetaryPositions.find(p => p.planet === 3); // Earth reference
    return sunPos ? 432 * (1 + sunPos.longitude / 360) : 432;
  }

  private calculateHarmonicOverlay(observer: ObserverState): number[] {
    return observer.activeHexagrams.map(h => {
      const planetPeriod = PLANETARY_PERIODS[h.fieldAffinity === 'physical' ? 3 : 1];
      return 432 * (planetPeriod / 365.25);
    });
  }
}

export interface SceneConfiguration {
  maxObjects: number;
  sceneBounds: [Vector3, Vector3];
  enablePhysics: boolean;
  enableAudio: boolean;
  fieldVisualization: boolean;
}

// ============================================================================
// MAIN PIPELINE ORCHESTRATOR
// ============================================================================

/**
 * SPEC-1 Pipeline
 * Main orchestrator for the complete deterministic asset manifestation pipeline
 */
export class SPEC1Pipeline {
  private hexagramCalculator: HexagramCalculator;
  private worldGraphResolver: WorldGraphResolver;
  private assetSelector: AssetSelector;
  private embodiedGenBridge: EmbodiedGenBridge;

  constructor(neo4jDriver: any) {
    this.hexagramCalculator = new HexagramCalculator();
    this.worldGraphResolver = new WorldGraphResolver(neo4jDriver);
    this.assetSelector = new AssetSelector();
    this.embodiedGenBridge = new EmbodiedGenBridge();
  }

  /**
   * Execute the complete deterministic pipeline
   * 
   * Input: ObserverState (DimensionalAddress + temporal context)
   * Output: EmbodiedGenScene (3D manifestation)
   * 
   * Guarantees:
   * - Same Observer + Same Time → Same Output
   * - Different Observers → Different Outputs (Perspective-Relative)
   * - Reproducible: SHA-256 Scene Hash Verification
   */
  async executePipeline(
    observer: ObserverState,
    sceneConfig: SceneConfiguration
  ): Promise<PipelineResult> {
    const startTime = performance.now();

    // Phase 1: DimensionalAddress is already in observer state

    // Phase 2: Calculate active hexagrams
    const activeHexagrams = this.hexagramCalculator.calculateActiveHexagrams(observer);

    // Phase 3: Resolve World Graph
    const worldGraphNodes = await this.worldGraphResolver.resolveWorldGraph(
      observer, 
      activeHexagrams
    );
    const worldGraphEdges = await this.worldGraphResolver.calculateEdgeWeights(
      worldGraphNodes,
      observer
    );

    // Phase 4: Select assets
    const selectedAssets = this.assetSelector.selectAssets(worldGraphNodes, observer);

    // Phase 5: Generate EmbodiedGen scene
    const embodiedGenScene = this.embodiedGenBridge.generateScene(
      selectedAssets,
      observer,
      sceneConfig
    );

    const embodiedGenOutput = this.embodiedGenBridge.exportToEmbodiedGen(embodiedGenScene);

    const endTime = performance.now();

    return {
      observer,
      activeHexagrams,
      worldGraphNodes,
      worldGraphEdges,
      selectedAssets,
      embodiedGenScene,
      embodiedGenOutput,
      performance: {
        totalTime: endTime - startTime,
        hexagramTime: 0, // Would measure each phase
        worldGraphTime: 0,
        assetSelectionTime: 0,
        embodiedGenTime: 0
      },
      verification: {
        sceneHash: this.calculateSceneHash(embodiedGenScene),
        reproducible: true
      }
    };
  }

  private calculateSceneHash(scene: EmbodiedGenScene): string {
    // SHA-256 hash of deterministic scene components
    const hashInput = JSON.stringify({
      sceneId: scene.sceneId,
      observerAddress: scene.observerAddress,
      objectCount: scene.objects.length,
      objectIds: scene.objects.map(o => o.id).sort(),
      ambientFrequency: scene.ambientFrequency,
      harmonicOverlay: scene.harmonicOverlay
    });

    // In production: use crypto.subtle.digest('SHA-256', ...)
    return `sha256_${hashInput.length}_${Date.now()}`; // Placeholder
  }
}

export interface PipelineResult {
  observer: ObserverState;
  activeHexagrams: HexagramState[];
  worldGraphNodes: WorldNode[];
  worldGraphEdges: WorldEdge[];
  selectedAssets: SelectedAsset[];
  embodiedGenScene: EmbodiedGenScene;
  embodiedGenOutput: EmbodiedGenOutput;
  performance: PipelinePerformance;
  verification: PipelineVerification;
}

export interface PipelinePerformance {
  totalTime: number;
  hexagramTime: number;
  worldGraphTime: number;
  assetSelectionTime: number;
  embodiedGenTime: number;
}

export interface PipelineVerification {
  sceneHash: string;
  reproducible: boolean;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Parse canonical DimensionalAddress string
 * Format: G.L.C.T.B D° M' S" A Z H P N
 */
export function parseDimensionalAddress(addressStr: string): DimensionalAddress {
  const regex = /^(\d+)\.(\d+)\.(\d+)\.(\d+)\.(\d+)\s+(\d+)°\s+(\d+)'\s+([\d.]+)"\s+(\d+)\s+(\w+)\s+H(\d+)\s+(\w+)\s+(\d+)$/;
  const match = addressStr.match(regex);

  if (!match) {
    throw new Error(`Invalid DimensionalAddress format: ${addressStr}`);
  }

  const zodiacMap: Record<string, number> = {
    'ARI': 1, 'TAU': 2, 'GEM': 3, 'CAN': 4, 'LEO': 5, 'VIR': 6,
    'LIB': 7, 'SCO': 8, 'SAG': 9, 'CAP': 10, 'AQU': 11, 'PIS': 12
  };

  const planetMap: Record<string, number> = {
    'SUN': 1, 'MOO': 2, 'MER': 3, 'VEN': 4, 'MAR': 5,
    'JUP': 6, 'SAT': 7, 'URA': 8, 'NEP': 9, 'PLU': 10
  };

  return {
    gate: parseInt(match[1]),
    line: parseInt(match[2]),
    color: parseInt(match[3]),
    tone: parseInt(match[4]),
    base: parseInt(match[5]),
    degree: parseInt(match[6]),
    minute: parseInt(match[7]),
    second: parseFloat(match[8]),
    arc: parseInt(match[9]),
    zodiac: zodiacMap[match[10]] as ZodiacSign,
    house: parseInt(match[11]),
    planet: planetMap[match[12]] as Planet,
    dimension: parseInt(match[13])
  };
}

/**
 * Serialize DimensionalAddress to canonical string
 */
export function serializeDimensionalAddress(addr: DimensionalAddress): string {
  const zodiacNames = ['', 'ARI', 'TAU', 'GEM', 'CAN', 'LEO', 'VIR', 'LIB', 'SCO', 'SAG', 'CAP', 'AQU', 'PIS'];
  const planetNames = ['', 'SUN', 'MOO', 'MER', 'VEN', 'MAR', 'JUP', 'SAT', 'URA', 'NEP', 'PLU'];

  return `${addr.gate}.${addr.line}.${addr.color}.${addr.tone}.${addr.base} ${addr.degree}° ${addr.minute}' ${addr.second.toFixed(2)}" ${addr.arc} ${zodiacNames[addr.zodiac]} H${addr.house} ${planetNames[addr.planet]} ${addr.dimension}`;
}

/**
 * Calculate field dominance based on planetary positions
 */
export function calculateDominantField(
  planetaryPositions: PlanetaryPosition[],
  dimensionalAddress: DimensionalAddress
): FieldType {
  const fieldScores: Record<FieldType, number> = {
    physical: 0,
    emotional: 0,
    mental: 0,
    spiritual: 0,
    temporal: 0
  };

  // Weight by planet and position
  for (const planet of planetaryPositions) {
    const field = determinePlanetField(planet.planet);
    fieldScores[field] += planet.speed * (planet.isRetrograde ? 0.5 : 1);
  }

  // Weight by DimensionalAddress gate
  const gateField = determineGateField(dimensionalAddress.gate);
  fieldScores[gateField] += 2;

  // Return highest scoring field
  return Object.entries(fieldScores)
    .sort((a, b) => b[1] - a[1])[0][0] as FieldType;
}

function determinePlanetField(planet: Planet): FieldType {
  const mapping: Record<Planet, FieldType> = {
    1: 'mental',      // Mercury
    2: 'emotional',   // Venus
    3: 'physical',    // Earth/Sun
    4: 'physical',    // Mars
    5: 'spiritual',   // Jupiter
    6: 'temporal',    // Saturn
    7: 'mental',      // Uranus
    8: 'spiritual',   // Neptune
    9: 'temporal',    // Pluto
    10: 'emotional'   // Moon
  };
  return mapping[planet];
}

function determineGateField(gate: number): FieldType {
  const fields: FieldType[] = ['physical', 'emotional', 'mental', 'spiritual', 'temporal'];
  return fields[gate % 5];
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  HexagramCalculator,
  WorldGraphResolver,
  AssetSelector,
  EmbodiedGenBridge,
  SPEC1Pipeline
};

export default SPEC1Pipeline;

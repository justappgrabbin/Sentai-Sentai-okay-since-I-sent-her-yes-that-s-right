/**
 * QIAN KERNEL MODEL — Hexagram 1 / Creating / 乾
 * 
 * 5 Kernels:
 *   K0: Total Hexagram (lines 1–6) — complete field-state
 *   K1: Lower Outer (lines 1–3) — Qian trigram / subject / agent
 *   K2: Upper Outer (lines 4–6) — Qian trigram / object / environment  
 *   K3: Lower Nuclear (lines 2–4) — Qian trigram / internal motivation
 *   K4: Upper Nuclear (lines 3–5) — Qian trigram / external expression
 * 
 * 4 Emergent Trigram Bodies extracted from the hexagram field:
 *   Body 0: Lower Outer (position 1–3)
 *   Body 1: Upper Outer (position 4–6)
 *   Body 2: Lower Nuclear (position 2–4)
 *   Body 3: Upper Nuclear (position 3–5)
 * 
 * Binary: 111111 = 63 (Hatcher matrix)
 * Chong Gua (self-reverse): yes — same signal from any perspective
 * Nuclear: Qian (self-nuclear — the inner pattern IS the outer pattern)
 * 
 * This kernel seeds the MRNN as the first attractor field. All subsequent
 * ingestions are perturbations measured against this pure yang baseline.
 */

class QianKernel {
    constructor() {
        // The 6 lines — all yang (1) for Qian
        this.lines = [1, 1, 1, 1, 1, 1]; // bottom to top
        this.binary = '111111';
        this.decimal = 63;
        this.name = 'Qian';
        this.title = 'The Creative';

        // 5 Kernels
        this.kernels = this.buildKernels();

        // 4 Emergent Trigram Bodies
        this.bodies = this.buildBodies();

        // Resonance field — the gravitational baseline
        this.field = this.buildField();

        // Dragon stages (6 lines as developmental phases)
        this.dragonStages = [
            { line: 1, stage: 'hidden', text: 'Hidden dragon. Do not act.' },
            { line: 2, stage: 'emerging', text: 'Dragon appearing in the field.' },
            { line: 3, stage: 'working', text: 'All day creatively active. At nightfall, cares.' },
            { line: 4, stage: 'leaping', text: 'Wavering flight over the depths.' },
            { line: 5, stage: 'flying', text: 'Flying dragon in the heavens.' },
            { line: 6, stage: 'peak', text: 'Arrogant dragon will have cause to repent.' }
        ];
    }

    buildKernels() {
        // K0: Total field — all 6 lines as one coherent state
        const k0 = {
            id: 'K0_TOTAL',
            name: 'Total Hexagram',
            lines: [1, 2, 3, 4, 5, 6],
            trigrams: ['Qian', 'Qian'],
            role: 'complete field-state',
            activation: 1.0,
            position: [0, 0, 0, 0, 0],
            dimensions: [1.0, 1.0, 1.0, 1.0, 1.0]
        };

        // K1: Lower Outer — lines 1-3, the subject/agent
        const k1 = {
            id: 'K1_LOWER_OUTER',
            name: 'Lower Outer',
            lines: [1, 2, 3],
            trigram: 'Qian',
            binary: '111',
            role: 'subject / agent',
            activation: 1.0,
            position: [0, -1, 0, 0, 0],
            dimensions: [1.0, 0.8, 0.6, 0.4, 0.2]
        };

        // K2: Upper Outer — lines 4-6, the object/environment
        const k2 = {
            id: 'K2_UPPER_OUTER',
            name: 'Upper Outer',
            lines: [4, 5, 6],
            trigram: 'Qian',
            binary: '111',
            role: 'object / environment',
            activation: 1.0,
            position: [0, 1, 0, 0, 0],
            dimensions: [0.2, 0.4, 0.6, 0.8, 1.0]
        };

        // K3: Lower Nuclear — lines 2-4, internal motivation
        const k3 = {
            id: 'K3_LOWER_NUCLEAR',
            name: 'Lower Nuclear',
            lines: [2, 3, 4],
            trigram: 'Qian',
            binary: '111',
            role: 'internal motivation',
            activation: 1.0,
            position: [0, 0, -1, 0, 0],
            dimensions: [0.6, 1.0, 0.8, 0.4, 0.2]
        };

        // K4: Upper Nuclear — lines 3-5, external expression
        const k4 = {
            id: 'K4_UPPER_NUCLEAR',
            name: 'Upper Nuclear',
            lines: [3, 4, 5],
            trigram: 'Qian',
            binary: '111',
            role: 'external expression',
            activation: 1.0,
            position: [0, 0, 1, 0, 0],
            dimensions: [0.2, 0.4, 0.8, 1.0, 0.6]
        };

        return [k0, k1, k2, k3, k4];
    }

    buildBodies() {
        const bodies = [
            {
                id: 'B0_LOWER_OUTER',
                name: 'Lower Outer Trigram',
                sourceLines: [1, 2, 3],
                trigram: 'Qian',
                binary: '111',
                position: 'lower',
                function: 'subject-agent',
                emergesFrom: ['K0', 'K1'],
                activationPattern: [1, 1, 1]
            },
            {
                id: 'B1_UPPER_OUTER',
                name: 'Upper Outer Trigram',
                sourceLines: [4, 5, 6],
                trigram: 'Qian',
                binary: '111',
                position: 'upper',
                function: 'object-environment',
                emergesFrom: ['K0', 'K2'],
                activationPattern: [1, 1, 1]
            },
            {
                id: 'B2_LOWER_NUCLEAR',
                name: 'Lower Nuclear Trigram',
                sourceLines: [2, 3, 4],
                trigram: 'Qian',
                binary: '111',
                position: 'nuclear-lower',
                function: 'inner-motivation',
                emergesFrom: ['K0', 'K3'],
                activationPattern: [1, 1, 1]
            },
            {
                id: 'B3_UPPER_NUCLEAR',
                name: 'Upper Nuclear Trigram',
                sourceLines: [3, 4, 5],
                trigram: 'Qian',
                binary: '111',
                position: 'nuclear-upper',
                function: 'outer-expression',
                emergesFrom: ['K0', 'K4'],
                activationPattern: [1, 1, 1]
            }
        ];

        return bodies;
    }

    buildField() {
        return {
            coherence: 1.0,
            entropy: 0.0,
            intensity: 1.0,
            weather: 'crystalline',
            attractorCount: 6,
            dominantCluster: 'Head',
            element: 'Metal',
            season: 'Autumn',
            direction: 'Northwest',
            animal: 'Dragon',
            bodyPart: 'Head',
            familyRole: 'Father',
            attractors: this.kernels.map((k, i) => ({
                id: `QIAN_A${i}`,
                position: k.position,
                strength: k.activation,
                basin: 1.0,
                kernel: k.id
            }))
        };
    }

    measureDeviation(inputVector) {
        const baseline = [1.0, 1.0, 1.0, 1.0, 1.0];

        let deviation = 0;
        let maxDeviation = 0;

        for (let i = 0; i < 5; i++) {
            const diff = Math.abs((inputVector[i] || 0) - baseline[i]);
            deviation += diff;
            if (diff > maxDeviation) maxDeviation = diff;
        }

        const avgDeviation = deviation / 5;
        const coherence = 1 - avgDeviation;

        return {
            deviation: avgDeviation,
            maxDeviation,
            coherence,
            isQian: coherence > 0.9,
            dominantDimension: this.findDominantDimension(inputVector),
            yangContent: this.calculateYangContent(inputVector)
        };
    }

    findDominantDimension(inputVector) {
        let max = 0;
        let dim = 0;
        for (let i = 0; i < 5; i++) {
            if ((inputVector[i] || 0) > max) {
                max = inputVector[i];
                dim = i;
            }
        }
        const dimNames = ['Impulse', 'Polarity', 'Witness', 'Context', 'Meaning'];
        return { dimension: dimNames[dim], value: max, index: dim };
    }

    calculateYangContent(inputVector) {
        const sum = inputVector.reduce((a, b) => a + (b || 0), 0);
        return sum / 5;
    }

    getDragonStage(activation) {
        const stageIndex = Math.min(5, Math.floor(activation * 6));
        return this.dragonStages[stageIndex];
    }

    generateVisualSignature(canvas) {
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;

        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(0, 0, w, h);

        const lineHeight = h / 8;
        const startY = h / 8;
        const lineWidth = w * 0.6;
        const startX = (w - lineWidth) / 2;

        for (let i = 0; i < 6; i++) {
            const y = startY + i * lineHeight;
            const intensity = 1 - (i * 0.1);

            ctx.strokeStyle = `rgba(0, 212, 170, ${intensity})`;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(startX + lineWidth, y);
            ctx.stroke();

            ctx.shadowColor = '#00d4aa';
            ctx.shadowBlur = 20;
            ctx.stroke();
            ctx.shadowBlur = 0;

            ctx.fillStyle = `rgba(179, 136, 255, ${intensity})`;
            ctx.font = '12px monospace';
            ctx.fillText(`${i + 1}`, startX - 20, y + 4);
        }

        ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#00d4aa';
        ctx.font = '16px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('QIAN ◈ 乾 ◈ The Creative', w / 2, h - 20);

        return canvas.toDataURL();
    }

    serialize() {
        return {
            name: this.name,
            binary: this.binary,
            decimal: this.decimal,
            kernels: this.kernels,
            bodies: this.bodies,
            field: this.field,
            dragonStages: this.dragonStages
        };
    }
}

window.QianKernel = QianKernel;

# CODEX IMPLEMENTATION PLAN

## Objetivo

Construir la presentación por iteraciones cortas, evitando pedir a Codex “haz todo” de una vez.

## Iteración 0 — Bootstrap

- React + TypeScript + Vite.
- Framer Motion.
- Integración de Archify o wrapper para HTML/SVG si aplica.
- `100dvh` sections + scroll snap.
- state machine de `sectionIndex` + `stepIndex`.
- teclado: ← ↑ → ↓ Space, R, F, Esc.
- fullscreen.
- progress nav.
- theme/tokens.
- build offline.

### Done
`npm run build` pasa y la app navega sin contenido final.

---

## Iteración 1 — Hero + Contexto + Problema

Implementar Zonas 1–3 usando `CONTENT_MASTER_TT_WEB.md`.

- gráfica de discrepancias desde `data/baseline_discrepancies.json`;
- AS-IS simple;
- logo UTEM.

No empezar AWS todavía.

---

## Iteración 2 — Objetivo + AS-IS→TO-BE

Implementar Zonas 4–5.

La transformación AS-IS→TO-BE debe usar layout animations, no dos dibujos desconectados.

---

## Iteración 3 — Procesos integrados

Implementar Zona 6 con tres flujos y steps internos.

Fuente de nodos: `data/business_flows.json`.

---

## Iteración 4 — C4 + AWS

Implementar Zonas 7–8.

### Gate de exactitud
- no SQS;
- no Step Functions;
- SNS sí en Invas→Softland MVP;
- DynamoDB = idempotencia;
- CloudWatch = logs/trazabilidad.

---

## Iteración 5 — E2E PT + controles

Implementar Zonas 9–10.

Agregar branch de evento duplicado/ya procesado.

---

## Iteración 6 — Pruebas + evidencia

Implementar Zonas 11–12.

Si aún faltan screenshots finales, usar placeholders que indiquen **exactamente** nombre de archivo esperado; no inventar capturas.

---

## Iteración 7 — Piloto + resultados + conclusiones

Implementar Zonas 13–16.

Asegurar notas metodológicas en métricas no instrumentadas.

---

## Iteración 8 — Hardening

- probar 1920×1080;
- probar 1366×768;
- fullscreen;
- sin internet;
- Chrome/Chromium y Firefox;
- verificar foco/teclado;
- evitar scroll accidental;
- lazy loading screenshots;
- 60fps razonable.

---

## Prompt de arranque para Codex

```text
Lee README_START_HERE.md y luego todos los archivos de docs/ en el orden indicado.

Estamos construyendo una presentación web interactiva para una defensa de Trabajo de Título, no una landing comercial. El contenido académico de docs/CONTENT_MASTER_TT_WEB.md es la fuente de verdad y no debe ser reinterpretado o reemplazado por supuestos.

Implementa solamente la Iteración 0 e Iteración 1 de docs/CODEX_IMPLEMENTATION_PLAN.md.

Antes de modificar archivos:
1. propón la estructura;
2. identifica dependencias;
3. señala cualquier dato faltante.

Después:
1. implementa;
2. ejecuta build;
3. corrige errores;
4. reporta decisiones y pendientes.

No agregues SQS ni Step Functions a la arquitectura final.
No inventes screenshots ni métricas.
La aplicación debe funcionar offline.
```

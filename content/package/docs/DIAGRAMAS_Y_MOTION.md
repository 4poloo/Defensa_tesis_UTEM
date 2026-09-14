# DIAGRAMAS Y MOTION — Especificación para Archify / SVG

## Criterio general

Los diagramas deben explicar una decisión o un flujo. No son decoración.

Archify es preferente cuando permita:

- trace de conexiones;
- highlight de nodos;
- control/reinicio de animación;
- presentación sin chrome/UI innecesaria;
- funcionamiento offline.

Si Archify no entrega control suficiente, usar **SVG + Framer Motion**. La claridad narrativa tiene prioridad sobre la herramienta.

---

# D1 — AS-IS → TO-BE

## Tipo
Workflow / transformation scene.

## AS-IS

Nodos:
- Softland ERP
- Usuario / operación
- Excel / registro manual
- Invas WMS

Edges:
- Softland → Usuario
- Usuario → Excel/manual
- Excel/manual → Invas
- Invas → Usuario → Softland para los movimientos que nacen en WMS

## TO-BE

Nodos:
- Softland ERP
- Middleware
- Invas WMS

Edges:
- Softland ⇄ Middleware
- Middleware ⇄ Invas

## Steps
0. AS-IS completo.
1. Highlight del usuario como puente.
2. Atenuar Excel/manual.
3. Reubicar sistemas.
4. Crear Middleware.
5. Reconectar paths.
6. Mostrar capacidades: validación, transformación, idempotencia, trazabilidad.

---

# D2 — Procesos integrados

## Tipo
Workflow/dataflow con 3 sub-flujos seleccionables.

## Recepción

`Softland OR/OC → Middleware → JSON ASN → Invas → VERIFICARASN → Middleware → XML RE → Softland`

## Producción

Mostrar el ciclo de forma conceptual:

`OT / planificación → Invas → consumo/devolución/PT → Middleware → Softland`

Agregar nota visual discreta: creación de OT puede apoyarse en plataforma complementaria por restricciones de Softland.

## Despacho

`Softland OD/NV → Middleware → JSON OS → Invas → Picking/Entrega → Despacho Express → Middleware → XML EN/DEC → Softland`

## Steps
Cada sub-flujo se activa de forma independiente; no reproducir los tres simultáneamente.

---

# D3 — C4 Context

## Tipo
System context.

## Nodos
- Administración / Contabilidad / Finanzas
- Bodega / Producción / Despacho
- TI
- Softland ERP
- Middleware AWS
- Invas WMS

## Relaciones
- Administración/Contabilidad → Softland
- Bodega/Producción/Despacho → Invas
- TI → Middleware
- Softland ⇄ Middleware
- Middleware ⇄ Invas

## Mensaje
Usuarios siguen usando sus sistemas; middleware opera como capa de interoperabilidad.

---

# D4 — Arquitectura AWS bidireccional

## Tipo
Architecture + signal trace.

## Componentes
- Softland ERP
- S3
- S3 Event
- Lambda S3
- Invas WMS
- API Gateway
- Lambda listener
- DynamoDB
- SNS
- Lambda processor
- CloudWatch

## Dirección Softland → Invas

`Softland → S3 → S3 Event → Lambda S3 → Invas`

Decoraciones semánticas:
- XML antes de Lambda S3
- JSON después de Lambda S3
- DynamoDB conectado al punto de control de idempotencia
- CloudWatch conectado a Lambdas/logging

## Dirección Invas → Softland

`Invas → API Gateway → Lambda listener → SNS → Lambda processor → S3 → Softland`

DynamoDB se consulta desde el procesamiento inicial/idempotencia. CloudWatch registra ejecución.

## Regla
NO agregar SQS ni Step Functions.

## Steps
0 topología
1 trace Softland→Invas
2 trace Invas→Softland
3 highlight DynamoDB
4 highlight CloudWatch

---

# D5 — Secuencia E2E Declaración PT

## Tipo
Sequence.

## Participantes
- Invas
- API Gateway
- Lambda listener
- DynamoDB
- SNS
- Lambda processor/handler PT
- S3
- Softland
- CloudWatch como observador transversal opcional

## Mensajes
1. Invas genera JSON PT.
2. API Gateway recibe.
3. Listener valida.
4. Listener consulta idempotencia.
5. DynamoDB responde nuevo/ya procesado.
6. Si nuevo: publicar SNS.
7. SNS activa handler.
8. Handler transforma a XML esperado por Softland.
9. XML a S3/carpeta de intercambio.
10. Softland procesa.
11. CloudWatch conserva logs/evidencia.

## Branch opcional
Si `already_processed == true`, cortar el flujo y mostrar `IGNORADO — no duplica movimiento`.

---

# D6 — Controles de ingeniería

## Tipo
Radial/4 pillars, no architecture graph.

Centro: `Middleware confiable`

Pilares:
- Validación
- Idempotencia
- Errores/reproceso
- Trazabilidad

Cada pilar tiene un micro-ejemplo y un icono simple.

---

# D7 — Estrategia de pruebas

## Tipo
Progressive pipeline.

`Funcional → Transformación → Integración → E2E → Reconciliación → Idempotencia/Error → Rendimiento/Resiliencia → Piloto`

No necesita Archify si un SVG/CSS lineal es más limpio.

---

# D8 — Evidencia E2E

## Tipo
Timeline de screenshots.

`CloudWatch → XML → S3/FTP → Azure Logs → Movimiento destino`

No reemplazar evidencias reales por mockups cuando las capturas finales estén disponibles.

---

# D9 — Piloto / estabilización

## Tipo
Timeline.

`QA → Validación → Despliegue controlado → Piloto → Monitoreo → Ajustes → Estabilización`

Agregar bifurcación conceptual:

`incidente → ¿técnico o negocio?`

---

# Reglas de motion

- Motion debe tener significado.
- Un path activo puede usar el color acento; el resto debe atenuarse.
- Los diagramas nunca deben quedar ilegibles en su estado final.
- La presentación debe poder reiniciar la animación actual con una tecla (`R`).
- `ArrowRight/Space` avanza primero steps internos y sólo después la sección.
- Evitar autoplay total en arquitectura/E2E; el presentador controla el ritmo.

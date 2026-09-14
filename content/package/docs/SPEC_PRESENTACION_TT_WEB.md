> **Nota para Codex:** este documento define implementación/UX. Para hechos académicos y cifras, `CONTENT_MASTER_TT_WEB.md` tiene prioridad.

# Especificación — Presentación Web Interactiva de Defensa TT

## 0. Propósito

Construir una presentación web interactiva para la defensa del Trabajo de Título:

**“Integración de sistemas WMS y ERP en SurChile SpA”**

La presentación reemplaza el formato PPT tradicional por una experiencia tipo **scrollytelling / slide-deck web**, con navegación por teclado, transiciones controladas y diagramas animados.

El objetivo visual no es “hacer una landing page comercial”, sino convertir la narrativa técnica del TT en una secuencia clara:

**Problema → Proceso actual → Solución → Procesos integrados → Arquitectura → Flujo E2E → Validación → Resultados → Conclusiones**

---

# 1. Decisión de desarrollo

## Recomendación

### Desarrollo principal: Codex

Usar **Codex** para:

- Crear el proyecto.
- Mantener y modificar el repositorio.
- Implementar componentes React.
- Integrar Archify.
- Crear animaciones.
- Ejecutar tests.
- Refactorizar.
- Revisar responsive/layout.
- Preparar el build offline.
- Corregir bugs durante la iteración.

### Este chat: dirección técnica y narrativa

Usar este chat para:

- Definir la historia de la defensa.
- Revisar qué información entra o sale.
- Diseñar cada zona.
- Decidir qué diagramas necesita cada sección.
- Preparar la narración oral.
- Revisar exactitud técnica respecto del TT.
- Preparar preguntas probables de la comisión.
- Criticar screenshots o grabaciones del resultado.

## Flujo de trabajo

```text
TT / contenido
      ↓
ChatGPT
Narrativa + especificación + revisión
      ↓
SPEC_PRESENTACION_TT.md
      ↓
Codex
Implementación en repositorio
      ↓
Preview local
      ↓
ChatGPT
Revisión visual/técnica
      ↓
Codex
Ajustes
```

---

# 2. Stack

## Base

- React
- TypeScript
- Vite
- Framer Motion
- Archify para diagramas técnicos
- CSS Modules, Tailwind CSS o CSS moderno
- Lucide Icons o equivalente para iconografía secundaria

## Restricciones

- Sin dependencia obligatoria de internet durante la defensa.
- No consumir APIs productivas.
- No conectarse a AWS durante la exposición.
- No cargar diagramas desde servicios externos en runtime.
- Todo recurso necesario debe quedar empaquetado localmente.

## Build

```bash
npm install
npm run dev
npm run build
npm run preview
```

El resultado final debe poder ejecutarse desde `/dist`.

---

# 3. Principios visuales

## Estética

Profesional, técnica, limpia y contemporánea.

Evitar:

- estética de dashboard administrativo;
- exceso de tarjetas;
- fondos con partículas;
- glassmorphism excesivo;
- animaciones permanentes;
- gradientes agresivos;
- exceso de logos AWS;
- texto largo visible;
- elementos decorativos sin significado.

## Jerarquía

Cada pantalla debe tener:

1. una idea principal;
2. un único foco visual;
3. máximo 3–5 fragmentos breves de texto;
4. un estado final comprensible incluso sin animación.

## Motion

La animación debe representar significado.

```text
Aparecer       = se introduce un concepto
Moverse        = existe transferencia
Iluminar       = componente actualmente activo
Trazar path    = flujo de información
Atenuar        = deja de ser el foco
Expandir       = se profundiza en un componente
```

No usar:

- bounce;
- spin;
- efectos arcade;
- transiciones aleatorias;
- autoplay rápido.

Duración habitual:

```text
150–250 ms   microinteracción
300–500 ms   entrada de texto/nodo
500–900 ms   transición de sección
1–3 s        trace completo de un flujo técnico
```

---

# 4. Navegación

La presentación debe sentirse como slides aunque internamente sea una SPA.

## Teclado

```text
→ / ↓ / Space    avanzar
← / ↑            retroceder
F                fullscreen
Esc              salir de fullscreen
R                reiniciar animación actual
1–9              acceso rápido opcional
```

## Scroll

- `scroll-snap-type: y mandatory`
- cada zona ocupa aproximadamente `100dvh`
- navegación manual prioritaria durante la defensa

## Indicador de progreso

Barra o puntos discretos:

```text
01 Contexto
02 Problema
03 Objetivo
04 Procesos
05 Arquitectura
06 Validación
07 Resultados
```

No debe competir con el contenido.

---

# 5. Arquitectura frontend

```text
src/
├── app/
│   ├── App.tsx
│   ├── routes.ts
│   └── presentation-state.ts
│
├── components/
│   ├── Section.tsx
│   ├── SectionTitle.tsx
│   ├── ProgressNav.tsx
│   ├── KeyboardController.tsx
│   ├── FullscreenButton.tsx
│   ├── Metric.tsx
│   ├── BeforeAfter.tsx
│   └── DiagramFrame.tsx
│
├── sections/
│   ├── 01-Hero.tsx
│   ├── 02-Context.tsx
│   ├── 03-Problem.tsx
│   ├── 04-Objective.tsx
│   ├── 05-AsIsToBe.tsx
│   ├── 06-BusinessFlows.tsx
│   ├── 07-SystemContext.tsx
│   ├── 08-AwsArchitecture.tsx
│   ├── 09-E2E.tsx
│   ├── 10-EngineeringControls.tsx
│   ├── 11-Testing.tsx
│   ├── 12-Evidence.tsx
│   ├── 13-Pilot.tsx
│   ├── 14-Results.tsx
│   ├── 15-Conclusions.tsx
│   └── 16-Questions.tsx
│
├── diagrams/
│   ├── AsIsDiagram.tsx
│   ├── ToBeDiagram.tsx
│   ├── BusinessFlowsDiagram.tsx
│   ├── SystemContextDiagram.tsx
│   ├── AwsArchitectureDiagram.tsx
│   └── ProductDeclarationSequence.tsx
│
├── data/
│   ├── baseline.ts
│   ├── flows.ts
│   └── architecture.ts
│
└── styles/
    ├── tokens.css
    └── global.css
```

Si Archify produce HTML/SVG autocontenido en vez de componentes:

```text
public/
└── diagrams/
    ├── as-is.html
    ├── to-be.html
    ├── processes.html
    ├── architecture.html
    └── pt-sequence.html
```

`DiagramFrame` debe encapsularlos para que visualmente formen parte de la presentación.

---

# 6. Sistema de diseño

Definir tokens desde el inicio.

```css
:root {
  --bg: ...;
  --surface: ...;
  --text-primary: ...;
  --text-secondary: ...;
  --accent: ...;
  --danger: ...;
  --border: ...;

  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;

  --content-max: 1440px;
}
```

El color `--accent` debe utilizarse sólo en:

- middleware;
- paths activos;
- cifras importantes;
- palabras clave;
- estado actual del flujo.

---

# 7. Storyboard

---

## ZONA 01 — Portada

### Objetivo

Identificar proyecto y autor sin entrar aún en detalles técnicos.

### Contenido

**Integración de sistemas WMS y ERP en SurChile SpA**

Maximiliano Andrés Olave Bastidas  
Ingeniería Civil en Computación mención Informática  
Universidad Tecnológica Metropolitana

### Visual

- Título grande.
- Línea/acento pequeño.
- Fondo abstracto muy sutil inspirado en conexiones entre sistemas.

### Motion

1. Título.
2. Subtítulo.
3. Autor.

No superar 3 animaciones.

---

## ZONA 02 — Contexto

### Pregunta que responde

**¿Qué sistemas participan y qué responsabilidad tiene cada uno?**

### Elementos

#### Softland ERP

- administración;
- contabilidad;
- costos;
- inventario administrativo.

#### Invas WMS

- recepción;
- bodega;
- producción;
- picking;
- despacho.

### Visual

```text
SOFTLAND ERP                       INVAS WMS
Administración                     Operación física
Contabilidad                       Bodega
Costos                             Producción
Inventario                         Despacho
          \                       /
           \   misma operación   /
```

### Motion

Softland entra por izquierda.  
Invas entra por derecha.

Después aparece:

**Integración limitada**

como interrupción entre ambos.

### Narrativa

No explicar AWS todavía.

---

## ZONA 03 — Problema

### Pregunta

**¿Qué ocurría debido a esa integración limitada?**

### Mensaje principal

> El usuario terminaba actuando como middleware.

### Flujo AS-IS simplificado

```text
Softland
   ↓
Usuario
   ↓
Excel / doble digitación
   ↓
Invas
```

### Consecuencias

- doble registro;
- reproceso;
- desfases;
- diferencias de inventario;
- menor trazabilidad.

### Gráfico

Usar aquí el principal gráfico cuantitativo de la presentación.

Datos de línea base:

```text
SKU A    38 %
SKU B    42 %
SKU C    33 %
SKU D    29 %
SKU E    47 %
SKU F    36 %
```

Los nombres reales de SKU deben cargarse desde el TT antes de finalizar.

### Motion

1. Flujo manual.
2. Consecuencias.
3. Barras crecen desde 0.
4. Destacar rango aproximado 30–40 %.

Nota metodológica visible en pequeño:

**Línea base diagnóstica; no corresponde a auditoría contable.**

---

## ZONA 04 — Objetivo

### Pregunta

**¿Qué se propuso desarrollar?**

### Mensaje central

> Desarrollar, documentar y validar un middleware bidireccional entre Softland ERP e Invas WMS.

### Capacidades

Alrededor del middleware:

```text
           Validación
               │
XML/JSON ── Middleware ── Trazabilidad
               │
          Idempotencia
               │
         Sincronización
```

### Motion

El nodo Middleware aparece primero.

Cada capacidad aparece después de forma radial.

---

## ZONA 05 — Transformación AS-IS → TO-BE

### Pregunta

**¿Cuál es la diferencia fundamental introducida por la solución?**

### Estado inicial

```text
Softland
   ↓
Persona
   ↓
Registro manual
   ↓
Invas
```

### Transformación animada

Los nodos `Persona` y `Registro manual` se atenúan.

Surge:

```text
Softland ⇄ Middleware ⇄ Invas
```

### Resultado visible

```text
Automatización
Validación
Trazabilidad
Control de duplicidad
```

### Motion

Esta debe ser una de las mejores transiciones de la presentación.

Usar layout animation de Framer Motion para que los nodos existentes se desplacen físicamente hacia el nuevo modelo.

---

## ZONA 06 — Procesos integrados

### Pregunta

**¿Qué procesos del negocio fueron integrados?**

### Selector visual

```text
[ RECEPCIÓN ] [ PRODUCCIÓN ] [ DESPACHO ]
```

Al avanzar con teclado se selecciona cada flujo.

### Recepción

```text
OC Softland
   ↓
ASN Invas
   ↓
Recepción física
   ↓
RE Softland
```

### Producción

```text
OT
 ↓
Invas
 ↓
Picking MP
 ↓
Consumo / devolución
 ↓
Declaración PT
 ↓
Softland
```

### Despacho

```text
NV / OD Softland
   ↓
OS Invas
   ↓
Picking
   ↓
Entrega
   ↓
EN Softland
```

### Archify

Tipo sugerido:

`workflow` / `dataflow`

Los paths activos deben usar trace.

---

## ZONA 07 — Contexto del sistema

### Pregunta

**¿Dónde se encuentra el middleware dentro del ecosistema?**

### Diagrama tipo C4 Nivel 1

```text
Administración / Contabilidad
             │
             ▼
      ┌──────────────┐
      │ Softland ERP │
      └──────┬───────┘
             │
             ▼
      ┌──────────────┐
      │ Middleware   │
      │ AWS          │
      └──────┬───────┘
             │
             ▼
      ┌──────────────┐
      │ Invas WMS    │
      └──────┬───────┘
             ▲
             │
 Bodega / Producción / Despacho

             TI
             │
     administra integración
```

### Mensaje oral clave

El middleware **no reemplaza** ninguno de los sistemas.

Su responsabilidad es la **interoperabilidad**.

---

## ZONA 08 — Arquitectura AWS

### Pregunta

**¿Cómo se implementó técnicamente la integración?**

Esta debe ser la sección técnica visual más importante.

### Diagrama inicial

Mostrar topología completa pero atenuada.

```text
                      AWS
┌─────────────────────────────────────────┐
│                                         │
│  S3      Lambda          API Gateway    │
│                   SNS                   │
│  DynamoDB               CloudWatch      │
│                                         │
└─────────────────────────────────────────┘

Softland                               Invas
```

### Animación A — Softland → Invas

```text
Softland
   ↓ XML
S3
   ↓ event
Lambda S3
   ↓ validación / transformación
JSON
   ↓
Invas
```

El trace debe:

1. salir de Softland;
2. transportar icono/documento XML;
3. iluminar S3;
4. iluminar Lambda;
5. cambiar representación de XML a JSON;
6. finalizar en Invas.

### Animación B — Invas → Softland

```text
Invas
 ↓ JSON
API Gateway
 ↓
Lambda App
 ↓
SNS
 ↓
Lambda Handler
 ↓ XML
S3
 ↓
Softland
```

### Elementos transversales

Después de ambos recorridos:

```text
DynamoDB
Idempotencia

CloudWatch
Logs + trazabilidad
```

### Archify

Tipo:

`architecture`

Preset visual:

flujo de señal / trace.

### Regla

No incluir SQS o Step Functions como si fueran componentes finales implementados si no forman parte de la implementación defendida.

---

## ZONA 09 — Secuencia E2E

### Caso

**Declaración de Producto Terminado**

### Pregunta

**¿Qué ocurre realmente con una transacción?**

### Actores

```text
Invas
API Gateway
Lambda App
DynamoDB
SNS
Handler PT
S3
Softland
```

### Secuencia

```text
1. Invas genera evento JSON.
2. API Gateway recibe.
3. Lambda App procesa.
4. Se valida OT ↔ SKU_PT.
5. Se verifica idempotencia.
6. SNS deriva evento.
7. Handler PT genera XML.
8. Archivo se deposita en S3.
9. Softland procesa.
10. CloudWatch conserva evidencia técnica.
```

### Archify

Tipo:

`sequence`

### Motion

Cada evento se activa al avanzar.

No ejecutar automáticamente toda la secuencia al entrar.

---

## ZONA 10 — Controles de ingeniería

### Pregunta

**¿Qué evita que la integración sea sólo un traductor de formatos?**

### Cuatro pilares

```text
          VALIDACIÓN
              │
IDEMPOTENCIA ─┼─ TRAZABILIDAD
              │
     ERRORES / REPROCESO
```

### Contenido

Validación:

- estructura;
- SKU;
- OT;
- fechas;
- bodega;
- reglas de negocio.

Idempotencia:

- identificar eventos ya procesados;
- evitar duplicidad.

Errores:

- logging;
- rutas de error;
- reproceso controlado.

Trazabilidad:

- CloudWatch;
- XML;
- S3;
- logs Softland;
- documento destino.

### Motion

Iluminar cada pilar según la narración.

---

## ZONA 11 — Estrategia de pruebas

### Pregunta

**¿Cómo se validó la solución?**

### Pipeline

```text
Funciones
   ↓
Transformación
   ↓
Integración
   ↓
E2E
   ↓
Idempotencia / Error
   ↓
Rendimiento / Resiliencia
   ↓
Piloto productivo
```

### Motion

Camino progresivo.

No usar diagrama Archify si Framer Motion simple resulta más limpio.

---

## ZONA 12 — Evidencia E2E

### Pregunta

**¿Cómo se sabe que una transacción realmente llegó al destino?**

### Diseño

Timeline de evidencias reales:

```text
Evento
  ↓
CloudWatch
  ↓
XML generado
  ↓
S3
  ↓
Azure Logs / Softland
  ↓
Movimiento destino
```

### Recursos

Usar capturas reales del TT.

No usar mocks si existe evidencia real.

### Interacción opcional

Al seleccionar una etapa:

- ampliar screenshot;
- resaltar línea relevante;
- mantener fondo atenuado.

---

## ZONA 13 — Piloto y estabilización

### Pregunta

**¿Cómo se llevó desde QA a operación real?**

### Timeline

```text
QA
 │
 ▼
Validación funcional
 │
 ▼
Despliegue controlado
 │
 ▼
Piloto productivo
 │
 ▼
Monitoreo
 │
 ▼
Estabilización
```

### Mensaje importante

Diferenciar:

```text
ERROR TÉCNICO
        ≠
ERROR DE NEGOCIO
```

Ejemplos de negocio:

- stock;
- datos maestros;
- configuración;
- reglas internas.

---

## ZONA 14 — Resultados

### Pregunta

**¿Qué cambió finalmente?**

### Comparativa

```text
AS-IS                         TO-BE

Doble digitación              Sincronización
Baja trazabilidad             Seguimiento E2E
Riesgo de duplicidad          Idempotencia
Reproceso difícil             Error identificable
Transferencia manual          Automatización
```

### Métrica operacional

Mostrar en una tarjeta aparte:

```text
ANTES
30–60 min

↓

TO-BE
pocos minutos
~≤5 min*
```

Nota:

`*Referencia operacional no instrumentada.`

No presentarlo como benchmark automático.

---

## ZONA 15 — Conclusiones

### Mensajes

1. La interoperabilidad Softland–Invas es técnicamente viable.
2. El middleware reduce dependencia del registro manual.
3. La solución incorpora controles de ingeniería y trazabilidad.
4. El piloto confirmó viabilidad operacional.
5. El middleware no corrige por sí solo problemas de datos maestros o reglas del sistema origen.

### Trabajo futuro

En un plano secundario:

```text
Observabilidad avanzada
CI/CD
Métricas
Resiliencia / encolado
Evolución según volumen real
```

---

## ZONA 16 — Cierre

### Texto

**De procesos fragmentados a una integración bidireccional, validada y trazable.**

Gracias.

### Motion

Casi ninguno.

La presentación debe terminar visualmente en calma.

---

# 8. Estado interno de cada sección

Cada sección debe manejar pasos internos.

Ejemplo:

```ts
type PresentationSection = {
  id: string;
  maxStep: number;
};
```

Arquitectura:

```text
step 0 → topología
step 1 → flujo Softland → Invas
step 2 → flujo Invas → Softland
step 3 → DynamoDB
step 4 → CloudWatch
```

`ArrowRight` debe:

1. avanzar el step de la sección actual;
2. sólo cuando termina `maxStep`, pasar a la siguiente sección.

Esto permite sincronizar la animación con la narración oral.

---

# 9. Archify

Archify se utilizará exclusivamente en diagramas donde el **flujo es parte del argumento**.

## Diagramas candidatos

```text
AS-IS                  workflow
TO-BE                  workflow
Procesos integrados    workflow / dataflow
Arquitectura AWS       architecture
Declaración PT         sequence
```

## Requisitos

- animación controlable;
- permitir reinicio;
- fondo integrado con la presentación;
- sin chrome/UI innecesaria;
- no depender de red;
- tipografías coherentes;
- paths legibles;
- nodos suficientemente grandes para proyector.

## Fallback

Si Archify no permite el grado de control requerido para alguna escena:

- generar SVG;
- animarlo directamente con Framer Motion.

No sacrificar claridad por insistir en una herramienta.

---

# 10. Responsive objetivo

Priorizar:

```text
1920 × 1080
16:9
proyección / TV / monitor
```

Debe seguir siendo utilizable en:

```text
1366 × 768
1440 × 900
```

Mobile no es prioritario.

---

# 11. Seguridad de la defensa

La presentación no debe depender de infraestructura externa.

## Preparar

```text
/dist
PDF de respaldo
capturas de los diagramas
grabación MP4 opcional de la presentación completa
```

## Día de defensa

Ejecutar localmente.

Ideal:

```bash
npm run preview -- --host 127.0.0.1
```

o un servidor estático empaquetado.

Desactivar:

- actualizaciones;
- notificaciones;
- suspensión;
- screensaver.

---

# 12. Rendimiento

Objetivos:

- primera carga < 2 s en hardware local;
- animaciones a 60 fps cuando sea razonable;
- evitar videos 4K;
- SVG preferido;
- imágenes comprimidas;
- lazy loading de screenshots pesados.

No cargar todas las animaciones complejas simultáneamente.

---

# 13. Accesibilidad visual

- contraste alto;
- mínimo aproximado de 24–28 px para contenido proyectado;
- títulos 48–72 px según composición;
- evitar textos largos;
- evitar gris demasiado tenue;
- no depender únicamente del color para expresar estado.

---

# 14. Fases de desarrollo

## Fase 1 — Skeleton

- Vite + React + TypeScript.
- navegación por secciones;
- keyboard controller;
- fullscreen;
- progress nav;
- tokens visuales.

## Fase 2 — Storytelling

Implementar zonas:

1–5.

Objetivo: validar ritmo visual.

## Fase 3 — Diagramas

Implementar:

- procesos;
- C4;
- AWS;
- E2E.

## Fase 4 — Evidencia

Agregar:

- screenshots;
- métricas;
- resultados.

## Fase 5 — Narración

Ajustar cada paso según el discurso real.

## Fase 6 — Hardening

- build offline;
- prueba sin internet;
- resolución 1080p;
- navegador fullscreen;
- backup PDF;
- ensayo completo.

---

# 15. Definition of Done

La presentación está lista cuando:

- [ ] funciona completamente sin internet;
- [ ] puede navegarse sólo con teclado;
- [ ] cada zona tiene una idea central;
- [ ] ningún diagrama requiere leer texto pequeño;
- [ ] arquitectura Softland→Invas puede reproducirse paso a paso;
- [ ] arquitectura Invas→Softland puede reproducirse paso a paso;
- [ ] E2E de PT puede reproducirse paso a paso;
- [ ] la línea base está correctamente citada/validada contra el TT;
- [ ] las cifras operacionales están etiquetadas según su nivel de evidencia;
- [ ] existen capturas reales de validación;
- [ ] existe build offline;
- [ ] existe PDF de respaldo;
- [ ] se probó en 1920×1080;
- [ ] se hizo al menos un ensayo completo de la defensa.

---

# 16. Prompt inicial para Codex

Usar como primer encargo:

```text
Quiero construir una presentación web interactiva para mi defensa de Trabajo
de Título, no una landing page comercial.

Lee completamente SPEC_PRESENTACION_TT.md antes de modificar archivos.

Stack:
- React
- TypeScript
- Vite
- Framer Motion
- Archify para diagramas técnicos cuando corresponda

Objetivos de esta primera iteración:

1. Crear el proyecto base.
2. Implementar el sistema de secciones 100dvh.
3. Implementar navegación mediante ArrowLeft, ArrowRight, ArrowUp,
   ArrowDown y Space.
4. Cada sección debe admitir steps internos antes de avanzar a la siguiente.
5. Implementar fullscreen.
6. Implementar indicador discreto de progreso.
7. Crear tokens de diseño.
8. Crear las primeras cinco zonas con contenido placeholder:
   Hero, Contexto, Problema, Objetivo y AS-IS→TO-BE.
9. No desarrollar todavía la arquitectura AWS final.
10. Mantener todos los componentes desacoplados y reutilizables.
11. La aplicación debe funcionar offline después de npm run build.

Antes de implementar:
- propone la estructura de archivos;
- identifica decisiones técnicas relevantes;
- señala cualquier ambigüedad.

Después:
- implementa;
- ejecuta build;
- reporta errores;
- corrige los errores encontrados;
- resume los archivos creados y las decisiones tomadas.
```

---

# 17. Forma de iteración recomendada

No pedirle a Codex:

> “hazme toda la presentación”.

Trabajar por bloques:

```text
ITERACIÓN 1
Shell + navegación + diseño base

ITERACIÓN 2
Hero / Contexto / Problema / Objetivo

ITERACIÓN 3
AS-IS → TO-BE

ITERACIÓN 4
Procesos Archify

ITERACIÓN 5
C4 + AWS

ITERACIÓN 6
Secuencia E2E

ITERACIÓN 7
Pruebas + evidencia

ITERACIÓN 8
Resultados + conclusiones

ITERACIÓN 9
Pulido + performance + offline

ITERACIÓN 10
Ensayo y correcciones
```

La narrativa se estabiliza antes de invertir tiempo en motion fino.

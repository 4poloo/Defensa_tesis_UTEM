# CONTENT MASTER — Presentación Web de Defensa TT

> **Fuente de verdad de contenido para Codex.**  
> Esta guía define qué información debe mostrarse en cada zona, qué información queda para la narración oral y qué recurso visual corresponde.  
> El objetivo es evitar pantallas llenas de texto: la web debe comunicar visualmente y permitir que la explicación oral complete el argumento.

---

# 0. Tesis central que debe sostener toda la presentación

SurChile SpA opera con dos sistemas especializados que representan perspectivas distintas de la misma operación:

- **Softland ERP:** procesos administrativos, contables, financieros, órdenes de compra/venta, producción e inventario administrativo.
- **Invas WMS:** operación física de bodega, recepción, producción, picking, ubicaciones, movimientos y stock físico.

Durante el período evaluado existía una integración limitada entre ambos, lo que generaba registros duplicados, desfases entre la operación física y administrativa, diferencias de inventario, reprocesos y menor trazabilidad.

El Trabajo de Título desarrolla y valida un **middleware bidireccional** capaz de transformar y sincronizar eventos XML/JSON entre Softland e Invas, aplicando validación, control de duplicidad, manejo de errores y trazabilidad.

La solución final se implementa sobre AWS con una arquitectura serverless simplificada. El proyecto no reemplaza Softland ni Invas: agrega una capa de interoperabilidad entre ambos.

---

# ZONA 01 — Portada

## Pregunta que responde
¿De qué trata el Trabajo de Título?

## En pantalla

**Integración de sistemas WMS y ERP en la empresa SurChile SpA**

Maximiliano Andrés Olave Bastidas  
Ingeniería Civil en Computación mención Informática  
Universidad Tecnológica Metropolitana  
2026

## Visual

Pantalla limpia, 16:9. Puede utilizarse el logo UTEM disponible en `assets/reference/utem-logo.png`.

No mostrar servicios AWS ni un diagrama complejo en la portada.

## Narración sugerida

El trabajo aborda un problema real de interoperabilidad entre los dos sistemas principales que soportan la operación de SurChile. El proyecto parte desde el diagnóstico AS-IS, diseña los procesos TO-BE, implementa un middleware, lo valida técnicamente y termina con un piloto productivo controlado.

## Motion

- Entrada suave del título.
- Aparición posterior de autor/carrera.
- Ninguna animación decorativa permanente.

## Fuente
Informe final: portada, resumen e introducción.

---

# ZONA 02 — Contexto: dos sistemas, una operación

## Pregunta que responde
¿Por qué Softland e Invas necesitan intercambiar información?

## Mensaje principal

**Dos sistemas críticos representan la misma operación desde perspectivas distintas.**

## En pantalla

### Softland ERP
- Administración
- Contabilidad y finanzas
- Costos
- Órdenes de compra / venta
- Producción administrativa
- Inventario administrativo

### Invas WMS
- Recepción física
- Bodega y ubicaciones
- Producción operacional
- Picking
- Despacho
- Stock físico

Texto central breve:

**Integración limitada**

## Visual recomendado

Dos sistemas enfrentados:

```text
SOFTLAND ERP                    INVAS WMS
Administración                  Operación física
Contabilidad                    Bodega
Costos                          Producción
Inventario                      Despacho
        \                        /
         \  misma operación    /
          \                    /
        integración limitada
```

## Motion

1. Aparece Softland desde la izquierda.
2. Aparece Invas desde la derecha.
3. Aparece el vínculo conceptual “misma operación”.
4. El vínculo se interrumpe o se muestra incompleto con el texto “integración limitada”.

## Narración sugerida

Softland representa principalmente la dimensión administrativa y contable, mientras Invas representa la ejecución física de bodega y producción. El problema no era que existieran dos sistemas, sino que los movimientos de una misma operación debían mantenerse alineados sin una sincronización suficiente.

## Fuente
Informe final, Introducción y Capítulo 6.  
Avance 1, situación actual y entrevistas.

---

# ZONA 03 — Problema: el usuario actuaba como middleware

## Pregunta que responde
¿Qué impacto producía la falta de integración?

## Mensaje principal

**El usuario terminaba actuando como mecanismo de integración entre los sistemas.**

## En pantalla

- Doble digitación
- Uso de Excel y reprocesos
- Desfases entre movimientos físicos y administrativos
- Diferencias de inventario
- Menor trazabilidad
- Demoras en conciliación y costos

## Diagrama AS-IS resumido

```text
Softland
   ↓
Usuario / área operativa
   ↓
Excel / carga manual / validación manual
   ↓
Invas
```

También existen flujos en sentido inverso donde la operación se registra primero en Invas y posteriormente se replica en Softland.

## Gráfico principal de línea base

Usar barras horizontales con datos de la muestra de seis meses:

| SKU | Producto | Diferencia | Mes | Causa registrada |
|---|---|---:|---|---|
| 301002 | Detergente 10 L | +38 % | Jun 2025 | Diferencias en PT declarado e inventariado en ERP |
| 201041 | Agua Verde 10 L | +42 % | May 2025 | Error humano al cargar WMS y luego ERP |
| 201043 | Agua Verde 5 L | +33 % | Abr 2025 | Carga manual en ERP |
| 201056 | Anticongelante –12 GL | +29 % | Jul 2025 | Error humano al cargar WMS y luego ERP |
| 301021 | Lavalozas 5 L | +47 % | Jun 2025 | Pick duplicado sin cierre OS |
| 900162 | Aceite STIHL 500 cc | +36 % | Jun 2025 | Declaración PT incompleta |

### Nota obligatoria

**Valores estimativos a partir de diferencias reales detectadas en operación previa; se utilizan como línea base diagnóstica y no como auditoría contable.**

La tesis también contextualiza diferencias promedio históricas de aproximadamente **30–40 %**, con casos puntuales por sobre **120 %** durante el período manual/no integrado.

## Motion

1. Construir el flujo manual.
2. Introducir las consecuencias.
3. Hacer crecer las barras desde 0.
4. Destacar visualmente el rango 30–40 %, sin ocultar los valores individuales.

## Activos disponibles

Como referencias del AS-IS, no como gráficos finales:

- `assets/reference/as-is-recepcion.png`
- `assets/reference/as-is-ot.png`
- `assets/reference/as-is-produccion.png`
- `assets/reference/as-is-despachos.png`

## Fuente
Informe final: Capítulo 3, Tabla 4, Figuras 1–5.  
Avance 1: procesos AS-IS y entrevistas.

---

# ZONA 04 — Objetivo y alcance

## Pregunta que responde
¿Qué se propuso construir y qué cubre el proyecto?

## Objetivo general en pantalla

**Desarrollar, documentar y validar un middleware de integración entre Softland ERP e Invas WMS, basado en la transformación y sincronización de eventos XML/JSON, para reducir duplicidad de registros, mejorar trazabilidad y favorecer la consistencia de inventario, producción y costos.**

No mostrar los seis objetivos específicos completos a la vez. Sintetizarlos visualmente en seis hitos:

1. Diagnosticar AS-IS.
2. Identificar datos, contratos y endpoints.
3. Establecer una línea base.
4. Definir requisitos.
5. Implementar MVP AWS.
6. Validar mediante pruebas y piloto.

## Alcance en pantalla

### Procesos
- Recepción y compras
- Producción y control de materiales
- Consumos y devoluciones
- Declaración de producto terminado
- Despachos

### Sistemas
- Softland ERP
- Invas WMS

### Características de ingeniería
- XML ↔ JSON
- Validación
- Idempotencia
- Manejo de errores
- Trazabilidad

## Limitación conceptual que conviene anticipar

La integración **no corrige por sí sola problemas de datos maestros, stock histórico ni reglas internas de los sistemas**.

## Visual

Middleware en el centro y capacidades alrededor.

## Motion

Primero objetivo, luego capacidades y finalmente alcance.

## Fuente
Informe final: Capítulo 2; Objetivo general, objetivos específicos y alcance.

---

# ZONA 05 — Transformación AS-IS → TO-BE

## Pregunta que responde
¿Cuál es el cambio fundamental introducido por el proyecto?

## Estado AS-IS

```text
Softland
   ↓
Persona
   ↓
Registro manual / Excel
   ↓
Invas
```

Consecuencias debajo:

`Duplicidad · Demora · Error · Baja trazabilidad`

## Estado TO-BE

```text
Softland ⇄ Middleware ⇄ Invas
```

Responsabilidades nuevas:

`Transformación · Validación · Idempotencia · Trazabilidad`

## Motion clave

Esta escena debe transformarse, no sólo cambiar de pantalla:

1. Mostrar AS-IS.
2. Atenuar “Persona” y “Excel”.
3. Reubicar Softland e Invas hacia extremos.
4. Crear el nodo Middleware en el centro.
5. Convertir flechas manuales en conexiones bidireccionales.
6. Encender las cuatro responsabilidades.

El objetivo es hacer visible la frase:

> **La solución retira al usuario del rol de transportar información entre sistemas.**

## Fuente
Informe final: Capítulos 3 y 5; Tabla 60 comparativa AS-IS vs TO-BE.

---

# ZONA 06 — Procesos integrados

## Pregunta que responde
¿Qué procesos de negocio atraviesan realmente el middleware?

La zona puede tener un selector o pasos internos:

`[ RECEPCIÓN ] [ PRODUCCIÓN ] [ DESPACHO ]`

---

## 6A — Recepción

### Flujo TO-BE resumido

```text
Softland
  OR / OC (XML)
      ↓
Middleware
      ↓
ASN (JSON)
      ↓
Invas
      ↓
Recepción física
      ↓
VERIFICARASN (JSON)
      ↓
Middleware
      ↓
RE (XML)
      ↓
Softland
```

### Mensaje
La recepción esperada se origina administrativamente en Softland, se convierte en ASN para Invas y la recepción real vuelve al ERP mediante un documento de entrada equivalente.

---

## 6B — Producción y materiales

### Flujo resumido

```text
Planificación / OT
      ↓
Softland / plataforma auxiliar según flujo
      ↓
Invas
      ↓
Picking MP
      ↓
Consumo / devolución / merma
      ↓ JSON
Middleware
      ↓ XML
Softland
      ↑
Declaración PT desde Invas
```

### Mensaje
El flujo busca eliminar la replicación manual de consumos, devoluciones y producto terminado. La creación de OT posee una particularidad: el informe final documenta una **plataforma complementaria** para apoyar la creación de OT en Invas debido a restricciones de Softland; no representar este punto como si fuera un flujo directo nativo si no corresponde.

---

## 6C — Despacho

### Flujo resumido

```text
Softland
 OD basado en NV (XML)
        ↓
Middleware
        ↓
OS (JSON)
        ↓
Invas
        ↓
Picking / Entrega
        ↓
Despacho Express (JSON)
        ↓
Middleware
        ↓
EN / DEC (XML)
        ↓
Softland
```

### Mensaje
La orden nace en Softland, WMS ejecuta el trabajo físico y la confirmación de entrega vuelve al ERP conservando la referencia documental.

## Visual / Motion

Usar Archify `workflow`/`dataflow` o SVG animado. Cada proceso debe recorrer su path mediante trace; no mostrar los BPMN completos del informe en tamaño pequeño.

## Fuente
Informe final: Capítulo 5; Figuras 6–9.  
Anexos: Tabla 66 contratos principales.

---

# ZONA 07 — C4 / Contexto del sistema

## Pregunta que responde
¿Dónde vive el middleware dentro del ecosistema SurChile?

## Diagrama

```text
Administración / Contabilidad
            │
            ▼
      ┌──────────────┐
      │ Softland ERP │
      └──────┬───────┘
             │ XML
             ▼
      ┌──────────────┐
      │ Middleware   │
      │ AWS          │
      └──────┬───────┘
             │ JSON
             ▼
      ┌──────────────┐
      │ Invas WMS    │
      └──────┬───────┘
             ▲
             │
 Bodega / Producción / Despacho

TI → opera y soporta la integración
```

## Mensaje principal

**El middleware no reemplaza Softland ni Invas; desacopla la interoperabilidad de la lógica interna de ambos productos.**

## Actores

- Administración / Contabilidad / Finanzas
- Bodega / Producción / Despacho
- TI

## Motion

1. Actores y sistemas existentes.
2. Mostrar que cada actor sigue usando su sistema habitual.
3. Insertar middleware entre Softland e Invas.
4. Activar relaciones de interoperabilidad.

## Fuente
Informe final: Figura 24 C4 Nivel 1, p. 147; Figura 25 C4 Nivel 2, p. 149.

---

# ZONA 08 — Arquitectura técnica AWS

## Pregunta que responde
¿Cómo se implementó técnicamente el middleware?

## Regla de exactitud

**NO mostrar SQS ni Step Functions como parte de la implementación final.**

El informe final explica que la arquitectura fue simplificada para priorizar una solución trazable, mantenible y acorde al entorno real. SQS y Step Functions se mencionaron en etapas preliminares, pero no forman parte de la implementación actual defendida.

## Componentes implementados

| Componente | Responsabilidad |
|---|---|
| API Gateway | Expone endpoints HTTP para eventos JSON enviados desde Invas |
| Lambda listener | Recibe evento y ejecuta validaciones iniciales |
| DynamoDB | Registra identificadores naturales y controla idempotencia |
| SNS | Distribuye eventos de Invas hacia procesadores específicos |
| Lambda procesadora | Clasifica la transacción y genera la transformación correspondiente |
| S3 Event | Activa procesamiento automático de XML provenientes de Softland |
| Lambda S3 | Lee XML de S3, valida y transforma a JSON para Invas |
| CloudWatch | Logs, errores, eventos recibidos y resultados |
| S3 | XML generados, entrada/salida, procesados y errores |

## Flujo A — Softland → Invas

```text
Softland
  │ XML
  ▼
S3
  │ Object/Event
  ▼
Lambda S3
  │
  ├─ validar estructura
  ├─ controlar identificador / idempotencia
  ├─ interpretar documento
  └─ transformar XML → JSON
  │
  ▼
Endpoint Invas
  │
  ▼
Invas WMS
```

CloudWatch registra la ejecución. S3 mantiene rutas de procesamiento/error según corresponda.

## Flujo B — Invas → Softland

```text
Invas
  │ JSON
  ▼
API Gateway
  ▼
Lambda listener
  │
  ├─ validar
  └─ verificar identificador en DynamoDB
  │
  ▼
SNS
  ▼
Lambda procesadora
  │
  ├─ clasificar transacción
  └─ transformar JSON → XML
  │
  ▼
S3
  ▼
Softland
```

CloudWatch acompaña todo el procesamiento.

## Visual recomendado

Dos carriles horizontales dentro de un contenedor AWS. Mantener Softland fuera a la izquierda e Invas fuera a la derecha. DynamoDB y CloudWatch deben visualizarse como capacidades transversales, no como una cadena forzada si el flujo no pasa físicamente siempre por ellas.

## Motion

### Step 0
Topología atenuada.

### Step 1
Trace Softland → Invas. Un “documento XML” recorre el path y cambia visualmente a JSON al salir de Lambda.

### Step 2
Trace Invas → Softland. Un evento JSON recorre API Gateway → listener → SNS → processor → S3 y cambia a XML antes de Softland.

### Step 3
Resaltar DynamoDB como control de duplicidad.

### Step 4
Resaltar CloudWatch como trazabilidad.

## Fuente
Informe final: Capítulo 6, Figuras 10–13; Capítulo 7, Figura 14 y Tabla 18.

---

# ZONA 09 — Secuencia E2E: Declaración de Producto Terminado

## Pregunta que responde
¿Qué le ocurre realmente a una transacción desde que nace hasta que llega a Softland?

## Por qué usar este caso

Declarar PT es uno de los flujos maduros del MVP y permite explicar:

- evento JSON desde WMS;
- API Gateway;
- Lambda;
- validación;
- idempotencia;
- SNS;
- transformación;
- XML;
- S3;
- procesamiento en Softland;
- evidencia E2E.

## Secuencia conceptual

```text
Invas          API GW       Listener      DynamoDB        SNS       Handler PT       S3       Softland
  │               │             │             │            │            │             │           │
  │── JSON ──────▶│             │             │            │            │             │           │
  │               │────────────▶│             │            │            │             │           │
  │               │             │─ validar ───│            │            │             │           │
  │               │             │─ dedupe ───▶│            │            │             │           │
  │               │             │◀─ nuevo ────│            │            │             │           │
  │               │             │─────────────────────────▶│            │             │           │
  │               │             │             │            │───────────▶│             │           │
  │               │             │             │            │            │─ genera XML ▶│           │
  │               │             │             │            │            │             │──────────▶│
```

## Validaciones que se pueden mencionar oralmente

- estructura del evento;
- identificador natural/idempotencia;
- reglas específicas del flujo;
- correspondencia OT/SKU cuando aplique;
- cantidades/formato según reglas implementadas.

No llenar la pantalla con todas las reglas.

## Motion

Cada mensaje se dispara con un step de teclado. El diagrama no debe auto-reproducirse completo al entrar.

## Fuente
Informe final: Capítulos 7–8; Figuras 14–16 y 31–33; Tablas 98 y 104.

---

# ZONA 10 — Controles de ingeniería

## Pregunta que responde
¿Por qué esto es un middleware confiable y no sólo un conversor de XML/JSON?

## Cuatro pilares

### 1. Validación
- estructura;
- datos requeridos;
- formatos de fecha;
- bodegas/UOM/documentos homologados;
- reglas de negocio por transacción.

### 2. Idempotencia
- identificadores naturales;
- registro en DynamoDB;
- un mismo evento reenviado no debe producir otro movimiento.

### 3. Errores y reproceso
- rutas controladas;
- carpeta/ruta Errors;
- logs técnicos;
- posibilidad de reproceso manual/controlado.

### 4. Trazabilidad
- CloudWatch;
- archivo XML generado;
- S3 / carpeta de intercambio;
- logs Softland/Azure;
- documento/movimiento destino.

## Visual

Un nodo “Middleware confiable” en el centro y cuatro pilares alrededor. Al explicar cada uno, iluminar el pilar y mostrar un micro-ejemplo.

## Evidencia fuerte

Las Figuras 38–40 del informe muestran que un documento/evento ya procesado es detectado e ignorado, confirmando la protección frente a reenvíos/duplicaciones.

## Fuente
Informe final: Tabla 71 idempotencia; Tablas 72–74 errores/trazabilidad; Figuras 13 y 35–40.

---

# ZONA 11 — Estrategia de pruebas

## Pregunta que responde
¿Cómo se demostró que la integración funcionaba?

## Pipeline de validación

```text
Funcionales / unitarias
        ↓
Transformación XML ↔ JSON
        ↓
Integración
        ↓
E2E
        ↓
Reconciliación
        ↓
Idempotencia / error / reproceso
        ↓
Rendimiento / resiliencia
        ↓
Piloto productivo
```

## Cobertura que sí puede afirmarse

- transformación XML/JSON;
- integración extremo a extremo;
- reconciliación de cantidades;
- control de duplicidad;
- manejo de errores;
- reproceso;
- rendimiento operacional;
- resiliencia;
- piloto con datos reales.

## Volumen de la validación de rendimiento

| Flujo | Cantidad aproximada evaluada |
|---|---:|
| Declarar PT | 10 eventos |
| Consumir MP | 5 eventos |
| Despacho Express multi-línea | 5 eventos |
| Generación OS Softland → Invas | 5 eventos |

### Nota obligatoria

**No fue un benchmark formal de alto volumen; fue una validación operacional con cargas representativas.**

## Fuente
Informe final: Capítulo 8, Tablas 23–30; anexos J.9/J.10.

---

# ZONA 12 — Evidencia E2E

## Pregunta que responde
¿Cómo se sabe que una transacción llegó realmente al sistema destino?

## Historia visual

```text
1. Evento / ejecución
        ↓
2. CloudWatch
        ↓
3. XML generado
        ↓
4. S3 / carpeta de intercambio
        ↓
5. Softland Azure Logs
        ↓
6. Movimiento destino / reconciliación
```

## Evidencias recomendadas para esta zona

### Declaración PT
- Figura 31 — CloudWatch Logs, p.196
- Figura 32 — XML creado, p.197
- Figura 33 — Softland Azure Logs, p.197

### Reconciliación
- Figura 34 — comparación Invas vs Softland 120 unidades, p.200

## Reconciliaciones documentadas

| Flujo | Invas | Softland | Resultado |
|---|---|---|---|
| Declarar PT | SKU 101006, 120 unidades | Entrada 120 | Conciliado |
| Consumir MP | SKU 801007, 7500 unidades | Salida 7500 | Conciliado |
| Recepción real | Cantidad recibida en ASN | Entrada RE equivalente | Conciliado |
| Despacho | Cantidad despachada | Salida EN equivalente | Conciliado |

## Motion

Mostrar una evidencia por paso. Permitir zoom ligero de screenshots, pero evitar una galería compleja.

## Fuente
Informe final: Tabla 100; Figuras 31–34.

---

# ZONA 13 — Piloto productivo y estabilización

## Pregunta que responde
¿La solución se probó sólo en QA o también con operación real?

## Timeline

```text
QA
 ↓
Validación funcional
 ↓
Despliegue controlado
 ↓
Piloto productivo
 ↓
Monitoreo
 ↓
Ajustes
 ↓
Estabilización
```

## Qué se monitoreó

- CloudWatch;
- archivos generados;
- rutas Procecced / Errors según nomenclatura usada en el entorno;
- logs de procesamiento de Softland/Azure;
- resultado del documento en el sistema destino.

## Mensaje principal

**El piloto confirmó que la integración podía operar con datos reales y flujos productivos controlados.**

## Concepto importante para defensa

Separar:

```text
ERROR TÉCNICO DE INTEGRACIÓN
            ≠
ERROR / RECHAZO DE NEGOCIO
```

Ejemplos de condiciones de negocio que el middleware puede detectar/evidenciar pero no resolver por sí mismo:

- stock insuficiente;
- SKU/dato maestro incorrecto;
- configuración incompleta;
- rechazo por reglas internas de Softland.

## Evidencias recomendadas

- Figura 18 — Azure Log Softland consumos procesados, p.101
- Figura 19 — CloudWatch Declarar PT, p.102
- Figura 20 — carpetas Procecced / Errors, p.102
- Figura 26 — flujo de despliegue controlado, p.172

## Fuente
Informe final: Capítulo 9; Tablas 31–40; Figuras 18–20 y 26.

---

# ZONA 14 — Resultados

## Pregunta que responde
¿Qué cambió con la solución y qué se pudo demostrar?

## Comparativa cualitativa

| AS-IS | TO-BE / resultado |
|---|---|
| Doble digitación | Sincronización automática en flujos integrados |
| Dependencia de Excel/manual | Transformación controlada XML/JSON |
| Baja trazabilidad | Evidencia E2E mediante logs/archivos/destino |
| Riesgo de duplicidad | Idempotencia mediante identificadores y DynamoDB |
| Error difícil de localizar | Rutas de error y trazabilidad técnica |
| Desfase operación/administración | Menor desfase en los flujos integrados |

## Rendimiento: métricas y observaciones defendibles

### Tiempo middleware AWS

En casos analizados de **Declarar PT** y **Consumir MP**, clasificación, transformación y generación del archivo se completaron aproximadamente en **1–2 segundos** según logs de CloudWatch.

### Tiempo extremo a extremo

La disponibilidad final en Softland puede tardar algunos minutos debido a que el ERP procesa archivos secuencialmente desde la carpeta de intercambio.

### Ritmo observado en Softland

Aproximadamente **10 archivos/minuto**, variable según tamaño y complejidad del XML. No es un SLA.

### Referencia operacional global

El informe también registra que actividades de traspaso que podían requerir **30–60 minutos** pasaron a completarse en **pocos minutos, normalmente dentro de un máximo aproximado de 5 minutos**.

#### Nota obligatoria

Esta referencia es una **estimación operacional**, no una medición instrumentada ni un SLA.

## Mensaje de arquitectura/rendimiento

**El middleware no fue el principal cuello de botella observado; la mayor variabilidad se encontró en la lectura y procesamiento posterior realizado por Softland.**

## No afirmar

- “redujimos errores en X %” — no existe línea base cuantitativa suficiente para ese porcentaje;
- “garantizamos 5 minutos” — no es un SLA;
- “eliminamos todas las diferencias de inventario” — falso.

## Fuente
Informe final: Tabla 93; Capítulo 8/9 y Resumen; observaciones de rendimiento y resultados.

---

# ZONA 15 — Conclusiones y trabajo futuro

## Pregunta que responde
¿Qué demostró el proyecto y cuáles son sus límites?

## Conclusiones principales

1. La interoperabilidad Softland–Invas es **técnicamente viable** mediante un middleware bidireccional.
2. La solución reduce la dependencia de **registros manuales** en los flujos integrados.
3. La arquitectura incorpora **validación, idempotencia, manejo de errores y trazabilidad**.
4. El piloto productivo confirmó que los documentos pueden generarse, procesarse y reconciliarse con datos reales.
5. La consistencia total de inventario/producción/costos sigue dependiendo de la calidad de datos maestros, stock y reglas internas de los sistemas.
6. Cuando el problema está fuera del middleware, la solución aporta valor al **detectar, aislar y evidenciar** el incidente.

## Trabajo futuro

Mostrar como capa secundaria, no como trabajo ya implementado:

- pruebas automatizadas y regresión;
- fixtures XML/JSON y mocks;
- CI/CD controlado para las Lambdas;
- reproceso asistido;
- dashboards/observabilidad más avanzada;
- controles de seguridad adicionales;
- desacoplamiento/encolado adicional si el volumen y criticidad lo justifican.

### Advertencia

No presentar SQS como “faltante obligatorio”. Plantearlo como una posible evolución de desacoplamiento si las métricas y necesidades operacionales justifican mayor complejidad.

## Fuente
Informe final: Capítulo 10; Tabla 40; Tabla 17 delimitación MVP/piloto/mejoras futuras.

---

# ZONA 16 — Cierre y preguntas

## En pantalla

**De procesos fragmentados a una integración bidireccional, validada y trazable.**

**Gracias**  
Preguntas

## Visual

Muy limpia. Puede reutilizar visualmente la relación final:

```text
Softland ⇄ Middleware AWS ⇄ Invas
```

sin volver a abrir la arquitectura completa.

## Motion

Mínimo. La presentación termina en calma.

---

# Contenido complementario disponible para preguntas de comisión

Estos elementos no deberían ocupar una sección principal salvo que la duración de la defensa lo permita, pero conviene tenerlos implementados como paneles ocultos, anexos navegables o rutas de backup:

## A. Contratos XML/JSON

Contratos principales:

- OR/OC → ASN
- VERIFICARASN → RE
- DEVOLVERASN → AJ/AJS
- consumo MP/LPN → AJ/AJS/STI
- DEVCLI/EOT → AJ/AJS/EOT
- PT → AJ/AJS/EOT
- OD/NV → OS
- Despacho Express → EN/DEC

## B. Mapeos implementados

- Consumo MP → salida positiva de MP
- Devolución MP → entrada positiva de MP
- Declarar PT → entrada positiva de PT
- Recepción real → entrada asociada a recepción
- Despacho Express → salida asociada a despacho
- OR/OC → JSON ASN
- OD/NV → JSON OS

## C. Idempotencia

Un documento/evento ya procesado debe detectarse mediante su identificador natural y no generar nuevamente el movimiento. DynamoDB se utiliza como registro de control.

## D. Manejo de errores

Errores documentados incluyen SKU inexistente, fechas inválidas, stock insuficiente, documentos duplicados y errores de formato. El sistema busca aislar el problema y conservar evidencia para diagnóstico/reproceso.

## E. Despliegue/rollback

El informe contiene checklists de despliegue, rollback, monitoreo e incidentes. Si se incorpora una sección de anexos interactivos, puede añadirse un diagrama de QA → Producción y un resumen del rollback.

---

# Regla de oro para Codex

**No convertir este documento en párrafos visibles.**  
Cada zona debe condensar el argumento en una frase principal, un recurso visual y unos pocos conceptos. El detalle está aquí para que la implementación sea académicamente correcta y para alimentar la narración, no para llenar la pantalla.

> **Documento auxiliar de narrativa.** Fue creado para el enfoque Canva anterior; puede reutilizarse para discurso, pero la estructura web actual se rige por `CONTENT_MASTER_TT_WEB.md`.

# Guion de defensa — Integración Softland ERP ↔ Invas WMS

> Documento de trabajo para acompañar el Canva de defensa.  
> Criterio: la diapositiva muestra poco; la explicación oral completa el argumento.  
> El color de acento debe ser el mismo definido en la diapositiva 2 del Canva.

## Sistema visual recomendado

- Fondo y tipografías: mantener la plantilla actual.
- Color de acento: reservarlo para palabras clave, nodos activos y flechas principales.
- Gris/blanco: elementos secundarios.
- No usar más de 1–2 colores de énfasis por diapositiva.
- Iconografía simple: ERP, bodega, nube/AWS, documento XML, JSON, usuario, logs.
- Animaciones: cortas y funcionales. Preferir `Aparecer`, `Desvanecer`, `Barrido` y transiciones tipo `Match & Move` cuando una diapositiva se construya por etapas.
- Evitar rebotes, giros, zoom agresivo y animaciones continuas.

---

# 1. Portada

## En pantalla
**Integración de sistemas WMS y ERP en SurChile SpA**  
Maximiliano Andrés Olave Bastidas  
Ingeniería Civil en Computación mención Informática  
Universidad Tecnológica Metropolitana

## Visual
Mantener la portada limpia. No agregar arquitectura ni logos técnicos aquí.

## Animación
- Título: desvanecer suave.
- Datos personales: aparecer 0,2–0,3 s después.

## Qué explicar
“Este trabajo aborda un problema de interoperabilidad entre los dos sistemas principales que soportan la operación de SurChile: Softland ERP e Invas WMS. El proyecto parte desde el diagnóstico de los procesos actuales y termina con el diseño, implementación, pruebas y piloto productivo de un middleware de integración.”

## Objetivo narrativo
Presentar el proyecto en menos de 25 segundos sin entrar todavía en tecnología.

---

# 2. Contexto del proyecto

## En pantalla
### Dos sistemas críticos, una operación compartida

**Softland ERP**  
Administración · Contabilidad · Costos · Inventario administrativo

**Invas WMS**  
Bodega · Producción · Recepción · Picking · Despacho

**Problema central:** integración limitada entre ambos sistemas.

## Visual
Dos tarjetas grandes enfrentadas. Entre ellas, una línea discontinua o símbolo de ruptura.  
Abajo, una frase pequeña: `La misma operación debía reflejarse en sistemas distintos.`

## Animación
1. Aparece Softland.
2. Aparece Invas.
3. Aparece la línea de ruptura.
4. Se resalta **integración limitada** con el color acento.

## Qué explicar
“Softland representa principalmente la visión administrativa y contable. Invas representa la ejecución operacional en bodega y producción. Ambos sistemas participan sobre la misma realidad de inventario, pero históricamente no existía una sincronización automática suficiente entre ellos.”

## Transición oral
“Eso obligaba a las personas a transformarse en el mecanismo de integración.”

---

# 3. Problema identificado

## En pantalla
### El usuario funcionaba como middleware

**Impacto operacional**
- Doble registro.
- Reprocesos manuales.
- Demoras de actualización.

**Impacto en la información**
- Diferencias de inventario.
- Desacoples de OT/OS.
- Menor trazabilidad de costos y movimientos.

### Evidencia de línea base
`+29 % a +47 %` de discrepancia promedio en SKUs representativos.  
Casos históricos `30–40 %` y extremos `≥120 %`.

## Visual
Centro: una silueta de usuario entre Softland e Invas con flechas manuales.  
A los lados: dos bloques de consecuencias.  
Abajo: una banda pequeña con las cifras.

## Animación
1. Sistemas.
2. Usuario en el centro.
3. Flechas manuales.
4. Consecuencias.
5. Cifras de línea base al final.

## Qué explicar
“El principal problema no era solamente que existieran dos sistemas. El problema era que el traspaso dependía del registro humano. Eso generaba doble digitación, cierres no sincronizados y diferencias de stock. En la línea base levantada se observaron discrepancias promedio entre 29 % y 47 % en los SKUs representativos, además de antecedentes históricos de 30–40 % y casos extremos superiores al 100 %.”

## Precaución
Aclarar que la línea base tiene carácter diagnóstico/estimativo y no corresponde a una auditoría contable.

---

# 4. Objetivo y alcance

## En pantalla
### Objetivo
**Desarrollar, documentar y validar un middleware bidireccional Softland ↔ Invas.**

### Qué debía resolver
`XML ↔ JSON` · Validación · Sincronización · Trazabilidad · Idempotencia

### Procesos priorizados
Recepción · Producción · Consumos/devoluciones · PT · Despacho

## Visual
Un círculo central “Middleware” rodeado de cinco capacidades breves.

## Animación
- Objetivo aparece primero.
- Capacidades alrededor del middleware una a una.
- Procesos aparecen en una franja inferior.

## Qué explicar
“El objetivo no fue reemplazar Softland ni Invas. Fue desarrollar una capa intermedia capaz de interpretar los contratos de ambos, validar la información y sincronizar eventos operacionales y administrativos de forma controlada.”

---

# 5. AS-IS → TO-BE

## En pantalla
### Antes
`Softland → Persona → registro manual → Invas`

**Duplicidad · Demora · Error · Baja trazabilidad**

### Después
`Softland ↔ Middleware ↔ Invas`

**Automatización · Validación · Trazabilidad · Control de duplicidad**

## Visual
Mitad izquierda “AS-IS”, mitad derecha “TO-BE”.  
AS-IS: flujo quebrado y más pasos.  
TO-BE: tres bloques alineados y una ruta limpia.

## Animación
**Etapa 1:** mostrar únicamente AS-IS.  
**Etapa 2:** atenuar AS-IS y construir TO-BE.  
**Etapa 3:** resaltar el middleware.

### Opción visual avanzada
Duplicar la diapositiva y usar una transición tipo **Match & Move** para transformar visualmente el flujo AS-IS en TO-BE.

## Qué explicar
“Durante TT-I primero levanté los procesos AS-IS. Luego, al diseñar los TO-BE, la diferencia esencial fue retirar al usuario del rol de replicar información. El middleware pasa a asumir la transformación, validación y transferencia, mientras las áreas continúan trabajando sobre los sistemas que ya conocen.”

---

# 6. Procesos TO-BE integrados

## En pantalla
### Recepción
`OC Softland → ASN Invas → Recepción física → RE Softland`

### Producción
`OT → picking/consumo MP → devolución → declaración PT → ERP`

### Despacho
`NV/OD Softland → OS Invas → picking → entrega → EN Softland`

## Visual
Tres carriles horizontales con iconos y flechas. No usar BPMN completo en miniatura; usar una simplificación basada en los BPMN TO-BE del informe.

## Animación
1. Carril Recepción.
2. Carril Producción.
3. Carril Despacho.
4. Al final, resaltar los puntos donde el middleware cruza información entre ERP/WMS.

## Qué explicar
“El middleware no corresponde a un único endpoint. La solución cubre distintos gatillos de negocio. En recepción, Softland origina la compra y WMS registra la recepción física; luego la recepción real vuelve al ERP. En producción, la OT y los materiales generan movimientos en ambos sentidos. En despacho ocurre algo similar: Softland origina la necesidad y WMS ejecuta físicamente el picking y la entrega.”

## Transición oral
“Una vez definidos estos procesos, necesitaba una arquitectura común que soportara todos estos gatillos.”

---

# 7. C4 — Contexto del sistema

## En pantalla
### Middleware de integración dentro del ecosistema SurChile

**Softland ERP** ⇄ **Middleware AWS** ⇄ **Invas WMS**

Actores:
- Administración / Contabilidad.
- Bodega / Producción / Despacho.
- TI.

## Visual
C4 Nivel 1 simplificado:
- Middleware en el centro.
- Softland a la izquierda.
- Invas a la derecha.
- Personas/áreas en el perímetro.
- Las flechas indican quién usa qué sistema y qué sistemas intercambian información.

## Animación
1. Middleware.
2. Softland e Invas.
3. Actores.
4. Relaciones.

## Qué explicar
“Este diagrama muestra el sistema desde el nivel de contexto. Softland conserva la responsabilidad administrativa y contable; Invas conserva la operación física; y el middleware es un sistema adicional cuya responsabilidad es la interoperabilidad. Los usuarios no interactúan directamente con el middleware en su operación cotidiana: el beneficio se refleja en que ambos sistemas reciben información coherente sin doble digitación.”

## Mensaje técnico importante
“El proyecto desacopla la interoperabilidad de la lógica propia de cada producto comercial.”

---

# 8. Arquitectura técnica AWS

## En pantalla
### Dos direcciones, una arquitectura común

#### Softland → Invas
`Softland XML → S3 → Lambda → validación / transformación → Invas JSON`

#### Invas → Softland
`Invas JSON → API Gateway → Lambda → SNS → Lambda handler → XML → S3 → Softland`

**Transversal:** DynamoDB = idempotencia · CloudWatch = trazabilidad/observabilidad

## Visual
Dos carriles paralelos.
- Carril superior: Softland → Invas.
- Carril inferior: Invas → Softland.
- DynamoDB y CloudWatch en una banda lateral/transversal.
- AWS representado como un contenedor visual central, no como un collage de logos.

## Animación
### Construcción 1 — Entrada Softland
1. Softland.
2. Documento XML.
3. S3.
4. Lambda.
5. Validación/transformación.
6. Invas.

### Construcción 2 — Entrada Invas
1. Invas.
2. JSON.
3. API Gateway.
4. Lambda App.
5. SNS.
6. Lambda handler.
7. XML/S3.
8. Softland.

### Construcción 3 — Controles transversales
- DynamoDB.
- CloudWatch.

### Animación recomendada
`Aparecer` en nodos + `Barrido` de izquierda a derecha en flechas.  
Evitar animar todos los logos por separado con movimientos distintos.

## Qué explicar
“La arquitectura es serverless y bidireccional. En el sentido Softland hacia Invas, el archivo XML se deposita en S3 y activa Lambda. La función lee el documento, aplica validaciones y reglas, controla el identificador y transforma la información al JSON requerido por Invas. En el sentido inverso, Invas envía eventos JSON mediante listeners expuestos por API Gateway. Lambda procesa el evento y SNS distribuye el tipo de transacción al handler correspondiente. Finalmente se genera el XML que Softland espera y se deja en S3 para su procesamiento.”

“DynamoDB no almacena el negocio completo: se utiliza para controlar identificadores e idempotencia. CloudWatch entrega evidencia técnica y permite reconstruir el procesamiento.”

## Preguntas probables
- ¿Por qué arquitectura serverless?
- ¿Por qué SNS?
- ¿Por qué no SQS?
- ¿Qué pasa si Softland está caído?
- ¿Dónde se controla la duplicidad?

---

# 9. Secuencia E2E — Declaración de Producto Terminado

## En pantalla
`Operación en Invas`
→ `Evento JSON`
→ `API Gateway`
→ `Lambda App`
→ `Validación SKU/OT`
→ `SNS`
→ `Handler PT`
→ `XML AJ/EOT`
→ `S3`
→ `Softland`

Abajo: `CloudWatch + DynamoDB acompañan todo el flujo.`

## Visual
Diagrama de secuencia simplificado con 6–8 columnas como máximo. Para no saturar, combinar “validación + DynamoDB” y “XML + S3” en nodos compuestos si es necesario.

## Animación
El flujo debe aparecer **paso a paso con cada clic**.  
Cuando se llega a la validación, detenerse brevemente y resaltar ese bloque.  
Al final, mostrar una línea de trazabilidad que conecte evento → logs → XML → Softland.

## Qué explicar
“Para aterrizar la arquitectura, este es un caso real de extremo a extremo. La declaración de PT nace en Invas. El evento llega a API Gateway y Lambda valida primero que la operación sea coherente; por ejemplo, que el SKU informado corresponda a la OT. Luego se deriva al procesamiento correspondiente, se transforma al documento esperado por Softland y queda disponible para que el ERP lo procese.”

“Si el mismo evento es reenviado, la clave de idempotencia permite identificar que ya fue procesado y evita generar un movimiento duplicado.”

## Por qué usar este caso
Es un buen ejemplo porque reúne validación de negocio, transformación JSON→XML, SNS, idempotencia, S3 y trazabilidad.

---

# 10. Controles de ingeniería

## En pantalla
### La integración no sólo transforma formatos

**Validación**  
SKU · OT · UOM · Bodega · Fechas

**Idempotencia**  
Evita reprocesar el mismo evento.

**Errores y reproceso**  
Errors · logs · reintento controlado.

**Trazabilidad**  
CloudWatch · XML · Azure Logs · documento destino.

## Visual
Cuatro tarjetas cuadradas conectadas a un nodo central “Middleware confiable”.

## Animación
Cada tarjeta aparece al explicar su responsabilidad.  
Última animación: todas convergen sobre el nodo central.

## Qué explicar
“Transformar XML a JSON no era suficiente. El riesgo real está en generar movimientos incorrectos o duplicados. Por eso incorporé validaciones técnicas y de negocio, idempotencia y rutas de error. Además, la evidencia del procesamiento queda distribuida entre CloudWatch, los XML generados, las rutas S3 y los logs de Softland.”

---

# 11. Estrategia de pruebas

## En pantalla
### Desde función aislada hasta integración real

`Unitarias / funcionales`
→ `Transformación XML↔JSON`
→ `Integración E2E`
→ `Reconciliación`
→ `Idempotencia / errores`
→ `Rendimiento / resiliencia`
→ `Piloto productivo`

## Visual
Una escalera o pipeline ascendente de madurez de pruebas.

## Animación
Aparecer cada etapa desde izquierda a derecha.  
El “Piloto productivo” aparece al final con el color de acento.

## Qué explicar
“Las pruebas se organizaron de forma progresiva. Primero se validaron funciones y transformaciones. Luego se probó el flujo extremo a extremo y la reconciliación entre ambos sistemas. Después se verificaron condiciones como duplicidad, error, reproceso, rendimiento y resiliencia. Finalmente, los flujos seleccionados se activaron en un piloto con datos reales.”

---

# 12. Evidencia E2E

## En pantalla
### Una transacción puede reconstruirse de extremo a extremo

`1. CloudWatch — evento recibido y procesado`
`2. XML — documento generado`
`3. Azure Logs / Softland — procesamiento en ERP`
`4. Documento destino — movimiento confirmado`

## Visual
Cuatro capturas reales o mockups de evidencia en secuencia, unidas por una línea temporal.  
Idealmente utilizar capturas del informe de las pruebas de Declaración PT.

## Animación
Mostrar una captura por clic.  
Al final, una marca `E2E validado`.

## Qué explicar
“Una de las validaciones importantes fue no conformarnos con que Lambda terminara sin error. Para considerar una transacción correcta se debía seguir la evidencia hasta el sistema destino. Por eso durante las pruebas revisé CloudWatch, el XML generado, los logs de Softland y finalmente el movimiento resultante.”

---

# 13. Piloto productivo y estabilización

## En pantalla
### QA → Producción controlada → estabilización

- Activación gradual de flujos.
- Datos reales.
- Monitoreo de CloudWatch, S3 y Azure Logs.
- Ajustes de reglas detectados en operación.
- Separación entre errores técnicos y errores de negocio.

## Visual
Timeline horizontal de tres fases: QA / Piloto / Estabilización.

## Animación
El timeline avanza de izquierda a derecha.  
Los incidentes/ajustes aparecen como pequeños hitos, no como alertas dramáticas.

## Qué explicar
“El paso a producción fue controlado. Durante la estabilización se detectaron situaciones que no eran necesariamente fallas del middleware, como stock insuficiente o datos operacionales inconsistentes. Una consecuencia importante del proyecto fue precisamente poder diferenciar un error técnico de integración de un rechazo originado en reglas o datos de negocio.”

---

# 14. Resultados AS-IS vs TO-BE

## En pantalla
| AS-IS | TO-BE |
|---|---|
| Doble digitación | Sincronización automática |
| Baja trazabilidad | Seguimiento E2E |
| Riesgo de duplicados | Idempotencia |
| Reproceso difícil | Error identificable/reprocesable |
| 30–60 min de traspaso manual | Generalmente pocos minutos, ~≤5 min* |

`*Estimación operacional no instrumentada.`

## Visual
Comparación “antes / después” limpia.  
El lado TO-BE puede usar el color de acento sólo en títulos o indicadores positivos.

## Animación
Mostrar primero AS-IS.  
Después revelar cada correspondencia TO-BE en paralelo.

## Qué explicar
“Los resultados observados muestran una reducción de la carga manual, menor exposición a duplicidades y mayor trazabilidad. En términos operacionales, actividades de traspaso que podían requerir entre 30 y 60 minutos pasaron normalmente a completarse en pocos minutos, generalmente dentro de un máximo cercano a 5 minutos. Es importante precisar que esta cifra es una estimación operacional del piloto y no una métrica instrumentada automáticamente.”

“También es importante destacar que el middleware no elimina discrepancias originadas por datos maestros incorrectos, stock insuficiente o configuraciones propias de los sistemas. Lo que sí hace es volver esos casos identificables y trazables.”

---

# 15. Conclusiones y continuidad

## En pantalla
### Conclusiones
1. La interoperabilidad Softland–Invas es **técnicamente viable**.
2. El middleware reduce la dependencia del **registro manual**.
3. La solución incorpora **validación, idempotencia y trazabilidad**.
4. El piloto confirmó el funcionamiento en **condiciones reales**.

### Continuidad
Observabilidad más avanzada · automatización CI/CD · resiliencia/encolado donde el volumen lo justifique.

## Visual
Cuatro conclusiones como hitos. Trabajo futuro en una franja inferior más tenue.

## Animación
Conclusiones una a una.  
Trabajo futuro aparece únicamente al final.

## Qué explicar
“El resultado principal del proyecto es demostrar que la interoperabilidad era viable y que podía implementarse sin reemplazar los sistemas existentes. El middleware redujo la dependencia de tareas manuales y agregó mecanismos de control que antes no existían. El piloto permitió validar la solución en condiciones reales y también identificar límites: la integración puede controlar cómo se transmite un dato, pero no puede garantizar por sí sola que el dato maestro de origen sea correcto.”

“Como evolución, la arquitectura puede incorporar mayor automatización de despliegue, observabilidad y mecanismos adicionales de resiliencia cuando las métricas de volumen y criticidad lo justifiquen.”

---

# 16. Cierre

## En pantalla
**De procesos fragmentados a una integración bidireccional, trazable y validada.**

Gracias  
Preguntas

## Animación
Frase final primero.  
“Preguntas” aparece después de una breve pausa.

## Qué explicar
“En síntesis, el proyecto parte desde un problema operacional concreto, lo modela, diseña una solución de integración, la implementa y finalmente la valida en un entorno real. Gracias.”

---

# Orden recomendado de las diapositivas

1. Portada
2. Contexto
3. Problema + línea base
4. Objetivo y alcance
5. AS-IS → TO-BE
6. Procesos TO-BE integrados
7. C4 Contexto
8. Arquitectura AWS
9. Secuencia E2E — Declaración PT
10. Controles de ingeniería
11. Estrategia de pruebas
12. Evidencia E2E
13. Piloto y estabilización
14. Resultados AS-IS vs TO-BE
15. Conclusiones y continuidad
16. Preguntas

# Reglas para la narración

- No leer la diapositiva.
- Cada slide debe responder una pregunta concreta.
- La arquitectura se explica por responsabilidad, no enumerando logos AWS.
- Cuando aparezca una cifra no instrumentada, decirlo explícitamente.
- Separar siempre `error técnico` de `error de negocio`.
- Defender las decisiones según contexto real de SurChile, no como si fueran una arquitectura universal.
- En preguntas sobre SQS: explicar que la arquitectura implementada priorizó simplicidad y volumen real; el encolado queda como evolución justificable por métricas, no como omisión desconocida.

# Fuentes dentro del TT

- Línea base de discrepancias: sección 11–12.
- Procesos TO-BE: sección 18 / Figuras 6–9 (o equivalentes en la versión final).
- Arquitectura general: sección 19 / Arquitectura general propuesta.
- Flujos Softland→Invas e Invas→Softland: sección 19.
- Idempotencia: sección 19 y validación de pruebas.
- MVP API Gateway + SNS + Lambda: sección 21.
- Pruebas E2E: sección 23.
- Rendimiento/resiliencia: sección 25.
- Piloto y estabilización: secciones 28–29.
- Resultados finales: sección 29–30.

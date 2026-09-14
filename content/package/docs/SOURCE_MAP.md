# SOURCE MAP — Trazabilidad académica

## Fuente principal

**Informe final más reciente:** `TT_Maximiliano_Olave_PRELIMINARES_SIN_NUMERACION(1).docx` / equivalente PDF final.

> El archivo final no está físicamente incluido en este ZIP porque en esta sesión se encontraba en la biblioteca de archivos, no montado en el filesystem. El contenido de este paquete fue sintetizado a partir de esa versión final. Si Codex necesita consultar el documento original, añadirlo manualmente a `sources/final/`.

## Capítulos

| Tema web | Fuente final |
|---|---|
| Contexto/problema | Introducción + Cap. 1 |
| Objetivos/alcance | Cap. 2 |
| AS-IS | Cap. 3 |
| Requisitos | Cap. 4 |
| TO-BE | Cap. 5 |
| Arquitectura | Cap. 6 |
| MVP | Cap. 7 |
| Pruebas | Cap. 8 |
| Piloto/resultados | Cap. 9 |
| Conclusiones/futuro | Cap. 10 |

## Figuras útiles del informe final

| Figura | Página informe | Uso en web |
|---:|---:|---|
| 1 | 11 | Referencia AS-IS recepción |
| 2 | 13 | Referencia AS-IS OT |
| 3 | 15 | Referencia AS-IS producción |
| 4 | 18 | Referencia AS-IS despacho |
| 5 | 26 | Causas raíz / opcional backup |
| 6 | 37 | Referencia TO-BE recepción |
| 7 | 41 | Referencia TO-BE OT |
| 8 | 46 | Referencia TO-BE PT/devoluciones |
| 9 | 49 | Referencia TO-BE despacho |
| 10 | 54 | Arquitectura general |
| 11 | 56 | Flujo Softland → Invas |
| 12 | 58 | Flujo Invas → Softland |
| 13 | 61 | Idempotencia DynamoDB |
| 14 | 70 | MVP API Gateway/SNS/Lambda |
| 15 | 73 | Mapeos Invas → Softland |
| 16 | 75 | Mapeos Softland → Invas |
| 17 | 86 | Pruebas/observabilidad |
| 18 | 101 | Piloto: Azure Softland consumos |
| 19 | 102 | Piloto: CloudWatch Declarar PT |
| 20 | 102 | Procecced / Errors |
| 22 | 123 | Mapa contratos XML/JSON |
| 24 | 147 | C4 Nivel 1 |
| 25 | 149 | C4 Nivel 2 |
| 26 | 172 | Despliegue controlado |
| 27 | 177 | Rollback |
| 31 | 196 | E2E PT: CloudWatch |
| 32 | 197 | E2E PT: XML creado |
| 33 | 197 | E2E PT: Azure Logs |
| 34 | 200 | Reconciliación 120 unidades |
| 35 | 202 | Error: CloudWatch |
| 36 | 202 | Error: archivo Errors |
| 37 | 203 | Error: Azure Softland |
| 38 | 204 | Idempotencia: ya procesado |
| 39 | 204 | Idempotencia: reenvío |
| 40 | 204 | Idempotencia: ignorado |

## Tablas útiles del informe final

| Tabla | Página | Uso |
|---:|---:|---|
| 4 | 22 | Línea base 6 meses |
| 9 | 33 | Trazabilidad diagnóstico→requisitos→solución→validación |
| 10 | 53 | Componentes arquitectura |
| 12 | 59 | Estrategia por proceso |
| 16 | 67 | Alcance MVP |
| 17 | 68 | MVP vs piloto vs futuro |
| 18 | 69 | Componentes desarrollados MVP |
| 19 | 72 | Mapeos principales |
| 23–30 | 80–91 | Pruebas |
| 31–40 | 94–106 | Piloto/resultados |
| 60 | 145 | AS-IS vs TO-BE |
| 65–78 | 158–170 | Contratos/reglas/errores/trazabilidad |
| 93 | 191 | Integración AWS vs E2E |
| 96–97 | 194 | Resiliencia/reintentos |
| 98–102 | 195–204 | Casos de prueba/reconciliación/idempotencia |

## Documentos preliminares incluidos

`sources/legacy/Avance 1 _ TT1 - Olave Maximiliano.pdf`  
Útil para BPMN AS-IS e entrevistas.

`sources/legacy/Anteproyecto TT1.pdf`  
Útil para evolución metodológica, pero **NO usar su arquitectura planificada como implementación final**. Incluye SQS/Step Functions como recursos previstos; el informe final los excluye de la implementación actual.

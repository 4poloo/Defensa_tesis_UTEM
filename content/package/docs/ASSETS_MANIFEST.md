# ASSETS MANIFEST

## Activos incluidos

### `assets/reference/utem-logo.png`
Logo/cabecera UTEM extraído del Avance 1. Usar como referencia o en portada si la calidad proyectada es suficiente.

### BPMN AS-IS de referencia

- `as-is-recepcion.png`
- `as-is-ot.png`
- `as-is-produccion.png`
- `as-is-despachos.png`

Estos BPMN sirven para validar que la simplificación animada respeta el proceso original. **No se recomienda incrustarlos pequeños en la presentación final**, porque su densidad reduce legibilidad.

## Capturas que faltan y conviene exportar desde el informe final

Crear `assets/evidence/` y añadir idealmente:

1. `fig31-e2e-pt-cloudwatch.png` — Figura 31, p.196
2. `fig32-e2e-pt-xml.png` — Figura 32, p.197
3. `fig33-e2e-pt-azure.png` — Figura 33, p.197
4. `fig34-reconciliacion-120.png` — Figura 34, p.200
5. `fig35-error-cloudwatch.png` — Figura 35, p.202
6. `fig36-error-errors-folder.png` — Figura 36, p.202
7. `fig37-error-azure.png` — Figura 37, p.203
8. `fig38-idempotencia-procesado.png` — Figura 38, p.204
9. `fig39-idempotencia-reenvio.png` — Figura 39, p.204
10. `fig40-idempotencia-ignorado.png` — Figura 40, p.204
11. `fig18-piloto-azure-consumos.png` — Figura 18, p.101
12. `fig19-piloto-cloudwatch-pt.png` — Figura 19, p.102
13. `fig20-piloto-processed-errors.png` — Figura 20, p.102

## Diagramas del informe que sirven como referencia de reconstrucción

No hace falta incrustarlos como imágenes si serán reconstruidos con Archify/SVG:

- Fig. 6–9: TO-BE
- Fig. 10: arquitectura general
- Fig. 11–12: flujos bidireccionales
- Fig. 13: idempotencia
- Fig. 14: MVP API Gateway/SNS/Lambda
- Fig. 24–25: C4

## Política de imágenes

- Preferir capturas reales para evidencia.
- Preferir SVG/Archify para procesos y arquitectura.
- No generar screenshots falsos de AWS/Softland/Invas.
- Si se usa una captura con datos sensibles, anonimizar identificadores que no aporten a la defensa.

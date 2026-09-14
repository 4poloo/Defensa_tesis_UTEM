# Validación de la presentación · 2026-09-11

## Implementación y regresión

- Las 16 secciones están implementadas; se conserva el recorrido original y se añaden procesos, arquitectura, transacción PT, controles, pruebas, evidencia, piloto, resultados, conclusiones y preguntas.
- TypeScript + Vite: build aprobado después de las correcciones.
- Reducer: 8 pruebas aprobadas, con recorrido de todas las secciones en ambos sentidos, límites, reinicio y conservación de progreso.
- `test:browser`: aprobado contra desarrollo (:5173). Primeras cinco secciones en 1366×768, 1440×900 y 1920×1080; teclado, Space sobre botón, diálogos, fullscreen, scroll y motion normal. Cero errores JS y solicitudes externas.
- `test:motion`: aprobado contra producción local (:4173): 64 recorridos y 368 estados hacia delante, además del retroceso por cada estado. Las 16 secciones en tres resoluciones con movimiento reducido y 1366×768 con movimiento normal. Repetición, pulsaciones rápidas, índice, evidencias y visores aprobados; cero errores JS y solicitudes externas. Recibo: `artifacts/motion-check.json`.
- Integridad: 14 imágenes PNG de 13 figuras coinciden byte por byte con los medios del DOCX original. Recibo en `artifacts/evidence-check.json`.
- Aceite STIHL 500 cc aplicado en datos y copias de trabajo; sin coincidencias del nombre anterior en src o MD/JSON/CSV del paquete. El DOCX no se altera.

## Revisión de motion

| Before | After | Why |
| --- | --- | --- |
| Procesos agrupados en nodos 2 y 4 | Cinco nodos consecutivos por proceso | Una pulsación corresponde a un nodo |
| AWS avanzaba 2–3 nodos juntos | Cuatro componentes de ida, siete de retorno, controles separados | Cada componente tiene su explicación |
| Pruebas y piloto agrupaban hitos | Ocho y siete estados respectivos | Avance y retroceso predecibles |
| Teclas repetidas retornaban sin cancelar el navegador | Cancelación del scroll nativo, sin repetir la acción | Mantener pulsado no desplaza ni salta la sección |
| PT ocultaba cinco mensajes al cambiar de tramo | Diez mensajes visibles, título compacto y SVG a ancho completo | Ver todo el E2E y avanzar un mensaje por pulsación |
| Archify llamaba un método ausente al suspender motion | Comprobación del método en el generador local | Abrir/cerrar visores sin error de JavaScript |

Las capturas de la aplicación revisadas incluyen procesos, arquitectura, PT, estrategia de pruebas, evidencia y resultados. No se ocultó contenido para aprobar límites de pantalla. La secuencia de duplicado es una alternativa explícita, no una nueva ejecución exitosa.

## Archify

Los cuatro HTML se regeneraron después del parche local documentado en `ARCHIFY_LOCAL_PATCH.md`. Cada entrega pasó **9/9 showcase**, cero errores y cero avisos. Los hashes actuales están en los recibos `artifacts/archify-delivery.json`, `aws-ida-delivery.json`, `aws-vuelta-delivery.json` y `pt-delivery.json`. Sustituyen los hashes de la primera entrega.

La comprobación automática de navegador de los cuatro artefactos pasó en 1440×900, 1600×1000, 1920×1080 y 2048×1320; imágenes claro/oscuro disponibles en `artifacts/archify/`. Recibos `*-browser.json` vinculados por SHA-256 a cada HTML. Los sidecars están fuera de public/dist.

La revisión visual distingue estos resultados:

- Integración y secuencia PT: lectura y composición aprobadas en las capturas inspeccionadas.
- Vías AWS independientes: texto y conexiones sin cortes; queda exceso de espacio inferior al abrir como página independiente en pantallas altas. Por ese criterio de composición, su revisión visual standalone se registra como `failed`, aunque la validación formal y la de navegador pasaron. En la aplicación se abren centradas dentro del modo Present; no se presenta esto como aprobación de la composición standalone.
- Los controles nativos del visor están en inglés por el fallback del generador. La narrativa de los diagramas está en español.

Detalle de hashes y observaciones en `artifacts/archify-review.json`. La comprobación automatizada no sustituye a la revisión visual ni prueba el control físico.

## Pendientes explícitos

- PDF de respaldo y ensayo completo para ajustar duración.
- Cotejo final de todas las referencias/paginación con el DOCX definitivo.
- Prueba en el equipo, proyector y control láser del autor; hasta ahora se simularon códigos de teclado.
- Composición de las dos vistas AWS standalone en pantallas altas, si se utilizan fuera del modal de presentación.

No se realizaron llamadas productivas, despliegues, nuevas mediciones de rendimiento ni pruebas del dispositivo físico.

## Ajuste posterior de página 09 y velocidad

Se restauró la secuencia completa por indicación del usuario. Los mensajes pendientes y anteriores se conservan visibles; el actual destaca. Encabezado compacto y sin el límite de 35vh del SVG para reservar espacio al diagrama completo. Se revisó visualmente 1366×768.

Archify inicia cada elemento a intervalos de 4 s y lo anima durante 3,2 s; la pasada de PT dura 31,2 s. Los cuatro HTML se regeneraron y pasaron 9/9 showcase y visual-check. La geometría no cambió. El test focalizado `scripts/check-pt.mjs` verifica los diez mensajes presentes en los 12 estados, retroceso, encaje en tres resoluciones y velocidad/reduced motion; **Aprobado contra el build local (:4173): 36 estados, retroceso, tres resoluciones, movimiento reducido y cero errores JS.** Recibo: `artifacts/pt-check.json`.

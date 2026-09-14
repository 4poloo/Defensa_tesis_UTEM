# Parche local de Archify

Error reproducido en Chromium con motion normal al cerrar visores sin capítulos guiados:

```text
Archify.guidedViews.isPlaying is not a function
```

En `tools/archify/archify/assets/template.html`, `guidedViews` retorna un objeto sin `isPlaying` cuando no hay `meta.views`. El gobernador de motion intentaba llamar ese método al pausar/suspender. Se corrigió la condición antes de regenerar los cuatro HTML mediante `validate` y `deliver`:

```diff
- if (paused && lastEffectivePaused !== true && Archify.guidedViews && Archify.guidedViews.isPlaying()) {
+ if (paused && lastEffectivePaused !== true && Archify.guidedViews && typeof Archify.guidedViews.isPlaying === 'function' && Archify.guidedViews.isPlaying()) {
```

No se alteraron las APIs de las vistas guiadas, ni los specs para ocultar el error, ni los HTML finales a mano. Es una corrección local; no se ha publicado upstream. Al sustituir la copia del generador, comprobar si ya está corregido antes de reaplicar. `tools/archify/` está excluido de Git: conservar esta nota y respaldar el generador cuando se transfiera el proyecto. La regresión es abrir/cerrar los cuatro visores con motion normal y comprobar cero `pageerror` en los scripts de navegador.

## Ritmo de exposición

Por solicitud del usuario, la traza ambiental usa 3,2 s por elemento y un inicio cada 4 s (antes 160 ms entre inicios). CSS `html[data-ambient-motion="running"] svg[data-animation="trace"] [data-animate]`, tanto edge como node; las duraciones del preset signal-flow también quedan en 3,2 s. Se regeneraron los cuatro HTML con el mismo spec. PT tiene ocho aristas, por lo que la pasada tarda 31,2 s. No cambia geometría, contenido, los pasos manuales de React ni el exportador WebM. `prefers-reduced-motion` conserva animación desactivada.

La regresión de velocidad y secuencia completa está en `scripts/check-pt.mjs`. Este parche de ritmo debe conservarse junto con el guard de `guidedViews.isPlaying` al transferir o reemplazar el generador.

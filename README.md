# Defensa TT · Integración WMS ↔ ERP

Presentación web local de Maximiliano Andrés Olave Bastidas, UTEM, 2026.

## Ejecutar

Requiere Node 22.12+ o 24 y npm.

```bash
npm install
npm run dev
```

Abrir http://127.0.0.1:5173. El servidor escucha exclusivamente en el equipo local.

```bash
npm run build
npm run preview
```

El build en `dist/` incluye fuentes, imágenes y el diagrama Archify. Usar un servidor estático local; abrir `index.html` con `file://` no es el modo de ejecución soportado. La instalación inicial de dependencias sí necesita internet.

## Presentación actual

- 16 secciones: problema, transformación, procesos, arquitectura AWS, transacción PT, controles, pruebas, evidencia, piloto, resultados y conclusiones.
- Pasos internos, navegación por teclado y scroll, ayuda, reinicio y pantalla completa.
- SVG y Framer Motion con pasos de un nodo por pulsación; cuatro diagramas Archify explorables.
- Índice completo y 13 figuras originales del informe (14 imágenes) ampliables.
- Fuentes locales, contraste alto y respeto de `prefers-reduced-motion`.

Teclas: `↓` / `Av Pág` / Espacio avanzan un paso; `↑` / `Re Pág` retroceden un paso; `←` / `→` cambian directamente de sección; `1–9` eligen sección; `I` abre el índice completo; `R` reinicia; `F` cambia pantalla completa; `Esc` sale/cierra; `?` abre ayuda. El espacio sobre un botón conserva su activación accesible. La navegación hacia atrás conserva el paso alcanzado anteriormente; `R` lo reinicia.

## Contenido y alcance

`content/package/` conserva las copias de trabajo del paquete recibido, con la corrección del autor: Aceite STIHL **500 cc**. El manifiesto original corresponde al paquete anterior; ver `docs/CORRECCIONES_CONTENIDO.md`. `content/sources/informe-final.docx` es la fuente académica definitiva. Estos documentos no se copian a `dist/` ni se sirven por Vite. `src/data/` contiene datos estructurados para la presentación. No se consultan APIs productivas ni AWS.

Las 16 secciones están implementadas. Quedan el PDF de respaldo, cotejo final de referencias/paginación y ensayo con el equipo, proyector y control físico. Las cifras de línea base conservan su carácter diagnóstico, no de auditoría.

Los documentos originales DOCX y PDF de `content/sources/` y `content/package/sources/legacy/` se conservan solo localmente y están excluidos de Git porque contienen datos personales. No son necesarios para ejecutar o compilar la presentación. Para ejecutar `scripts/check-evidence.py`, restaurar localmente `content/sources/informe-final.docx` desde la copia del autor.

## Archify

Se incorporó una copia local de `tt-a1i/archify` en `tools/archify/` (descargada desde `main`; versión declarada por la skill 2.17). El HTML generado es independiente de esa herramienta en runtime. Conserva su licencia MIT y sus avisos de tipografía embebida. Fuente: https://github.com/tt-a1i/archify.

- Especificaciones: `content/diagrams/` (integración, ida AWS, retorno AWS y secuencia PT).
- Resultados: `public/diagrams/` (cuatro HTML).
- Acceso: transformación, ecosistema, arquitectura y declaración PT.
- El contenido está en español; controles nativos del visor Archify y su `lang` usan inglés, idioma de respaldo del generador.
- Archify se usa como herramienta de generación local, no como paquete React ni servicio remoto.
- Corrección local de `guidedViews.isPlaying` documentada en `docs/ARCHIFY_LOCAL_PATCH.md`; respaldar el generador al transferir el proyecto porque está excluido de Git.

```bash
ARCHIFY_UPDATE_CHECK_DISABLED=1 node tools/archify/archify/bin/archify.mjs validate architecture content/diagrams/integracion.architecture.json --quality showcase --json
ARCHIFY_UPDATE_CHECK_DISABLED=1 node tools/archify/archify/bin/archify.mjs deliver architecture content/diagrams/integracion.architecture.json public/diagrams/integracion.html --quality showcase --json
```

## Verificación

```bash
npm test
PLAYWRIGHT_BROWSERS_PATH=/tmp/tt-web-browsers npm run test:browser
PLAYWRIGHT_BROWSERS_PATH=/tmp/tt-web-browsers npm run test:motion
python3 scripts/check-evidence.py
PLAYWRIGHT_BROWSERS_PATH=/tmp/tt-web-browsers node scripts/check-pt.mjs
```

Los comandos de navegador requieren Chromium instalado con Playwright y el servidor local activo. `TT_PREVIEW_URL` permite apuntar las mismas comprobaciones al build de producción. En otro equipo puede instalarse con `npx playwright install chromium` y omitirse `PLAYWRIGHT_BROWSERS_PATH`.

Capturas y recibos de validación se guardan en `artifacts/`. El script comprueba teclado, límites de pantalla, controles, diálogos, pantalla completa, scroll, animación normal y recursos de runtime locales.

## Continuar con otra IA

Pedirle que lea primero [AGENT.md](AGENT.md), que contiene el contexto completo, las fuentes, las skills, el contrato de navegación, los pasos de cada sección y las instrucciones de validación. El estado de las comprobaciones está en [docs/VALIDACION.md](docs/VALIDACION.md).

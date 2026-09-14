# TT Web Defense — Codex Package

## Propósito

Este paquete contiene la especificación funcional, contenido académico, datos, guías de diagramas, narrativa y activos de referencia para construir una **presentación web interactiva** de la defensa del Trabajo de Título:

**Integración de sistemas WMS y ERP en la empresa SurChile SpA**

Autor: **Maximiliano Andrés Olave Bastidas**  
Carrera: **Ingeniería Civil en Computación mención Informática**  
Universidad: **Universidad Tecnológica Metropolitana (UTEM)**  
Año: **2026**

La aplicación no debe comportarse como una landing page comercial. Debe funcionar como una **presentación técnica interactiva / scrollytelling**, en formato 16:9, con navegación por teclado, pasos internos por sección y diagramas animados.

---

## Orden de lectura obligatorio para Codex

1. `docs/CONTENT_MASTER_TT_WEB.md` — fuente de verdad del contenido que irá en pantalla.
2. `docs/DIAGRAMAS_Y_MOTION.md` — diagramas a implementar y cómo animarlos.
3. `docs/SOURCE_MAP.md` — trazabilidad hacia capítulos, tablas y figuras del informe final.
4. `docs/ASSETS_MANIFEST.md` — imágenes disponibles y capturas pendientes.
5. `docs/SPEC_PRESENTACION_TT_WEB.md` — especificación técnica/front-end.
6. `docs/CODEX_IMPLEMENTATION_PLAN.md` — plan de implementación por iteraciones.
7. `data/*.json` — datos estructurados para gráficos, procesos y diagramas.
8. `diagram_specs/*.json` — nodos, aristas y pasos de animación propuestos.

---

## Reglas de contenido no negociables

- El **informe final** es la fuente académica principal. Si un documento preliminar contradice al informe final, usar el informe final.
- **SQS y Step Functions NO forman parte de la implementación final defendida.** Aparecieron en el anteproyecto como posibilidad, pero el informe final declara explícitamente que se priorizó una arquitectura más simple y que esos servicios no forman parte de la implementación actual.
- La arquitectura implementada utiliza principalmente **API Gateway, Lambda, SNS, S3, DynamoDB y CloudWatch**, además de mecanismos complementarios de intercambio/monitoreo de archivos.
- La cifra `30–60 min → pocos minutos / ~5 min` es una **referencia operacional**, no un benchmark instrumentado ni un SLA.
- Las pruebas de rendimiento fueron una **validación operacional sobre cargas representativas**, no un benchmark formal de alto volumen.
- El middleware mejora trazabilidad, reduce duplicidad y reduce intervención manual, pero **no corrige automáticamente datos maestros incorrectos, stock insuficiente, diferencias históricas ni reglas internas de Softland**.
- No exponer RUT, dirección, teléfono, correo personal ni otros datos de la página de autorización del informe.
- No inventar porcentajes de mejora que no estén medidos.

---

## Stack recomendado

- React
- TypeScript
- Vite
- Framer Motion
- Archify para diagramas animados cuando aporte control suficiente
- SVG + Framer Motion como fallback para diagramas donde Archify limite la narrativa

La aplicación debe poder ejecutarse **offline** después del build.

---

## Estructura narrativa

```text
Problema
  ↓
AS-IS
  ↓
Objetivo
  ↓
TO-BE
  ↓
Procesos integrados
  ↓
Contexto de sistemas
  ↓
Arquitectura AWS
  ↓
Transacción E2E
  ↓
Controles de ingeniería
  ↓
Pruebas y evidencia
  ↓
Piloto
  ↓
Resultados
  ↓
Conclusiones
```

La presentación debe demostrar una historia de ingeniería, no una colección de pantallas decorativas.

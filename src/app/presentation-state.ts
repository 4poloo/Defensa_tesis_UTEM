export const sections = [
  { id: 'portada', title: 'Portada', chapter: 'Una operación compartida', maxStep: 0 },
  { id: 'contexto', title: 'Contexto', chapter: 'Dos sistemas, una operación', maxStep: 2 },
  { id: 'problema', title: 'Problema', chapter: 'El costo de la desconexión', maxStep: 2 },
  { id: 'objetivo', title: 'Objetivo', chapter: 'Una capa de interoperabilidad', maxStep: 2 },
  { id: 'transformacion', title: 'Transformación', chapter: 'Del registro manual a la integración', maxStep: 6 },
  { id: 'procesos', title: 'Procesos integrados', chapter: 'Recepción, producción y despacho', maxStep: 14 },
  { id: 'ecosistema', title: 'Contexto del sistema', chapter: 'Responsabilidades del ecosistema', maxStep: 2 },
  { id: 'arquitectura', title: 'Arquitectura AWS', chapter: 'Dos direcciones de integración', maxStep: 13 },
  { id: 'transaccion', title: 'Declaración PT', chapter: 'Una transacción de extremo a extremo', maxStep: 11 },
  { id: 'controles', title: 'Controles de ingeniería', chapter: 'Validar, proteger y rastrear', maxStep: 3 },
  { id: 'pruebas', title: 'Estrategia de pruebas', chapter: 'De la función al piloto', maxStep: 7 },
  { id: 'evidencias', title: 'Evidencia E2E', chapter: 'Comprobar el resultado en destino', maxStep: 3 },
  { id: 'piloto', title: 'Piloto y estabilización', chapter: 'De QA a operación real', maxStep: 6 },
  { id: 'resultados', title: 'Resultados', chapter: 'Qué cambió y qué se midió', maxStep: 3 },
  { id: 'conclusiones', title: 'Conclusiones', chapter: 'Viabilidad y límites de la solución', maxStep: 2 },
  { id: 'preguntas', title: 'Preguntas', chapter: 'Una integración validada y trazable', maxStep: 0 },
] as const;

export interface PresentationState { section: number; steps: number[]; revision: number }
export type PresentationAction = { type: 'next' | 'previous' | 'next-section' | 'previous-section' | 'restart' } | { type: 'goto'; section: number } | { type: 'step'; step: number };
export const initialState: PresentationState = { section: 0, steps: sections.map(() => 0), revision: 0 };

export function presentationReducer(state: PresentationState, action: PresentationAction): PresentationState {
  const { section, steps } = state;
  if (action.type === 'step') {
    if (!Number.isInteger(action.step) || action.step < 0 || action.step > sections[section].maxStep) return state;
    const updated = [...steps]; updated[section] = action.step;
    return { ...state, steps: updated };
  }
  if (action.type === 'next-section' || action.type === 'previous-section') {
    return { ...state, section: Math.max(0, Math.min(sections.length - 1, section + (action.type === 'next-section' ? 1 : -1))) };
  }
  if (action.type === 'goto') {
    if (!Number.isInteger(action.section) || action.section < 0 || action.section >= sections.length) return state;
    return { ...state, section: action.section };
  }
  const updated = [...steps];
  if (action.type === 'restart') {
    updated[section] = 0;
    return { ...state, steps: updated, revision: state.revision + 1 };
  }
  if (action.type === 'next') {
    if (steps[section] < sections[section].maxStep) updated[section]++;
    else if (section < sections.length - 1) return { ...state, section: section + 1 };
  } else {
    if (steps[section] > 0) updated[section]--;
    else if (section > 0) return { ...state, section: section - 1 };
  }
  return { ...state, steps: updated };
}

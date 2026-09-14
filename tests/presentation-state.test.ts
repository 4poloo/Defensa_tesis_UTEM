import test from 'node:test';
import assert from 'node:assert/strict';
import { initialState, presentationReducer as reduce, sections } from '../src/app/presentation-state.ts';

test('avanza primero los pasos internos y después cambia de sección', () => {
  let state = reduce(initialState, { type: 'next' });
  assert.equal(state.section, 1);
  state = reduce(state, { type: 'next' });
  assert.equal(state.section, 1);
  assert.equal(state.steps[1], 1);
  state = reduce(state, { type: 'next' });
  assert.equal(state.steps[1], 2);
  state = reduce(state, { type: 'next' });
  assert.equal(state.section, 2);
});
test('retrocede y conserva el estado de la sección anterior', () => {
  let state = reduce(initialState, { type: 'goto', section: 1 });
  state = reduce(state, { type: 'next' });
  state = reduce(state, { type: 'goto', section: 2 });
  state = reduce(state, { type: 'previous' });
  assert.equal(state.section, 1);
  assert.equal(state.steps[1], 1);
  state = reduce(state, { type: 'previous' });
  assert.equal(state.steps[1], 0);
});
test('reinicia exclusivamente la escena actual', () => {
  const state = { section: 4, steps: sections.map(s => s.maxStep), revision: 0 };
  assert.deepEqual(reduce(state,{ type:'restart' }), { section:4, steps:sections.map((s,i) => i===4?0:s.maxStep), revision:1 });
});
test('no desborda los límites de navegación', () => {
  assert.equal(reduce(initialState,{type:'previous'}).section,0);
  let state = initialState;
  for(let i=0;i<sections.reduce((sum,s)=>sum+s.maxStep+1,0)+5;i++) state=reduce(state,{type:'next'});
  assert.equal(state.section,sections.length-1);
  assert.equal(state.steps[4],6);
});
test('rechaza destinos inválidos y no modifica el estado original', () => {
  for (const section of [-1, sections.length, 0.5, NaN]) assert.equal(reduce(initialState,{type:'goto',section}),initialState);
  reduce(initialState,{type:'next'});
  assert.deepEqual(initialState.steps,sections.map(()=>0));
});
test('el cambio directo de sección omite pasos pendientes y conserva su progreso', () => {
  const state = { section: 1, steps: sections.map((_,i)=>i===1?1:0), revision: 0 };
  const next = reduce(state, { type: 'next-section' });
  assert.equal(next.section, 2);
  assert.deepEqual(next.steps, state.steps);
  assert.deepEqual(reduce(next, { type: 'previous-section' }), state);
  assert.equal(reduce(initialState, { type: 'previous-section' }).section, 0);
  assert.equal(reduce({ ...state, section: sections.length-1 }, { type: 'next-section' }).section, sections.length-1);
});

test('cada sección recorre todos los pasos, sin saltar y en ambos sentidos', () => {
  for (let section=0; section<sections.length; section++) {
    let state=reduce(initialState,{type:'goto',section});
    for (let step=1; step<=sections[section].maxStep; step++) {
      state=reduce(state,{type:'next'});
      assert.equal(state.section,section);
      assert.equal(state.steps[section],step);
    }
    for (let step=sections[section].maxStep-1; step>=0; step--) {
      state=reduce(state,{type:'previous'});
      assert.equal(state.section,section);
      assert.equal(state.steps[section],step);
    }
  }
});
test('selección de paso válida, con límites, sin alterar otras secciones', () => {
  const start=reduce(initialState,{type:'goto',section:5});
  const selected=reduce(start,{type:'step',step:10});
  assert.equal(selected.steps[5],10);
  assert.deepEqual(start.steps,initialState.steps);
  for (const step of [-1,15,0.5,NaN]) assert.equal(reduce(start,{type:'step',step}),start);
  assert.deepEqual(reduce(selected,{type:'restart'}).steps,initialState.steps);
});

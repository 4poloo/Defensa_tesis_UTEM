import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { sections } from '../src/app/presentation-state.ts';

const base = process.env.TT_PREVIEW_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch({ headless: true });
const errors = [], external = [], visits = [];
await mkdir('artifacts/screenshots/complete', { recursive: true });
try {
  for (const [width,height,motion] of [[1366,768,'reduce'],[1440,900,'reduce'],[1920,1080,'reduce'],[1366,768,'no-preference']]) {
    const context = await browser.newContext({ viewport:{width,height}, reducedMotion:motion });
    await context.route('**/*', route => {
      const url = route.request().url();
      if (url.startsWith(base) || /^(data|blob):/.test(url)) return route.continue();
      external.push(url); return route.abort();
    });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    const check = async (id,step) => {
      const index=sections.findIndex(s=>s.id===id);
      assert.equal(await page.locator('.step-progress').getAttribute('aria-label'),`Paso ${step+1} de ${sections[index].maxStep+1}`,`${id}, ${motion}`);
      assert.equal(await page.locator('.presentation-section[aria-hidden="false"]').getAttribute('id'),id);
      if (id==='procesos') {
        assert.equal(await page.locator('.flow-stop.reached').count(),step%5+1);
        assert.equal(await page.locator('.flow-stop.current').count(),1);
        assert.equal(await page.locator('.chapter-tabs button[aria-pressed="true"]').textContent(),['01Recepción','02Producción','03Despacho'][Math.floor(step/5)]);
      }
      if (id==='arquitectura') {
        const lines=page.locator('.flow-line');
        assert.equal(await lines.nth(0).locator('.reached').count(),Math.min(step,4),'Ida: un solo nodo por paso');
        assert.equal(await lines.nth(1).locator('.reached').count(),Math.max(0,Math.min(step-4,7)),'Retorno: un solo nodo por paso');
      }
      if (id==='pruebas') assert.equal(await page.locator('.testing-pipeline>.reached').count(),step+1);
      if (id==='piloto') assert.equal(await page.locator('.pilot-timeline>.reached').count(),step+1);
      if (id==='transaccion') {
        assert.equal(await page.locator('[data-message][data-reached="true"]').count(),step===11?5:step);
        assert.equal(await page.locator('[data-message][data-current="true"]').count(),step===0?0:1);
      }
    };
    for (let section=0;section<sections.length;section++) {
      const {id,maxStep}=sections[section];
      await page.locator('.section-rail button').nth(section).click();
      await page.keyboard.press('r');
      await page.waitForTimeout(motion==='reduce'?70:650);
      for (let step=0;step<=maxStep;step++) {
        if(step) await page.keyboard.press(step%2?'ArrowDown':'PageDown');
        await check(id,step);
        await page.waitForTimeout(motion==='reduce'?30:100);
        // Evaluate real text and diagram bounds at every state, not only the last.
        const clipped=await page.locator('.section-content').evaluate(el=>{
          const top=document.querySelector('header').getBoundingClientRect().bottom;
          const bottom=document.querySelector('footer').getBoundingClientRect().top;
          return [...el.querySelectorAll('h1,h2,h3,p,.flow-node,.testing-pipeline,.pilot-timeline,.sequence-svg,.evidence-image,.start-button')]
            .filter(x=>!x.closest('[aria-hidden="true"]'))
            .map(x=>({tag:x.tagName,text:x.textContent?.slice(0,55),r:x.getBoundingClientRect().toJSON()}))
            .filter(({r})=>r.top<top-1||r.bottom>bottom+1||r.left<0||r.right>innerWidth+1);
        });
        assert.deepEqual(clipped,[],`Contenido cortado: ${id} paso ${step} ${width} ${motion}`);
      }
      await page.waitForTimeout(350);
      await page.screenshot({path:`artifacts/screenshots/complete/${width}-${motion}-${id}.png`});
      visits.push({width,height,motion,id,states:maxStep+1});
      // Reverse through every state, including transitions between business flows.
      for(let step=maxStep-1;step>=0;step--) {
        await page.keyboard.press(step%2?'ArrowUp':'PageUp');
        await check(id,step);
      }
    }
    // Held navigation keys must neither repeat a step nor scroll the viewport.
    await page.locator('.section-rail button').nth(7).click();
    await page.waitForTimeout(650);
    await page.keyboard.down('ArrowDown');
    for(let n=0;n<5;n++) await page.keyboard.down('ArrowDown');
    await page.waitForTimeout(650);
    await check('arquitectura',1);
    assert.equal(await page.locator('.presentation-viewport').evaluate(el=>Math.round(el.scrollTop/el.clientHeight)),7);
    await page.keyboard.up('ArrowDown');
    // Rapid distinct presses are accepted, not discarded by a debounce.
    for(let n=0;n<4;n++) await page.keyboard.press('ArrowDown');
    await check('arquitectura',5);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');
    await check('arquitectura',5);
    // Index, evidence and diagrams block presentation shortcuts while open.
    await page.getByRole('button',{name:'Índice de secciones',exact:true}).click();
    assert.equal(await page.locator('.index-grid button').count(),16);
    await page.locator('.evidence-links button').last().click();
    await page.locator('.evidence-expanded img').evaluate(img=>img.decode());
    await page.keyboard.press('ArrowDown');
    await check('arquitectura',5);
    await page.keyboard.press('Escape');
    for(const [section,button] of [[7,0],[7,1],[8,0]]) {
      await page.locator('.section-rail button').nth(section).click();
      await page.waitForTimeout(650);
      const explore=section===7?page.locator('.lane-heading button').nth(button):page.getByRole('button',{name:'Secuencia Archify'});
      await explore.click();
      await page.frameLocator('iframe').locator('svg').first().waitFor();
      await page.waitForTimeout(350);
      if(motion==='reduce'&&width===1366) await page.screenshot({path:`artifacts/screenshots/complete/archify-${section}-${button}.png`});
      await page.getByRole('button',{name:'Cerrar',exact:true}).click();
    }
    await page.locator('.section-rail button').nth(2).click();
    await page.keyboard.press('r');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    assert.match(await page.locator('.section-content').textContent(),/STIHL 500 cc/);
    await context.close();
  }
  assert.deepEqual(errors,[],'Errores JavaScript');
  assert.deepEqual(external,[],'Solicitudes externas');
  await writeFile('artifacts/motion-check.json',JSON.stringify({status:'passed',base,errors,external,visits},null,2));
  console.log(`PASS: ${visits.length} recorridos, todos los pasos en ambos sentidos; flujos, repetición, pulsaciones rápidas, modales y recursos locales.`);
} finally { await browser.close(); }

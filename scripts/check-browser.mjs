import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ headless: true });
const base = process.env.TT_PREVIEW_URL || 'http://127.0.0.1:5173';
await mkdir('artifacts/screenshots', { recursive: true });
const errors = [], external = [], results = [];
try {
  for (const [width,height] of [[1366,768],[1920,1080],[1440,900]]) {
    const context = await browser.newContext({ viewport:{width,height}, reducedMotion:'reduce' });
    await context.route('**/*', route => {
      const url = route.request().url();
      if (url.startsWith(base) || url.startsWith('data:') || url.startsWith('blob:')) return route.continue();
      external.push(url); return route.abort();
    });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    // El control recorre animaciones; las flechas laterales omiten pasos pendientes.
    await page.keyboard.press('2');
    await page.keyboard.press('ArrowDown');
    assert.equal(await page.locator('.footer-title').textContent(),'Contexto');
    assert.equal(await page.locator('.step-progress').getAttribute('aria-label'),'Paso 2 de 3');
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('.footer-title').textContent(),'Problema');
    await page.keyboard.press('ArrowLeft');
    assert.equal(await page.locator('.step-progress').getAttribute('aria-label'),'Paso 2 de 3');
    await page.keyboard.press('ArrowUp');
    assert.equal(await page.locator('.step-progress').getAttribute('aria-label'),'Paso 1 de 3');
    await page.keyboard.press('PageDown');
    assert.equal(await page.locator('.step-progress').getAttribute('aria-label'),'Paso 2 de 3');
    await page.keyboard.press('PageUp');
    assert.equal(await page.locator('.step-progress').getAttribute('aria-label'),'Paso 1 de 3');
    for(let i=0;i<3;i++) await page.keyboard.press('ArrowDown');
    assert.equal(await page.locator('.footer-title').textContent(),'Problema');
    await page.keyboard.press('ArrowUp');
    assert.equal(await page.locator('.footer-title').textContent(),'Contexto');
    await page.keyboard.press('r');
    for(let section=0;section<5;section++) {
      await page.keyboard.press(String(section+1));
      await page.waitForTimeout(160);
      const max = [0,2,2,2,6][section];
      for(let step=0;step<max;step++) await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(200);
      const bounds = await page.locator('.presentation-section[aria-hidden="false"] .section-content').evaluate(el => {
        const r=el.getBoundingClientRect();
        const children=[...el.querySelectorAll('h1,h2,.chart-row,.system-node,.scene-caption,.scope-strip,.start-button,.insight-strip')].filter(x=>!x.closest('[aria-hidden="true"]')).map(x=>({name:x.className||x.tagName,top:x.getBoundingClientRect().top,bottom:x.getBoundingClientRect().bottom,left:x.getBoundingClientRect().left,right:x.getBoundingClientRect().right}));
        return { top:r.top,bottom:r.bottom,children, width:innerWidth,height:innerHeight,footer:document.querySelector('footer').getBoundingClientRect().top,header:document.querySelector('header').getBoundingClientRect().bottom };
      });
      results.push({width,height,section,bounds});
      for(const child of bounds.children) {
        assert(child.top>=bounds.header-1,`Encabezado tapa ${child.name}, sección ${section} a ${width}`);
        assert(child.bottom<=bounds.footer+1,`Pie tapa ${child.name}, sección ${section} a ${width}`);
        assert(child.left>=0 && child.right<=width,`Desborde horizontal ${child.name}, sección ${section}`);
      }
      await page.screenshot({path:`artifacts/screenshots/${width}-${section+1}.png`});
    }
    // Reinicio y regreso a una sección conservando su estado.
    await page.keyboard.press('r');
    assert.equal(await page.locator('.caption-number').textContent(),'01 / 07');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('4'); await page.keyboard.press('5');
    assert.equal(await page.locator('.caption-number').textContent(),'02 / 07');
    // Un modal bloquea las acciones globales y devuelve el foco al cerrar.
    await page.getByRole('button',{name:'Ayuda de navegación',exact:true}).click();
    await page.keyboard.press('ArrowDown');
    assert.equal(await page.locator('.caption-number').textContent(),'02 / 07');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog').evaluate(el=>el.open),false);
    // Espacio sobre un botón avanza una sola vez.
    await page.getByRole('button',{name:'Siguiente',exact:true}).focus();
    await page.keyboard.press('Space');
    assert.equal(await page.locator('.caption-number').textContent(),'03 / 07');
    await page.locator('body').click({position:{x:10,y:height/2}});
    for(let i=0;i<4;i++) await page.keyboard.press('ArrowDown');
    await page.getByRole('button',{name:'Explorar diagrama'}).click();
    const frame = page.frameLocator('iframe');
    await frame.locator('svg').first().waitFor();
    await page.waitForTimeout(300);
    await page.screenshot({path:`artifacts/screenshots/${width}-archify.png`});
    await page.getByRole('button',{name:'Cerrar',exact:true}).click();
    await context.close();
  }
  const context = await browser.newContext({viewport:{width:1366,height:768}, reducedMotion:'no-preference'});
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base);
  await page.getByRole('button',{name:'Pantalla completa',exact:true}).click();
  await page.waitForTimeout(150);
  assert(await page.evaluate(()=>Boolean(document.fullscreenElement)), 'Pantalla completa');
  await page.getByRole('button',{name:'Salir de pantalla completa',exact:true}).click();
  await page.locator('body').click({position:{x:10,y:300}});
  await page.keyboard.press('5');
  await page.waitForTimeout(900);
  for(let i=0;i<6;i++) { await page.keyboard.press('ArrowDown'); await page.waitForTimeout(120); }
  await page.waitForTimeout(1000);
  assert.equal(await page.locator('.caption-number').textContent(),'07 / 07');
  await page.screenshot({path:'artifacts/screenshots/motion-transformacion.png'});
  await page.keyboard.press('1'); await page.waitForTimeout(900);
  await page.locator('.presentation-viewport').hover();
  await page.mouse.wheel(0,800); await page.waitForTimeout(1000);
  assert.equal(await page.locator('.footer-title').textContent(),'Contexto','Scroll sincroniza navegación');
  await context.close();
  assert.deepEqual(errors,[], 'Errores de JavaScript');
  assert.deepEqual(external,[], 'Dependencias externas en tiempo de ejecución');
  await writeFile('artifacts/browser-check.json', JSON.stringify({status:'passed',base,errors,external,results},null,2));
  console.log('PASS: 15 escenas en 3 resoluciones; teclado, reinicio, modal, Archify, pantalla completa, scroll, motion y recursos locales.');
} finally { await browser.close(); }

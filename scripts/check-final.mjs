import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';

const browser=await chromium.launch({headless:true});
try {
  const context=await browser.newContext({viewport:{width:1366,height:768},reducedMotion:'reduce'});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4173/');
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(600);
  await page.screenshot({path:'artifacts/screenshots/final-portada.png'});
  await page.keyboard.press('5');
  for(let i=0;i<6;i++)await page.keyboard.press('ArrowDown');
  await page.getByRole('button',{name:'Explorar diagrama'}).click();
  const frame=page.frameLocator('iframe');
  await frame.locator('svg').first().waitFor();
  await page.waitForTimeout(400);
  const fits=await frame.locator('html').evaluate(el=>({width:innerWidth,height:innerHeight,scrollWidth:el.scrollWidth,scrollHeight:el.scrollHeight}));
  assert(fits.scrollWidth<=fits.width && fits.scrollHeight<=fits.height,JSON.stringify(fits));
  await page.screenshot({path:'artifacts/screenshots/final-archify.png'});
  await page.getByRole('button',{name:'Cerrar',exact:true}).click();
  await context.close();
  // Mobile containment is secondary, but navigation remains reachable.
  const mobile=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const m=await mobile.newPage();await m.goto('http://127.0.0.1:4173/');
  for(let i=1;i<=5;i++){
    await m.keyboard.press(String(i));await m.waitForTimeout(150);
    assert(await m.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    assert(await m.getByRole('button',{name:'Siguiente',exact:true}).isVisible());
  }
  await mobile.close();
  assert.deepEqual(errors,[]);
  await writeFile('artifacts/final-check.json',JSON.stringify({status:'passed',archifyEmbeddedBounds:fits,mobile:'390x844',errors},null,2));
  console.log('PASS: build final, logo, Archify en modo presentación sin desbordes y navegación móvil.');
}finally{await browser.close();}

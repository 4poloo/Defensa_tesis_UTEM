import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeftRight, ArrowRight, ArrowUpRight, Database, Fingerprint, Layers3, Radio, ShieldCheck, UsersRound, Warehouse, Wrench } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { FlowLine } from '../components/FlowLine';
import type { FlowNode } from '../components/FlowLine';

export interface TechnicalProps { step: number; onStep: (step:number)=>void; onDiagram: (name:string)=>void }
const business = [
  { title:'Recepción', lead:'De la compra a la recepción real.', phase:['Softland genera el documento de recepción esperada.','El middleware transforma el documento XML en JSON.','Invas recibe el ASN y registra la recepción física.','El middleware transforma VERIFICARASN en una entrada RE.','Softland procesa la entrada RE de lo recibido.'], nodes:[{label:'Softland',detail:'OR / OC · XML',kind:'erp'},{label:'Middleware',detail:'XML → JSON',kind:'middleware'},{label:'Invas',detail:'ASN · Recepción física',kind:'wms'},{label:'Middleware',detail:'VERIFICARASN → RE',kind:'middleware'},{label:'Softland',detail:'Entrada RE · XML',kind:'erp'}], note:'El ASN anticipa la recepción. La confirmación física vuelve al ERP.' },
  { title:'Producción', lead:'Materiales y producto terminado, alineados.', phase:['La plataforma auxiliar prepara la orden de trabajo.','Invas ejecuta el picking de materia prima.','La operación origina eventos de consumo, devolución y PT.','El middleware valida y transforma cada evento en XML.','Softland procesa los movimientos de inventario.'], nodes:[{label:'Planificación',detail:'OT · Plataforma auxiliar',kind:'network'},{label:'Invas',detail:'Picking de materia prima',kind:'wms'},{label:'Movimientos',detail:'Consumo · Devolución · PT',kind:'box'},{label:'Middleware',detail:'Validar · JSON → XML',kind:'middleware'},{label:'Softland',detail:'Movimientos de inventario',kind:'erp'}],note:'La creación de OT se apoya en una plataforma complementaria por restricciones de Softland. Consumo, devolución y PT son eventos distintos.' },
  { title:'Despacho',lead:'La entrega física vuelve al registro administrativo.',phase:['Softland genera la orden de despacho basada en la nota de venta.','El middleware transforma la OD en una orden de salida.','Invas ejecuta el picking y la entrega física.','El middleware transforma la confirmación de despacho.','Softland procesa la salida y conserva la referencia de origen.'],nodes:[{label:'Softland',detail:'OD basada en NV · XML',kind:'erp'},{label:'Middleware',detail:'OD → OS',kind:'middleware'},{label:'Invas',detail:'OS · Picking · Entrega',kind:'wms'},{label:'Middleware',detail:'Despacho Express',kind:'middleware'},{label:'Softland',detail:'Salida EN / DEC · XML',kind:'erp'}],note:'La confirmación conserva la referencia documental de la orden de origen.' },
] satisfies {title:string;lead:string;phase:string[];nodes:FlowNode[];note:string}[];

export function BusinessFlows({step,onStep}:TechnicalProps) {
  const index=Math.floor(step/5), nodeStep=step%5, flow=business[index];
  return <div className="section-inner technical-section"><SectionHeading number="05" label="PROCESOS INTEGRADOS">Tres procesos.<br/><span>Un intercambio común.</span></SectionHeading>
    <div className="chapter-tabs" aria-label="Proceso">{business.map((b,i)=><button key={b.title} aria-pressed={index===i} onClick={()=>onStep(i*5)}><span>0{i+1}</span>{b.title}</button>)}</div>
    <div className="business-stage" key={index}><p className="business-lead">{flow.lead}</p><FlowLine nodes={flow.nodes} active={nodeStep}/><div className="flow-caption"><span className="caption-number">{String(nodeStep+1).padStart(2,'0')} / 05</span><strong>{flow.phase[nodeStep]}</strong></div></div>
    <p className="technical-note">{flow.note}</p><p className="source-note">FUENTE · Informe final, capítulo 5, figuras 6–9; contratos de integración.</p>
  </div>;
}

export function SystemContext({step,onDiagram}:TechnicalProps) {
  return <div className="section-inner technical-section"><SectionHeading number="06" label="CONTEXTO DEL SISTEMA">Cada sistema conserva<br/><span>su responsabilidad.</span></SectionHeading>
    <div className="ecosystem-actors"><div><UsersRound/><strong>Administración</strong><span>Contabilidad y finanzas</span></div><Reveal show={step>=1}><Wrench/><strong>Tecnología</strong><span>Opera y soporta la integración</span></Reveal><div><Warehouse/><strong>Operación</strong><span>Bodega, producción y despacho</span></div></div>
    <div className={`ecosystem-map ${step>=1?'with-middleware':''}`}><div className="ecosystem-system"><Database/><strong>Softland ERP</strong><span>Información administrativa</span></div><Reveal show={step>=1} className="ecosystem-center"><ArrowLeftRight/><div><Layers3/><strong>Middleware AWS</strong><span>Interoperabilidad</span></div><ArrowLeftRight/></Reveal><div className="ecosystem-system"><Warehouse/><strong>Invas WMS</strong><span>Ejecución física</span></div></div>
    <Reveal show={step>=2} className="insight-strip"><span className="small-index">C4 · CONTEXTO</span><p>Los usuarios continúan trabajando <strong>en sus sistemas habituales.</strong></p><button className="text-button" onClick={()=>onDiagram('integracion')}>Explorar <ArrowUpRight size={16}/></button></Reveal><p className="source-note">FUENTE · Informe final, figuras 24 y 25. Vista conceptual del ecosistema.</p>
  </div>;
}

const forward:FlowNode[]=[{label:'Softland',detail:'Documento XML',kind:'erp'},{label:'S3',detail:'Objeto / evento',kind:'cloud'},{label:'Lambda S3',detail:'Validación · XML → JSON',kind:'middleware'},{label:'Invas',detail:'Endpoint JSON',kind:'wms'}];
const backward:FlowNode[]=[{label:'Invas',detail:'Evento JSON',kind:'wms'},{label:'API Gateway',detail:'Recepción HTTP',kind:'cloud'},{label:'Lambda App',detail:'Validación',kind:'middleware'},{label:'SNS',detail:'Distribución',kind:'network'},{label:'Handler',detail:'JSON → XML',kind:'middleware'},{label:'S3',detail:'Archivo / intercambio',kind:'cloud'},{label:'Softland',detail:'Lectura posterior',kind:'erp'}];
const awsCaptions=[
  'Dos direcciones de intercambio. Avanza para recorrer un componente a la vez.',
  'Softland origina el documento XML.',
  'S3 recibe el objeto y su evento activa el procesamiento.',
  'Lambda valida e interpreta el documento y transforma XML en JSON.',
  'El endpoint de Invas recibe la información transformada.',
  'En el retorno, Invas origina el evento JSON.',
  'API Gateway recibe la solicitud HTTP.',
  'Lambda App valida el evento recibido.',
  'SNS distribuye la transacción hacia el procesamiento específico.',
  'El handler correspondiente transforma JSON en XML.',
  'S3 conserva el archivo para el intercambio con el ERP; aún falta el destino.',
  'Softland lee y procesa el XML posteriormente desde el intercambio de archivos.',
  'DynamoDB conserva identificadores para controlar los reenvíos.',
  'CloudWatch registra ejecuciones, errores y resultados del middleware.',
];

export function AwsArchitecture({step,onDiagram}:TechnicalProps) {
  const top=Math.min(step-1,forward.length-1);
  const bottom=Math.min(step-5,backward.length-1);
  return <div className="section-inner technical-section aws-section"><SectionHeading number="07" label="ARQUITECTURA AWS">Dos direcciones.<br/><span>Una arquitectura común.</span></SectionHeading>
    <div className="architecture-lanes"><div className={`architecture-lane ${step>0&&step<=4?'lane-focus':''}`}><div className="lane-heading"><span>01 / SOFTLAND → INVAS</span><button onClick={()=>onDiagram('aws-ida')}>Explorar en Archify <ArrowUpRight size={14}/></button></div><FlowLine nodes={forward} active={top} current={step>=1&&step<=4?top:-1} compact/></div>
      <div className={`architecture-lane ${step>=5&&step<=11?'lane-focus':''}`}><div className="lane-heading"><span>02 / INVAS → SOFTLAND</span><button onClick={()=>onDiagram('aws-vuelta')}>Explorar en Archify <ArrowUpRight size={14}/></button></div><FlowLine nodes={backward} active={bottom} current={step>=5&&step<=11?bottom:-1} compact reverse/></div></div>
    <div className="transversal-controls"><div className={step===12?'highlight':''}><Fingerprint size={20}/><strong>DynamoDB</strong><span>Idempotencia</span></div><div className={step===13?'highlight':''}><Radio size={20}/><strong>CloudWatch</strong><span>Logs y trazabilidad</span></div><p>Intercambio de archivos: S3 + carpeta/FTP.<br/>EC2 cumple un rol de acceso y almacenamiento operativo.</p></div>
    <div className="active-explanation"><span>{String(step+1).padStart(2,'0')}</span><p>{awsCaptions[step]}</p></div>
  </div>;
}

const participants=['Invas','API Gateway','Lambda App','DynamoDB','SNS','Handler PT','S3 / archivos','Softland'];
const messages=[{from:0,to:1,title:'Evento JSON',detail:'La declaración PT nace en Invas.'},{from:1,to:2,title:'Recepción',detail:'API Gateway entrega el evento a Lambda App.'},{from:2,to:2,title:'Validación',detail:'Se comprueban estructura y reglas específicas del flujo, incluida OT/SKU cuando corresponde.'},{from:2,to:3,title:'Idempotencia',detail:'Se consulta el identificador natural del evento.'},{from:3,to:2,title:'Evento nuevo',detail:'El control permite continuar con un evento no procesado.'},{from:2,to:4,title:'Publicación SNS',detail:'La recepción se separa del procesamiento específico.'},{from:4,to:5,title:'Handler PT',detail:'SNS deriva el evento al procesador de producto terminado.'},{from:5,to:5,title:'JSON → XML',detail:'El handler genera el documento compatible con Softland.'},{from:5,to:6,title:'Archivo disponible',detail:'Se guarda el XML para el intercambio. Esto todavía no confirma el movimiento en ERP.'},{from:6,to:7,title:'Softland procesa',detail:'La evidencia en destino permite comprobar el movimiento y reconciliar la cantidad.'}];

export function PtSequence({step,onDiagram}:TechnicalProps) {
  const reduced=useReducedMotion(); const duplicate=step===11;
  return <div className="section-inner technical-section sequence-section"><SectionHeading number="08" label="UNA TRANSACCIÓN E2E">Declaración de <span>producto terminado.</span></SectionHeading>
    <div className="sequence-context"><span>JSON → XML</span><span>{duplicate?'ALTERNATIVA · REENVÍO':'SECUENCIA COMPLETA · 10 MENSAJES'}</span><button className="text-button" onClick={()=>onDiagram('declaracion-pt')}>Secuencia Archify <ArrowUpRight size={16}/></button></div>
    <svg className="sequence-svg" viewBox="0 0 1160 408" role="img" aria-label={`Secuencia de declaración PT. ${duplicate?'Reenvío ignorado.':step===0?'Participantes preparados.':messages[step-1].detail}`}>
      <defs><marker id="seq-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7" fill="var(--accent)"/></marker></defs>
      {participants.map((p,i)=><g key={p}><rect x={i*144+5} y="0" width="138" height="39" rx="4" fill="#1b2821" stroke="#4a6657"/><text x={i*144+74} y="25" textAnchor="middle" fill="#e6eee8" fontSize="14">{p}</text><line x1={i*144+74} x2={i*144+74} y1="46" y2="402" stroke="#567060" strokeDasharray="3 6" opacity=".45"/></g>)}
      {messages.map((m,i)=>{const x1=m.from*144+74,x2=m.to*144+74,y=64+i*34,shown=duplicate?i<5:i<step,active=duplicate?i===4:i===step-1;return <motion.g data-message={i+1} data-reached={shown} data-current={active} key={m.title} initial={false} animate={{opacity:shown?(active?1:.72):.28}} transition={{duration:reduced?0:.25}}>{m.from===m.to?<path d={`M${x1} ${y} h46 v17 h-46`} fill="none" stroke="var(--accent)" strokeWidth={active?2:1} markerEnd="url(#seq-arrow)"/>:<path d={`M${x1} ${y+10} H${x2}`} fill="none" stroke="var(--accent)" strokeWidth={active?2:1} markerEnd="url(#seq-arrow)"/>}<text x={m.from===m.to?x1+54:(x1+x2)/2} y={y+3} textAnchor={m.from===m.to?'start':'middle'} fill="#e7f0e9" fontSize="14">{duplicate&&i===4?'Ya procesado':m.title}</text></motion.g>})}
    </svg>
    <div className={`active-explanation ${duplicate?'duplicate-explanation':''}`}><span>{duplicate?<ShieldCheck/>:String(step).padStart(2,'0')}</span><p>{duplicate?<><strong>Reenvío detectado.</strong> El evento se ignora y no se genera un segundo movimiento.</>:step===0?'Un evento, ocho participantes y evidencia hasta el destino. Avanza para seguir cada mensaje.':messages[step-1].detail}</p></div>
    <p className="source-note">FUENTE · Informe final, capítulos 7–8; figuras 31–33 y 38–40. Secuencia conceptual, sin llamadas reales.</p>
  </div>;
}

export function Closing({onIndex}: {onIndex:()=>void}) {
  return <div className="closing-section"><p className="eyebrow"><span className="status-dot mint"/>CONCLUSIÓN DEL RECORRIDO</p><h2>De procesos fragmentados<br/>a una integración<br/><span>validada y trazable.</span></h2><div className="closing-systems"><span>Softland</span><ArrowLeftRight/><strong>Middleware</strong><ArrowLeftRight/><span>Invas</span></div><div className="closing-bottom"><p>Gracias.<br/><span>Preguntas</span></p><button className="text-button" onClick={onIndex}>Volver a un tema <ArrowRight size={20}/></button></div><p className="source-note">MAXIMILIANO ANDRÉS OLAVE BASTIDAS · UTEM · 2026</p></div>;
}

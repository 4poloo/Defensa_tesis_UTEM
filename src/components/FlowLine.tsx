import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Box, Cloud, Database, FileCode2, Layers3, Network, Server, Warehouse } from 'lucide-react';

export interface FlowNode { label: string; detail: string; kind?: 'erp'|'wms'|'middleware'|'file'|'cloud'|'network'|'box' }
const icons = { erp: Database, wms: Warehouse, middleware: Layers3, file: FileCode2, cloud: Cloud, network: Network, box: Box };

export function FlowLine({ nodes, active = nodes.length-1, current = active, reverse = false, compact = false }: { nodes: FlowNode[]; active?: number; current?: number; reverse?: boolean; compact?: boolean }) {
  const reduced = useReducedMotion();
  return <div className={`flow-line ${reverse?'flow-reverse':''} ${compact?'flow-compact':''}`}>
    {nodes.map((node,i) => {
      const Icon = node.kind ? icons[node.kind] : Server;
      return <div className={`flow-stop ${i <= active?'reached':''} ${i===current?'current':''}`} aria-current={i===current?'step':undefined} key={`${i}-${node.label}`}>
        {i>0 && <div className="flow-link" aria-hidden="true"><motion.i initial={false} animate={{scaleX:i<=active?1:0}} transition={{duration:reduced?0:.28, ease:[.23,1,.32,1]}} /><ArrowRight size={15}/></div>}
        <div className={`flow-node ${node.kind==='middleware'?'flow-middleware':''}`}><Icon size={22}/><strong>{node.label}</strong><span>{node.detail}</span></div>
      </div>;
    })}
  </div>;
}

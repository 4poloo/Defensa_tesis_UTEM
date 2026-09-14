export function DiagramFrame({ src, title }: { src: string; title: string }) {
  return <iframe className="diagram-frame" src={src} title={title} sandbox="allow-scripts allow-same-origin allow-downloads" />;
}

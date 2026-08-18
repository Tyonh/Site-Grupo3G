"use client";

interface StudioLightsProps {
  environmentIntensity?: number;
}

/**
 * Rig de luzes de estúdio local — substitui o antigo `<Environment preset="studio">`
 * do drei, que buscava um HDR de ~1MB no CDN raw.githubusercontent.com. Esse CDN
 * apresentou 503 recorrente ("Backend.max_conn reached"), quebrando a página do
 * produto 3D sempre que o fetch falhava. Este rig reproduz o efeito de softbox de
 * estúdio (luz ambiente difusa + realces direcionais) sem nenhuma requisição externa.
 */
export function StudioLights({ environmentIntensity = 1 }: StudioLightsProps) {
  return (
    <>
      <ambientLight intensity={0.6 * environmentIntensity} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.1 * environmentIntensity}
      />
      <directionalLight
        position={[-5, 3, -4]}
        intensity={0.5 * environmentIntensity}
      />
      <pointLight position={[0, -4, 2]} intensity={0.3 * environmentIntensity} />
    </>
  );
}

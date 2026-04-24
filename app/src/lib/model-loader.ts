const MODEL_BASE = '/assets/models';

export function getModelPath(name: string, preferCustom = true): string {
  if (preferCustom) {
    return `${MODEL_BASE}/custom/${name}.glb`;
  }
  return `${MODEL_BASE}/placeholder/${name}.glb`;
}

export const ZOOM_MODELS: Record<string, string> = {
  'heart-full-body': 'full-body',
  'heart-anatomical': 'heart-anatomical',
  'heart-organ': 'heart-organ',
  'heart-tissue': 'heart-tissue',
  'heart-cellular': 'heart-cellular',
  'heart-micro': 'heart-micro',
};

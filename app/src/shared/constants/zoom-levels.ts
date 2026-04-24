import { ZoomLevel } from '@/shared/types';

export const ZOOM_LEVEL_LABELS: Record<ZoomLevel, string> = {
  [ZoomLevel.FullBody]: 'Full Body',
  [ZoomLevel.Surface]: 'Skin / Surface',
  [ZoomLevel.Anatomical]: 'Anatomical',
  [ZoomLevel.Organ]: 'Organ',
  [ZoomLevel.Tissue]: 'Tissue',
  [ZoomLevel.Micro]: 'Micro / Molecular',
};

export const ZOOM_LEVEL_DESCRIPTIONS: Record<ZoomLevel, string> = {
  [ZoomLevel.FullBody]: 'Translucent human figure with major organs visible',
  [ZoomLevel.Surface]: 'Exterior detail of the selected region',
  [ZoomLevel.Anatomical]: 'Muscle, bone, vasculature, and nerves revealed',
  [ZoomLevel.Organ]: 'Individual organ in structural detail',
  [ZoomLevel.Tissue]: 'Cellular neighbourhood and spatial arrangement',
  [ZoomLevel.Micro]: 'Molecular interactions and drug binding sites',
};

export const ZOOM_LEVEL_ORDER: ZoomLevel[] = [
  ZoomLevel.FullBody,
  ZoomLevel.Surface,
  ZoomLevel.Anatomical,
  ZoomLevel.Organ,
  ZoomLevel.Tissue,
  ZoomLevel.Micro,
];

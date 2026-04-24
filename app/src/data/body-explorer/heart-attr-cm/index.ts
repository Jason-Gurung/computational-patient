import type { ZoomLevelMeta } from '@/shared/types';
import { ZoomLevel } from '@/shared/types';
import { heartFullBody } from './full-body';
import { heartAnatomical } from './anatomical';
import { heartOrgan } from './organ';
import { heartTissue } from './tissue';
import { heartCellular } from './cellular';
import { heartMicro } from './micro';

export { heartFullBody, heartAnatomical, heartOrgan, heartTissue, heartCellular, heartMicro };

export const HEART_ZOOM_LEVELS: ZoomLevelMeta[] = [
  heartFullBody,
  heartAnatomical,
  heartOrgan,
  heartTissue,
  heartCellular,
  heartMicro,
];

export function getHeartZoomLevel(level: ZoomLevel): ZoomLevelMeta | undefined {
  return HEART_ZOOM_LEVELS.find((z) => z.level === level);
}

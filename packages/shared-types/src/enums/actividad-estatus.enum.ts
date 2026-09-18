export enum ActividadEstatus {
  PENDIENTE   = 'PENDIENTE',
  EN_PROGRESO = 'EN_PROGRESO',
  COMPLETADA  = 'COMPLETADA',
  CANCELADA   = 'CANCELADA',
}

export const ESTATUS_ACTIVIDAD_LABEL: Record<ActividadEstatus, string> = {
  [ActividadEstatus.PENDIENTE]:   'Pendiente',
  [ActividadEstatus.EN_PROGRESO]: 'En progreso',
  [ActividadEstatus.COMPLETADA]:  'Completada',
  [ActividadEstatus.CANCELADA]:   'Cancelada',
};
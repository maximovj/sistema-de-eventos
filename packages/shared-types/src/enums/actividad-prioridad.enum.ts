export enum ActividadPrioridad {
  BAJA  = 'BAJA',
  MEDIA = 'MEDIA',
  ALTA  = 'ALTA',
}

export const ACTIVIDAD_PRIORIDAD_LABEL: Record<ActividadPrioridad, string> = {
  [ActividadPrioridad.BAJA]:   'Baja',
  [ActividadPrioridad.MEDIA]: 'Media',
  [ActividadPrioridad.ALTA]:  'Alta',
};

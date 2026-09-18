export enum ActividadTipo {
  LOGISTICA = 'LOGISTICA',
  OPERATIVA = 'OPERATIVA',
  TECNICA   = 'TECNICA',
}

export const TIPO_ACTIVIDAD_LABEL: Record<ActividadTipo, string> = {
  [ActividadTipo.LOGISTICA]: 'Logística',
  [ActividadTipo.OPERATIVA]: 'Operativa',
  [ActividadTipo.TECNICA]:   'Técnica',
};

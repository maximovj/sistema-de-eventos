export interface Evento {
  id: string;
  nombreEvento: string;
  descripcion: string;
  categoria: CategoriaEvento;
  tipoEvento: TipoEvento;
  modalidad: ModalidadEvento;
  estatus: EstatusEvento;
  etapaActual: EtapaEvento;
  fechaInicio: Date;
  fechaFin: Date;
  fechaApertura: Date;
  fechaCierre: Date;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  capacidadMaxima: number;
  boletosVendidos: number;
  organizadorId: number;
  presupuestoTotal: number;
  presupuestoEjercido: number;
  porcentajeAvance: number;
  creadoPor: string;
  actualizadoPor: string;
}

export enum CategoriaEvento {
  CULTURAL_ARTISTICO = 'CULTURAL_ARTISTICO',
  DEPORTIVO = 'DEPORTIVO',
  EDUCATIVO = 'EDUCATIVO',
  EMPRESARIAL = 'EMPRESARIAL',
  SOCIAL = 'SOCIAL',
  TECNOLOGICO = 'TECNOLOGICO'
}

export enum TipoEvento {
  FESTIVAL_MULTIDISCIPLINARIO = 'FESTIVAL_MULTIDISCIPLINARIO',
  CONCIERTO = 'CONCIERTO',
  EXPOSICION = 'EXPOSICION',
  CONFERENCIA = 'CONFERENCIA',
  TALLER = 'TALLER',
  FERIA = 'FERIA'
}

export enum ModalidadEvento {
  PRESENCIAL = 'PRESENCIAL',
  VIRTUAL = 'VIRTUAL',
  HIBRIDO = 'HIBRIDO'
}

export enum EstatusEvento {
  EN_PREPARACION = 'EN_PREPARACION',
  PROGRAMADO = 'PROGRAMADO',
  EN_CURSO = 'EN_CURSO',
  FINALIZADO = 'FINALIZADO',
  CANCELADO = 'CANCELADO'
}

export enum EtapaEvento {
  PLANEACION = 'PLANEACION',
  LOGISTICA_Y_MONTAJE = 'LOGISTICA_Y_MONTAJE',
  PROMOCION = 'PROMOCION',
  EJECUCION = 'EJECUCION',
  CLAUSURA = 'CLAUSURA',
  POST_EVENTO = 'POST_EVENTO'
}

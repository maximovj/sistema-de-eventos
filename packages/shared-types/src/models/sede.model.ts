import { SedeEstado } from "../enums/sede-estado.enum";

export interface Sede {
  id: string;
  eventoId: string;
  nombre: string;
  direccion: string;
  capacidad: number;
  areaTotal: number;
  areaCubierta: number;
  areaDescubierta: number;
  tieneEstacionamiento: boolean;
  capacidadEstacionamiento: number;
  tieneAccesoDiscapacitados: boolean;
  tieneWifi: boolean;
  tieneAudio: boolean;
  tieneIluminacion: boolean;
  tieneProyectores: boolean;
  tieneCamaras: boolean;
  costoRenta: number;
  fechaInicioOcupacion: Date | string; 
  fechaFinOcupacion: Date | string;
  responsable: string;
  estado: SedeEstado;
}
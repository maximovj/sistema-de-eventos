import { ActividadEstatus } from "../enums/actividad-estatus.enum";
import { ActividadPrioridad } from "../enums/actividad-prioridad.enum";
import { ActividadTipo } from "../enums/actividad-tipo.enum";

export interface Actividad { 
    id: string;
    eventoId: string;
    sedeId: string;
    nombre: string;
    descripcion: string;
    tipo: ActividadTipo;
    estatus: ActividadEstatus;
    prioridad: ActividadPrioridad;
    /** ISO 8601 sin zona: "2026-10-11T08:00" */
    fechaInicio: string;
    fechaFin: string;
    porcentajeAvance: number; // 0 - 100
    responsable: string;
    /** IDs de otras actividades de las que depende */
    dependencias: string[];
}
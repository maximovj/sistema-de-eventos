export type TipoArtista = 'MUSICO_CANTANTE' | 'MUSICO_INSTRUMENTISTA' | 'BANDA' | 'DJ' | 'OTRO';
export type GeneroMusical = 'FUSION_LATINA' | 'ROC' | 'POP' | 'JAZZ' | 'ELECTRONICA' | 'OTRO';
export type EstatusArtista = 'CONFIRMADO' | 'PENDIENTE' | 'CANCELADO';

export interface Artista {
  id: string;
  eventoId: string;
  nombre: string;
  nombreArtistico: string;
  tipoArtista: TipoArtista;
  generoMusical: GeneroMusical;
  paisOrigen: string;
  ciudadOrigen: string;
  telefono: string;
  email: string;
  paginaWeb: string;
  instagram: string;
  spotify: string;
  cache: number;
  costoTransporte: number;
  costoHospedaje: number;
  costoAlimentacion: number;
  costoTotal: number;
  fechaPresentacion: string | Date;      // ISO 8601: "2026-10-15T20:00"
  duracionPresentacion: number;   // minutos
  requiereTecnicos: number;
  requiereInstrumentos: boolean;
  requiereBackline: boolean;
  checkIn: string  | Date;                // ISO 8601
  soundCheck: string | Date;             // ISO 8601
  estatus: EstatusArtista;
}
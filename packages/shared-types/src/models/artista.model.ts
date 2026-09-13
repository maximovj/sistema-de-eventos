import { ArtistaEstatusArtista } from "../enums/artista-estatus-artista.enum";
import { ArtistaGeneroMusical } from "../enums/artista-genero-musical.enum";
import { ArtistaTipo } from "../enums/artista-tipo.enum";

export interface Artista {
  id: string;
  eventoId: string;
  nombre: string;
  nombreArtistico: string;
  tipoArtista: ArtistaTipo;
  generoMusical: ArtistaGeneroMusical;
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
  estatus: ArtistaEstatusArtista;
}
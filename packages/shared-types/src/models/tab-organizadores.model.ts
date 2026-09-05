export type TipoFiltro = 'asc' | 'desc' | null;

export interface ThFiltro {
  nombre: TipoFiltro;
  tipo: TipoFiltro;
  contacto_nombre: TipoFiltro;
  telefono: TipoFiltro;
  antiguedad: TipoFiltro;
}
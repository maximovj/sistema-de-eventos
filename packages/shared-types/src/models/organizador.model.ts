import { TipoOrganizador } from "../enums/tipo-organizador.enum";

export interface Organizador {
  id: number;
  tipo: TipoOrganizador;
  nombre: string;
  rfc: string;
  telefono: string;
  email: string;
  direccion: string;
  antiguedad: string;
  contacto_nombre: string;
  contacto_cargo: string;
  contacto_telefono: string;
  contacto_celular: string;
}
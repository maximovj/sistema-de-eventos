export enum ModalModo {
  VER='view',
  CREAR='create',
  EDITAR='edit',
  ELIMINAR='delete',
};

export type ModalIcons = Partial<Record<ModalModo, string>>;
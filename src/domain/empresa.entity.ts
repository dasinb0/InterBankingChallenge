export type TipoEmpresa = 'pyme' | 'corporativa';

export class Empresa {
  id: string; // UUID
  cuit: string;
  razonSocial: string;
  fechaAdhesion: Date;
  tipo: TipoEmpresa;
}

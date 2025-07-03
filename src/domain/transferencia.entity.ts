export class Transferencia {
  id: string; // UUID
  importe: number;
  empresaId: string;
  cuentaDebito: string;
  cuentaCredito: string;
  fecha: Date;
}

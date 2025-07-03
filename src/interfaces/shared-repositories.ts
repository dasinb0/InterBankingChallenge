import { EmpresaRepository } from '../infrastructure/empresa.repository';
import { TransferenciaRepository } from '../infrastructure/transferencia.repository';

export const empresaRepo = new EmpresaRepository();
export const transferenciaRepo = new TransferenciaRepository(); 
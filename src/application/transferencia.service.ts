import { Injectable } from '@nestjs/common';
import { Transferencia } from '../domain/transferencia.entity';
import { TransferenciaRepository } from '../infrastructure/transferencia.repository';
import { EmpresaRepository } from '../infrastructure/empresa.repository';
import { Empresa } from '../domain/empresa.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransferenciaService {
  constructor(
    private readonly transferenciaRepo: TransferenciaRepository,
    private readonly empresaRepo: EmpresaRepository,
  ) {}

  registrarTransferencia(data: Omit<Transferencia, 'id'>): Transferencia {
    const transferencia: Transferencia = {
      id: uuidv4(),
      ...data,
      fecha: new Date(data.fecha),
    };
    return this.transferenciaRepo.create(transferencia);
  }

  obtenerEmpresasConTransferenciasUltimoMes(): Empresa[] {
    const transferencias = this.transferenciaRepo.findByFechaUltimoMes();
    const empresaIds = Array.from(new Set(transferencias.map(t => t.empresaId)));
    return this.empresaRepo.findAll()
      .filter(e => empresaIds.includes(e.id));
  }
}

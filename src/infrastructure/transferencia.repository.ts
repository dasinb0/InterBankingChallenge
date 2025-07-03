import { Injectable } from '@nestjs/common';
import { Transferencia } from '../domain/transferencia.entity';

@Injectable()
export class TransferenciaRepository {
  private transferencias: Transferencia[] = [];

  findAll(): Transferencia[] {
    return this.transferencias;
  }

  findByEmpresaId(empresaId: string): Transferencia[] {
    return this.transferencias.filter(t => t.empresaId === empresaId);
  }

  findByFechaUltimoMes(): Transferencia[] {
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    return this.transferencias.filter(t => {
      const fecha = t.fecha instanceof Date ? t.fecha : new Date(t.fecha);
      return fecha >= oneMonthAgo;
    });
  }

  create(transferencia: Transferencia): Transferencia {
    this.transferencias.push(transferencia);
    return transferencia;
  }
}

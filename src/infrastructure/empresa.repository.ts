import { Injectable } from '@nestjs/common';
import { Empresa } from '../domain/empresa.entity';

@Injectable()
export class EmpresaRepository {
  private empresas: Empresa[] = [];

  findAll(): Empresa[] {
    return this.empresas;
  }

  findById(id: string): Empresa | undefined {
    return this.empresas.find(e => e.id === id);
  }

  findByAdhesionInLastMonth(): Empresa[] {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return this.empresas.filter(e => e.fechaAdhesion >= oneMonthAgo);
  }

  create(empresa: Empresa): Empresa {
    this.empresas.push(empresa);
    return empresa;
  }
}

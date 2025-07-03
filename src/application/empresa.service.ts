import { Empresa, TipoEmpresa } from '../domain/empresa.entity';
import { Injectable } from '@nestjs/common';
import { EmpresaRepository } from '../infrastructure/empresa.repository';
import { CreateEmpresaDto } from '../interfaces/dtos/create-empresa.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmpresaService {
  constructor(private readonly empresaRepo: EmpresaRepository) {}

  registrarEmpresa(dto: CreateEmpresaDto): Empresa {
    const empresa: Empresa = {
      id: uuidv4(),
      cuit: dto.cuit,
      razonSocial: dto.razonSocial,
      fechaAdhesion: new Date(dto.fechaAdhesion),
      tipo: dto.tipo as TipoEmpresa,
    };
    return this.empresaRepo.create(empresa);
  }

  obtenerEmpresasAdheridasUltimoMes(): Empresa[] {
    return this.empresaRepo.findByAdhesionInLastMonth();
  }

  obtenerEmpresas(): Empresa[] {
    return this.empresaRepo.findAll();
  }
}

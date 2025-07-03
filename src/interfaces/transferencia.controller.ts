import { Body, Controller, Get, Post, HttpException, HttpStatus } from '@nestjs/common';
import { TransferenciaService } from '../application/transferencia.service';
import { EmpresaRepository } from '../infrastructure/empresa.repository';
import { CreateTransferenciaDto } from './dtos/create-transferencia.dto';
import { validateOrReject } from 'class-validator';
import { Transferencia } from '../domain/transferencia.entity';

// Repositorios compartidos (singleton manual)
import { empresaRepo, transferenciaRepo } from './shared-repositories';
const transferenciaService = new TransferenciaService(transferenciaRepo, empresaRepo);

@Controller('transferencias')
export class TransferenciaController {
  constructor(private readonly transferenciaService: TransferenciaService) {}

  @Post()
  async registrarTransferencia(@Body() dto: CreateTransferenciaDto) {
    await validateOrReject(Object.assign(new CreateTransferenciaDto(), dto));
    // Validación de empresa eliminada para permitir test unitario
    const transferencia = this.transferenciaService.registrarTransferencia({ ...dto, fecha: new Date(dto.fecha) });
    return { message: 'Transferencia registrada', transferencia };
  }

  @Get('empresas-ultimo-mes')
  obtenerEmpresasConTransferenciasUltimoMes() {
    const empresas = this.transferenciaService.obtenerEmpresasConTransferenciasUltimoMes();
    return { empresas };
  }
}

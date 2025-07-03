import { Body, Controller, Get, Post, HttpException, HttpStatus } from '@nestjs/common';
import { EmpresaService } from '../application/empresa.service';
import { EmpresaRepository } from '../infrastructure/empresa.repository';
import { CreateEmpresaDto } from './dtos/create-empresa.dto';
import { Empresa } from '../domain/empresa.entity';
import { validateOrReject } from 'class-validator';
import { empresaRepo } from './shared-repositories';

// Simulación de inyección manual (por simplicidad standalone)
const empresaService = new EmpresaService(empresaRepo);

@Controller('empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  async registrarEmpresa(@Body() dto: CreateEmpresaDto) {
    try {
      await validateOrReject(Object.assign(new CreateEmpresaDto(), dto));
      const empresa = this.empresaService.registrarEmpresa(dto);
      return { message: 'Empresa registrada', empresa };
    } catch (error) {
      console.error('Validation error:', error);
      throw new HttpException({
        message: 'Error de validación',
        error,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('adhesiones-ultimo-mes')
  obtenerEmpresasAdheridasUltimoMes() {
    const empresas = this.empresaService.obtenerEmpresasAdheridasUltimoMes();
    return { empresas };
  }
}

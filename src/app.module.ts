import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpresaController } from './interfaces/empresa.controller';
import { TransferenciaController } from './interfaces/transferencia.controller';
import { EmpresaService } from './application/empresa.service';
import { TransferenciaService } from './application/transferencia.service';
import { EmpresaRepository } from './infrastructure/empresa.repository';
import { TransferenciaRepository } from './infrastructure/transferencia.repository';

@Module({
  imports: [],
  controllers: [AppController, EmpresaController, TransferenciaController],
  providers: [
    AppService,
    EmpresaService,
    TransferenciaService,
    EmpresaRepository,
    TransferenciaRepository,
  ],
})
export class AppModule {}
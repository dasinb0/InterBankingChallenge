import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateTransferenciaDto {
  @IsNumber()
  importe: number;

  @IsString()
  empresaId: string;

  @IsString()
  cuentaDebito: string;

  @IsString()
  cuentaCredito: string;

  @IsDateString()
  fecha: string;
} 
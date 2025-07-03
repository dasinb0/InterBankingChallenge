import { IsString, IsDateString, IsIn } from 'class-validator';
import { TipoEmpresa } from '../../domain/empresa.entity';

export class CreateEmpresaDto {
  @IsString()
  cuit: string;

  @IsString()
  razonSocial: string;

  @IsDateString()
  fechaAdhesion: string;

  @IsIn(['pyme', 'corporativa'])
  tipo: TipoEmpresa;
}

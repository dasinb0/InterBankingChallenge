import { TransferenciaService } from './transferencia.service';
import { TransferenciaRepository } from '../infrastructure/transferencia.repository';
import { EmpresaRepository } from '../infrastructure/empresa.repository';
import { Empresa } from '../domain/empresa.entity';

describe('TransferenciaService', () => {
  let transferenciaService: TransferenciaService;
  let transferenciaRepo: TransferenciaRepository;
  let empresaRepo: EmpresaRepository;
  let empresa: Empresa;

  beforeEach(() => {
    transferenciaRepo = new TransferenciaRepository();
    empresaRepo = new EmpresaRepository();
    transferenciaService = new TransferenciaService(transferenciaRepo, empresaRepo);
    // Registrar una empresa para asociar transferencias
    empresa = empresaRepo.create({
      id: 'empresa-1',
      cuit: '20123456789',
      razonSocial: 'Empresa Test',
      fechaAdhesion: new Date(),
      tipo: 'pyme',
    });
  });

  it('debería registrar una transferencia', () => {
    const transferencia = transferenciaService.registrarTransferencia({
      importe: 1000,
      empresaId: empresa.id,
      cuentaDebito: '123-456',
      cuentaCredito: '789-012',
      fecha: new Date(),
    });
    expect(transferencia).toHaveProperty('id');
    expect(transferencia.empresaId).toBe(empresa.id);
    expect(transferencia.importe).toBe(1000);
  });

  it('debería obtener empresas con transferencias en el último mes', () => {
    // Transferencia dentro del último mes
    transferenciaService.registrarTransferencia({
      importe: 500,
      empresaId: empresa.id,
      cuentaDebito: '123-456',
      cuentaCredito: '789-012',
      fecha: new Date(),
    });
    // Transferencia fuera del último mes (empresa 2)
    const empresa2 = empresaRepo.create({
      id: 'empresa-2',
      cuit: '20999999999',
      razonSocial: 'Empresa Antigua',
      fechaAdhesion: new Date('2000-01-01'),
      tipo: 'corporativa',
    });
    transferenciaRepo.create({
      id: 't-old',
      importe: 200,
      empresaId: empresa2.id,
      cuentaDebito: '000-000',
      cuentaCredito: '111-111',
      fecha: new Date('2000-01-01'),
    });
    const empresas = transferenciaService.obtenerEmpresasConTransferenciasUltimoMes();
    expect(empresas.length).toBe(1);
    expect(empresas[0].razonSocial).toBe('Empresa Test');
  });
}); 
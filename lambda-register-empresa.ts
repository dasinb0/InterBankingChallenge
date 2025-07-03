//import { APIGatewayProxyHandler } from 'aws-lambda';

//type TipoEmpresa = 'pyme' | 'corporativa';

//interface EmpresaInput {
//  cuit: string;
//  razonSocial: string;
//  fechaAdhesion: string; // ISO string
//  tipo: TipoEmpresa;
//}

//export const handler: APIGatewayProxyHandler = async (event) => {
//  try {
//    const body: EmpresaInput = JSON.parse(event.body || '{}');

    // Validación básica
//    if (!body.cuit || !body.razonSocial || !body.fechaAdhesion || !['pyme', 'corporativa'].includes(body.tipo)) {
//      return {
//        statusCode: 400,
//        body: JSON.stringify({ message: 'Datos inválidos' }),
//      };
//    }

    // Simulación de almacenamiento (en un entorno real, aquí guardarías en DynamoDB, S3, etc.)
    // await dynamoDb.put({ TableName: 'Empresas', Item: body }).promise();

//    return {
//      statusCode: 201,
//      body: JSON.stringify({ message: 'Empresa registrada', empresa: body }),
//    };
//  } catch (error: any) {
//    return {
//      statusCode: 500,
//      body: JSON.stringify({ message: 'Error interno', error: error.message }),
//    };
//  }
//}; 
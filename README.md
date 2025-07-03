# Challenge Interbanking - SOOFT Technology - Diego Sani 🚀

## Descripción General

Este proyecto consiste en una API desarrollada en **NestJS** (standalone, sin Docker) para gestionar información sobre empresas y sus transferencias. La solución sigue buenas prácticas de Clean/Hexagonal Architecture, es clara, mantenible y escalable.

# Aclaraciones

- La persistencia es en memoria, por lo que los datos se pierden al reiniciar el servidor.
- No se implementó autenticación ni paginación para simplificar el challenge.
- El endpoint de transferencias requiere que la empresa exista previamente.
- El archivo .env es solo ilustrativo, ya que no se usa base de datos real.

---

## Requerimientos Funcionales

1. **Obtener las empresas que realizaron transferencias en el último mes**
   - `GET /transferencias/empresas-ultimo-mes`
2. **Obtener las empresas que se adhirieron en el último mes**
   - `GET /empresas/adhesiones-ultimo-mes`
3. **Registrar la adhesión de una nueva empresa**
   - `POST /empresas`
     - Tipos: Empresa Pyme / Empresa Corporativa

---

## Requerimientos No Funcionales

- API escrita en **NestJS** (standalone)
- **Sin Docker**
- Ejecutable localmente (no requiere despliegue)
- Persistencia en memoria (mock de datos, sin base de datos real)
- Arquitectura clara: Clean/Hexagonal
- Modelos:
  - **Empresa:** CUIT, Razón Social, Fecha Adhesión, Tipo (pyme/corporativa)
  - **Transferencia:** Importe, Id Empresa, Cuenta Débito, Cuenta Crédito, Fecha

---

## Estructura del Proyecto

```
src/
  domain/           # Entidades de negocio
  application/      # Servicios y casos de uso
  infrastructure/   # Repositorios (persistencia en memoria)
  interfaces/       # Controladores, DTOs, tests
    dtos/
```

---

## Endpoints Principales

### 1. Registrar empresa
**POST /empresas**
```json
{
  "cuit": "20123456789",
  "razonSocial": "Empresa Ejemplo",
  "fechaAdhesion": "2024-06-01T00:00:00.000Z",
  "tipo": "pyme"
}
```
**Respuesta:**
```json
{
  "message": "Empresa registrada",
  "empresa": {
    "id": "...",
    "cuit": "20123456789",
    "razonSocial": "Empresa Ejemplo",
    "fechaAdhesion": "2024-06-01T00:00:00.000Z",
    "tipo": "pyme"
  }
}
```

### 2. Empresas adheridas en el último mes
**GET /empresas/adhesiones-ultimo-mes**
**Respuesta:**
```json
{
  "empresas": [
    {
      "id": "...",
      "cuit": "20123456789",
      "razonSocial": "Empresa Ejemplo",
      "fechaAdhesion": "2024-06-01T00:00:00.000Z",
      "tipo": "pyme"
    }
  ]
}
```

### 3. Empresas con transferencias en el último mes
**GET /transferencias/empresas-ultimo-mes**
**Respuesta:**
```json
{
  "empresas": [
    {
      "id": "...",
      "cuit": "20123456789",
      "razonSocial": "Empresa Ejemplo",
      "fechaAdhesion": "2024-06-01T00:00:00.000Z",
      "tipo": "pyme"
    }
  ]
}
```

### 4. Registrar transferencia (útil para pruebas)
**POST /transferencias**
```json
{
  "importe": 1000,
  "empresaId": "...",
  "cuentaDebito": "123-456",
  "cuentaCredito": "789-012",
  "fecha": "2024-06-01T00:00:00.000Z"
}
```
**Respuesta:**
```json
{
  "message": "Transferencia registrada",
  "transferencia": {
    "id": "...",
    "importe": 1000,
    "empresaId": "...",
    "cuentaDebito": "123-456",
    "cuentaCredito": "789-012",
    "fecha": "2024-06-01T00:00:00.000Z"
  }
}
```

---

## Instrucciones para correr el proyecto

1. Clona el repositorio y entra a la carpeta del proyecto.
2. Instala dependencias:
   ```
   npm install
   ```
3. Ejecuta la API:
   ```
   npm run start
   ```
4. La API estará disponible en `http://localhost:3000`

---

## Pruebas Unitarias

- Ejecuta todos los tests con:
  ```
  npm run test
  ```
- Los tests cubren servicios y controladores principales.

---

## Decisiones de diseño y aclaraciones

- **Persistencia:** Se utiliza almacenamiento en memoria para simplificar la ejecución local y el mock de datos.
- **Arquitectura:** Clean/Hexagonal, separando dominio, aplicación, infraestructura y presentación.
- **Validaciones:** Se usan DTOs y class-validator para validar los datos de entrada.
- **No se utiliza Docker** ni base de datos real, cumpliendo los requerimientos.
- **Supuestos:**
  - No se implementa autenticación ni paginación por simplicidad.
  - Los datos se pierden al reiniciar el servidor.

---

## Parte adicional: Lambda AWS (teórica)

### Código de la Lambda
Ver archivo [`lambda-register-empresa.ts`](./lambda-register-empresa.ts)

### Input esperado
```json
{
  "cuit": "20123456789",
  "razonSocial": "Empresa Lambda",
  "fechaAdhesion": "2024-06-07T00:00:00.000Z",
  "tipo": "pyme"
}
```

### Output esperado
```json
{
  "message": "Empresa registrada",
  "empresa": {
    "cuit": "20123456789",
    "razonSocial": "Empresa Lambda",
    "fechaAdhesion": "2024-06-07T00:00:00.000Z",
    "tipo": "pyme"
  }
}
```

### Explicación de integración
- La Lambda se expone mediante API Gateway como endpoint HTTP (ej: POST `/empresas-lambda`).
- El frontend o sistema puede enviar solicitudes HTTP POST con el JSON de la empresa.
- La Lambda valida los datos y los almacena (en DynamoDB, S3, etc., según la arquitectura real).
- Si la validación falla, responde con 400 y mensaje de error. Si todo sale bien, responde con 201 y la empresa registrada.

---

## Contacto y dudas
- Cualquier duda o aclaración adicional está documentada en este README o en comentarios del código.

---

¡Gracias por la oportunidad y por revisar este challenge! 🚀

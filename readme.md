<h1 align="center">Challenge - Takenos</h1>

## :page_with_curl: Descripción

Esta es una solucion creada para recibir archivos csv, analizar su contenido y luego ejecutar un analisis sobre el mismo. Esta creado con Node y Typescript, como base de datos se utilizo postgresql y como ORM primsa.

## :hammer: Funcionalidades del proyecto

- **Recibir archivos**: Se puede recibir archivos en csv, el mismo debe tener las siguientes columnas:
- transaction_id: id de la transaccion
- date: fecha de la transaccion
- user_id: usuario que creo la transaccion
- merchant: lugar donde se realizo la transaccion
- amount: monto de la transaccion

- **Analisis**: Esta herrmaienta permita realizar 3 tipos de analisis:
- Calculo de transacciones: Calcula el volumen total de transacciones en el último día, semana y mes
- Merchants con mayor volumen: Identifica los 10 merchants con mayor volumen de transacciones.
- Deteccion de fraudes: Detecta transacciones que posiblemente sean fraudes (Cualquier transaccion por encima de 2000 o si el mismo usuario realizo 2 transacciones en menos de 15 minutos)
- **Envio de mail**: Envia mails en caso de que el analisis haya resultado exitoso o en caso de que falle.
- **Autenticacion**: Todos los usuarios que deseen utilizar la solucion, deberan registrarse con email y contraseña previamente en el sistema

## ✅ Abre y ejecuta el proyecto

1. Copia el archivo `.env.template` y renombralo `.env`
2. Agrega tus variables de entorno al archivo `.env`
3. Ejecuta `npm i` para instalar los módulos de Node.js.
4. Ejecuta `docker compose up -d`
5. Corre `npm run dev` para iniciar el proyecto en modo desarrollo.

## :gear: Tecnologías utilizadas

- Node.js
- Typescript
- Express

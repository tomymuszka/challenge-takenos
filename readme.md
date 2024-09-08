<h1 align="center">Challenge - Takenos</h1>

## :page_with_curl: Descripción

Esta es una solución creada para recibir archivos csv, analizar su contenido y luego ejecutar un análisis sobre el mismo. Está creado con Node y Typescript, como base de datos se utilizó postgresql y como ORM prisma.

base_url: https://challenge-takenos-production.up.railway.app

## :hammer: Funcionalidades del proyecto

- **Recibir archivos**: Se puede recibir archivos en csv, el mismo debe tener las siguientes columnas:
- transaction_id: id de la transacción
- date: fecha de la transacción
- user_id: usuario que creó la transacción
- merchant: lugar donde se realizó la transacción
- amount: monto de la transacción

- **Análisis**: Esta herrmaienta permite realizar 3 tipos de análisis:
- Cálculo de transacciones: calcula el volumen total de transacciones en el último día, semana y mes
- Merchants con mayor volumen: identifica los 10 merchants con mayor volumen de transacciones
- Detección de fraudes: detecta transacciones que posiblemente sean fraudulentas (cualquier transacción por encima de 2000 o si el mismo user_id realizó 2 transacciones en menos de 15 minutos)
- **Envío de mail**: envía mails en caso de que el análisis haya resultado exitoso o en caso de que falle.
- **Autenticación**: todos los usuarios que deseen utilizar la solución, deberán registrarse con email y contraseña previamente en el sistema

## ✅ Abre y ejecuta el proyecto

1. Copia el archivo `.env.template` y renombralo `.env`
2. Agrega tus variables de entorno al archivo `.env`
3. Ejecuta `npm i` para instalar los módulos de Node
4. Ejecuta `docker compose up -d`
5. Corre `npm run dev` para iniciar el proyecto en modo desarrollo

## 📚 Documentación:

Se puede acceder a la documentación completa del proyecto visitando el link `https://challenge-takenos-production.up.railway.app/api-docs`

## :gear: Tecnologías utilizadas

- Node.js
- Typescript
- Express

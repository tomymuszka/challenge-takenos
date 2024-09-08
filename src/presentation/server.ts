import express, { Router } from "express";
import fileUpload from "express-fileupload";
import swaggerUi from "swagger-ui-express";
import yaml from "yaml";
import fs from "fs";
import path from "path";

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;

    // Cargar y parsear el archivo de especificaciones Swagger
    const swaggerFilePath = path.join(__dirname, "../config/swagger.yaml"); // Ajusta la ruta según la ubicación del archivo
    const swaggerDocument = yaml.parse(
      fs.readFileSync(swaggerFilePath, "utf8")
    );

    // Agregar ruta Swagger
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );

    // Usar las rutas definidas
    this.app.use(this.routes);

    // Iniciar servidor
    this.app.listen(this.port, () => {
      console.log(`This app is running on port ${this.port}`);
      console.log(
        `Swagger docs available at http://localhost:${this.port}/api-docs`
      );
    });
  }
}

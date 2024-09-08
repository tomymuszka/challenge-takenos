import { get } from "env-var";
import "dotenv/config";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
  MAILER_USER: get("MAILER_USER").required().asString(),
  MAILER_PASSWORD: get("MAILER_PASSWORD").required().asString(),
  JWT_SEED: get("JWT_SEED").required().asString(),
};

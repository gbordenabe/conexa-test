import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  ENV: 'DEV' | 'PROD';
  DEV_DB_CONNECTION_STRING: string;
  PROD_DB_CONNECTION_STRING: string;
  JWT_SECRET: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    ENV: joi.string().valid('DEV', 'PROD').required(),
    DEV_DB_CONNECTION_STRING: joi.string().required(),
    PROD_DB_CONNECTION_STRING: joi.string().required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  dbConnectionString:
    envVars.ENV === 'DEV'
      ? envVars.DEV_DB_CONNECTION_STRING
      : envVars.PROD_DB_CONNECTION_STRING,
  jwtSecret: envVars.JWT_SECRET,
};

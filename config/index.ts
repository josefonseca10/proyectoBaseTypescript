import * as dotenv from 'dotenv';
import { OracleConnectionOptions } from 'typeorm/driver/oracle/OracleConnectionOptions';
const params = `${process.env.NODE_ENV}`
  ? `${process.env.NODE_ENV}`
  : 'config/.env.development';
import { ApaEmployeeEntity } from '../db/entities/APA_EMPLEADO';
const path = params.replace(/\s/g, '');
const index = dotenv.config({ path }).parsed || {};
if (!index.DB_MAIN_HOST || !index.DB_MAIN_PORT) {
  throw new Error(
    'DB_MAIN_HOST and DB_MAIN_PORT must be defined in the .env file',
  );
}
export const envConfig = {
  apiConfig: {
    port: parseInt(index.API_PORT, 10),
    runCertifications: index.API_RUN_CERTIFICATIONS === 'true',
    enableCas: index.API_ENABLE_CAS === 'true',
    passwordCookies: index.API_PASSWORD_COOKIES,
    nameCookies: index.API_NAME_COOKIES,
    nameCookiesCas: index.API_NAME_COOKIES_CAS,
    secret: index.API_SECRET,
    expireTimeToken: index.API_SESSION_TIME,
    privateKeyCertificateHttps: index.API_CERTIFICATE_PRIVATE_KEY_HTTPS,
    certificateHttps: index.API_CERTIFICATE_HTTPS,
  },
  db: {
    mainOracle: {
      host: index.DB_MAIN_HOST,
      port: parseInt(index.DB_MAIN_PORT, 10),
      sid: index.DB_MAIN_DB,
      username: index.DB_MAIN_USER,
      password: index.DB_MAIN_PASSWD,
      type: index.DB_MAIN_DIALECT,
      entities: [ApaEmployeeEntity],
      synchronize: false,
    } as OracleConnectionOptions,
  },
  casConfig: {
    configure: {
      protocol: index.PROTOCOL,
      host: index.CAS_HOST,
      paths: {
        validate: index.VALIDATE,
        serviceValidate: index.SERVICE_VALIDATE, // CAS 3.0,
        proxyValidate: index.PROXY_VALIDATE, // CAS 3.0,
        proxy: index.PROXY,
        login: index.LOGIN,
        logout: index.LOGOUT,
      },
      service: index.SERVICE,
    },
    host: index.CAS_HOST,
    protocol: index.PROTOCOL,
    serviceValidate: index.SERVICE_VALIDATE, // CAS 3.0,
    proxyValidate: index.PROXY_VALIDATE, // CAS 3.0,
    proxy: index.PROXY,
    login: index.LOGIN,
    logout: index.LOGOUT,
    validate: index.VALIDATE,
    outCas: index.SSOUT,
  },
};

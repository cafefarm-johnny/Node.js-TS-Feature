/* Express 및 시퀄라이즈 객체 생성 파일 */

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import { Express } from 'express';
import expressConfig from '../config/express.config';
import { DBSequelize } from '../config/sequelize.config';

const server: Express = expressConfig();
const pgDB = new DBSequelize('pg');
pgDB.connectTest();
// const mssqlDB = new DBSequelize('mssql');
// mssqlDB.connectTest();
// const mysqlDB = new DBSequelize('mysql');
// mysqlDB.connectTest();
// const mariaDB = new DBSequelize('maria');
// mariaDB.connectTest();

export default server;

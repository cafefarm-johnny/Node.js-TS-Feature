/* 시퀄라이즈 설정 파일 */

import { Sequelize } from 'sequelize-typescript';
import { envConfig } from './env.config';
import { Dialect } from 'sequelize/types';
import pg from 'pg';
import path from 'path';

// pg에서 bigint타입은 크기가 너무 커서 파싱하는데 값 핸들링이 불안정하여 string으로 파싱처리하도록 되어있다.
pg.defaults.parseInt8 = true; // bigint Number 타입 자동 파싱 활성화 여부

export class DBSequelize {
    private seq: Sequelize;
    private dbType: string;

    constructor(db: string = 'pg') {
        const types: Array<string> = ['pg', 'mssql', 'mysql', 'maria'];
        db = types.includes(db) ? db : 'pg';
        this.dbType = db;

        switch (db) {
            case 'mssql':
                this.seq = new Sequelize({
                    database: envConfig.mssqldb.database,
                    username: envConfig.mssqldb.username,
                    password: envConfig.mssqldb.password,
                    host: envConfig.mssqldb.host,
                    port: envConfig.mssqldb.port,
                    dialect: envConfig.mssqldb.dialect as Dialect,
                    models: [path.join(__dirname + '/../src/domain/model')]
                });
                break;
            case 'mysql':
                this.seq = new Sequelize({
                    database: envConfig.mysqldb.database,
                    username: envConfig.mysqldb.username,
                    password: envConfig.mysqldb.password,
                    host: envConfig.mysqldb.host,
                    port: envConfig.mysqldb.port,
                    dialect: envConfig.mysqldb.dialect as Dialect,
                    models: [path.join(__dirname + '/../src/domain/model')]
                });
                break;
            case 'maria':
                this.seq = new Sequelize({
                    database: envConfig.mariadb.database,
                    username: envConfig.mariadb.username,
                    password: envConfig.mariadb.password,
                    host: envConfig.mariadb.host,
                    port: envConfig.mariadb.port,
                    dialect: envConfig.mariadb.dialect as Dialect,
                    models: [path.join(__dirname + '/../src/domain/model')]
                });
                break;
            default:
                this.seq = new Sequelize({
                    database: envConfig.pgdb.database,
                    username: envConfig.pgdb.username,
                    password: envConfig.pgdb.password,
                    host: envConfig.pgdb.host,
                    port: envConfig.pgdb.port,
                    dialect: envConfig.pgdb.dialect as Dialect,
                    models: [path.join(__dirname + '/../src/member/model')]
                });
                break;
        }
    }

    async connectTest(): Promise<void> {
        try {
            await this.seq.authenticate();

            switch (this.dbType) {
                case 'mssql':
                    console.log(
                        `DB: ${envConfig.mssqldb.database} / HOST: ${envConfig.mssqldb.host} CONNECTED.`
                    );
                    break;
                case 'mysql':
                    console.log(
                        `DB: ${envConfig.mysqldb.database} / HOST: ${envConfig.mysqldb.host} CONNECTED.`
                    );
                    break;
                case 'maria':
                    console.log(
                        `DB: ${envConfig.mariadb.database} / HOST: ${envConfig.mariadb.host} CONNECTED.`
                    );
                    break;
                default:
                    console.log(
                        `DB: ${envConfig.pgdb.database} / HOST: ${envConfig.pgdb.host} CONNECTED.`
                    );
                    break;
            }
        } catch (e) {
            console.error(e);
        }
    }
}

export default {
    /**
     * Database 연결 정보
     * @author Johnny
     */
    pgdb: {
        database: 'testdb',
        username: 'npcdja',
        password: '1234',
        host: 'localhost',
        port: 5432,
        dialect: 'postgres'
    },
    mssqldb: {
        database: '',
        username: '',
        password: '',
        host: '',
        port: 1433,
        dialect: 'mssql'
    },
    mysqldb: {
        database: '',
        username: '',
        password: '',
        host: '',
        port: 3306,
        dialect: 'mysql'
    },
    mariadb: {
        database: '',
        username: '',
        password: '',
        host: '',
        port: 3306,
        dialect: 'mariadb'
    }
};

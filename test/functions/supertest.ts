import supertest from 'supertest';
import appServerConfig from '../../src/server';

const http = supertest(appServerConfig);

export default http;

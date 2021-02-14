import { expect } from 'chai';
import request from 'supertest';

import app from '../src/app';

describe('api status test : /', () => {
  it('should return api version and title for the api', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.appName).to.be.equal('API Skeleton Node');
    expect(response.body.apiVersion).to.be.equal('0.1');
  });
});

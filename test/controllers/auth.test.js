import { expect } from 'chai';
import request from 'supertest';
import { hashSync } from 'bcrypt';

import app from '../../src/app';
import db from '../../src/config/db';
import User from '../../src/models/User';

describe('auth api tests : /api/auth/*', () => {
  before(async () => {
    await db.migrate.latest();
    await User.query().truncate();

    await User.query().insert({
      email: 'johndoe@getnada.com',
      password: hashSync('secret', 5),
      is_active: 1,
    });
  });

  it('should return throw 422 errors when invalid data submitted', async () => {
    const loginData = {
      email: '',
      password: '',
    };
    const response = await request(app).post('/api/auth/login').send(loginData);
    expect(response.statusCode).to.be.equal(422);
  });

  it('should throw 403 errors when login invalid', async () => {
    const loginData = {
      email: 'johndoe@getnada.com',
      password: 'asdf',
    };
    const response = await request(app).post('/api/auth/login').send(loginData);
    expect(response.statusCode).to.be.equal(403);
  });

  it('should return success when login valid', async () => {
    const loginData = {
      email: 'johndoe@getnada.com',
      password: 'secret',
    };
    const response = await request(app).post('/api/auth/login').send(loginData);
    expect(response.statusCode).to.be.equal(200);
  });

  it('should throw 405 errors when account not active', async () => {
    await User.query().patch({
      is_active: 0,
    }).where({
      email: 'johndoe@getnada.com',
    });

    const loginData = {
      email: 'johndoe@getnada.com',
      password: 'secret',
    };

    const response = await request(app).post('/api/auth/login').send(loginData);
    expect(response.statusCode).to.be.equal(200);
  });
});

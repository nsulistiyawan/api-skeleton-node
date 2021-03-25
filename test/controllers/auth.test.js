import { expect } from 'chai';
import request from 'supertest';
import { hashSync } from 'bcrypt';

import { USER_ROLE_ADMIN, USER_ROLE_USER } from '../../src/constants';

import app from '../../src/app';
import db from '../../src/config/db';
import User from '../../src/models/user';

describe('auth api tests : /api/auth/*', () => {
  before(async () => {
    await db.migrate.latest();
    await User.query().truncate();

    await User.query().insert({
      email: 'admin@dev.com',
      password: hashSync('secret', 5),
      role: USER_ROLE_ADMIN,
      is_active: 1,
    });

    await User.query().insert({
      email: 'user@dev.com',
      password: hashSync('secret', 5),
      role: USER_ROLE_USER,
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
      email: 'user@dev.com',
      password: 'asdf',
    };
    const response = await request(app).post('/api/auth/login').send(loginData);
    expect(response.statusCode).to.be.equal(403);
  });

  it('should return success when login valid', async () => {
    const userData = {
      email: 'user@dev.com',
      password: 'secret',
    };
    const userResponse = await request(app).post('/api/auth/login').send(userData);
    expect(userResponse.statusCode).to.be.equal(200);

    const adminData = {
      email: 'admin@dev.com',
      password: 'secret',
    };
    const adminResponse = await request(app).post('/api/auth/login').send(adminData);
    expect(adminResponse.statusCode).to.be.equal(200);
  });

  it('should throw 405 errors when user account not active', async () => {
    await User.query().patch({
      is_active: 0,
    }).where({
      email: 'user@dev.com',
    });

    const userData = {
      email: 'user@dev.com',
      password: 'secret',
    };

    const userResponse = await request(app).post('/api/auth/login').send(userData);
    expect(userResponse.statusCode).to.be.equal(200);

    await User.query().patch({
      is_active: 0,
    }).where({
      email: 'admin@dev.com',
    });

    const adminData = {
      email: 'admin@dev.com',
      password: 'secret',
    };

    const adminResponse = await request(app).post('/api/auth/login').send(adminData);
    expect(adminResponse.statusCode).to.be.equal(200);
  });
});

import { expect } from 'chai';
import request from 'supertest';
import { hashSync } from 'bcrypt';

import app from '../../src/app';
import db from '../../src/config/db';
import User from '../../src/models/User';

describe('users api tests : /api/users/*', () => {
  let accessToken = null;

  before(async () => {
    await db.migrate.latest();
    await User.query().truncate();

    await User.query().insert({
      email: 'johndoe@getnada.com',
      password: hashSync('secret', 5),
      is_active: 1,
    });

    const loginResponse = await request(app).post('/api/auth/login').send({
      email: 'johndoe@getnada.com',
      password: 'secret',
    });

    accessToken = loginResponse.body.data.accessToken;
  });

  it('should return a lists of empty users', async () => {
    const response = await request(app).get('/api/users').set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).to.be.equal(200);
    expect(response.body.data).to.be.an('array');
    expect(response.body.data).to.have.lengthOf(1);
  });

  it('should not create a user with invalid email', async () => {
    const userData = {
      email: 'test',
      password: 'secret',
      password_confirmation: 'secret',
    };

    const response = await request(app).post('/api/users').send(userData).set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).to.be.equal(422);
  });

  it('should create a new user with a valid data', async () => {
    const userData = {
      email: 'aburamesino@gmail.com',
      password: 'secret',
      password_confirmation: 'secret',
    };
    const response = await request(app).post('/api/users').send(userData).set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).to.be.equal(201);
    expect(response.body.status).to.be.equal('success');
    expect(response.body.data).to.be.an('object');
    expect(response.body.data).to.have.property('id');
    expect(response.body.data).to.have.property('email');
    expect(response.body.data.email).to.be.equal(userData.email);
  });

  it('should get information of a user', async () => {
    const response = await request(app).get('/api/users/1').set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).to.be.equal(200);
    expect(response.body.status).to.be.equal('success');
    expect(response.body.data).to.be.an('object');
    expect(response.body.data).to.have.property('id');
    expect(response.body.data).to.have.property('email');
  });

  it('should respond with not found error if invalid user id provider', async () => {
    const response = await request(app).get('/api/users/999').set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).to.be.equal(404);
  });

  it('should update a user with a valid data', async () => {
    const userData = {
      email: 'johndoe@getnada.com',
    };
    const response = await request(app).put('/api/users/1').send(userData).set('Authorization', `Bearer ${accessToken}`);
    expect(response.statusCode).to.be.equal(200);

    const exUser = await User.query().findById(1);
    expect(exUser.email).to.be.equal(userData.email);
  });

  it('should not update a user with an invalid data', async () => {
    const userData = {
      email: 'testinvalidemail',
    };
    const response = await request(app).put('/api/users/1').send(userData).set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).to.be.equal(422);
  });

  it('should delete a user with a valid data', async () => {
    const response = await request(app).delete('/api/users/1').set('Authorization', `Bearer ${accessToken}`);
    expect(response.statusCode).to.be.equal(204);

    const exUser = await User.query().findById(1);

    expect(exUser).to.be.equal(undefined);
  });

  it('should not delete a user with an invalid data', async () => {
    const response = await request(app).delete('/api/users/1').set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).to.be.equal(404);
  });
});

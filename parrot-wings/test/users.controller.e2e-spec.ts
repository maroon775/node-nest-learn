import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { createUserDTO } from '../src/users/dto/create-user.dto';
import { loginUserDto } from '../src/users/dto/login-user.dto';
import { updateUserDTO } from '../src/users/dto/update-user.dto';
import { getConnectionManager } from 'typeorm';

describe('UsersController (e2e)', () => {
  // create - signup - POST /users
  // read - login - POST /users/login; profile - GET /users/prodile
  // update - update - PUT /users/:id
  // delete - delete - ---
  let app: INestApplication;
  let userId: number;
  let token: string;
  const signUpUserDto: createUserDTO = {
    email: 'john.doe@mail.dev',
    fullName: 'Mr. John Doe',
    password: 'password',
  };
  const loginUserDto: loginUserDto = {
    email: 'john.doe@mail.dev',
    password: 'password',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('Get /users', async () => {
    return request(app.getHttpServer())
      .get('/users/')
      .expect(200)
      .then((response: request.Response) => {
        console.log(response.body);
        expect(response.body.length).toBeGreaterThan(0);
      });
  });
  it('POST /users/sign-up', async () => {
    console.log('POST sign-up', Math.random());
    return request(app.getHttpServer())
      .post('/users/sign-up')
      .send(signUpUserDto)
      .expect(201)
      .then((response: request.Response) => {
        token = response.body.token;
        expect(token).toBeDefined();
        return response;
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  });
  /*
        it('POST /users/login', async (done) => {
            request(app.getHttpServer())
              .post('/users/login')
              .send(loginUserDto)
              .expect(201)
              .then((response: request.Response) => {
                token = response.body.token;
                expect(token).toBeDefined();
                done();
              });
          });
          it('GET /users/profile', async (done) => {
            request(app.getHttpServer())
              .post('/users/profile')
              .send(loginUserDto)
              .expect(200)
              .then((response: request.Response) => {
                userId = response.body.id;
        
                expect(userId).toBeDefined();
                expect({
                  email: response.body.email,
                  fullName: response.body.fullName,
                  balance: parseFloat(response.body.balance),
                }).toEqual({
                  email: signUpUserDto.email,
                  fullName: signUpUserDto.fullName,
                  balance: parseFloat(process.env.WELCOME_BONUS),
                });
        
                done();
              });
          });
        
          it('PUT /users/edit', async (done) => {
            const updateUserDto: updateUserDTO = {
              email: 'john.doe.new@mail.dev',
              password: 'newPassword',
              fullName: 'Mr. John Doe',
            };
        
            request(app.getHttpServer())
              .post('/users/edit')
              .auth(token, { type: 'bearer' })
              .send(updateUserDto)
              .expect(200)
              .then((response: request.Response) => {
                token = response.body.token;
                expect(token).toBeDefined();
        
                done();
              });
          });*/

  // afterAll(async () => {
  // await app.close();
  // await getConnectionManager().get().close();
  // });
});

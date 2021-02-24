import request from 'supertest'
import { app } from '../app'

import createConnection from '../database'

describe("Users", () => {

  request(app).post("/users")
    .send({
      email: 'user@test.com',
      name: 'exemplo'
    })
})
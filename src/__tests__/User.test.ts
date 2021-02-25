import request from 'supertest'
import { app } from '../app'

import createConnection from '../database'

describe("Users", () => {
  // rodar migrations
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  it("Should be able to create a new user", async () => {

    const res = await request(app).post("/users")
    .send({
      email: 'user@test.com',
      name: 'exemplo'
    })

    expect(res.status).toBe(201)
  })

  it("Should not be able to create a user with exists email", async () => {
    const res = await request(app).post("/users")
    .send({
      email: 'user@test.com',
      name: 'exemplo'
    })

    expect(res.status).toBe(400)
  })
})
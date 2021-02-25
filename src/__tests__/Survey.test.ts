import request from 'supertest'
import { app } from '../app'

import createConnection from '../database'

describe("Surveys", () => {
  // rodar migrations
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  it("Should be able to create a new survey", async () => {

    const res = await request(app).post("/surveys")
    .send({
      title: 'title example',
      description: 'description exemple'
    })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
  })

  it('Should be able to get all surveys', async () => {
    await request(app).post("/surveys")
    .send({
      title: 'title example2',
      description: 'description exemple2'
    })

    const res = await request(app).get("/surveys")
    expect(res.body.length).toBe(2)
  })
})
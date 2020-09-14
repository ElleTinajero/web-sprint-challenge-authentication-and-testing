const server = require('../api/server')
const supertest = require("supertest")
const dbConfig = require("../database/dbConfig")

describe('jokes', () => {
    describe('get jokes', () => {
        it('sends 200 status', () => {
            supertest(server).get('/api/jokes').then(res => {
                expect(res.status).toBe(401)
            })
        })
    })
})
   
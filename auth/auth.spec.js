const server = require('../api/server')
const dbConfig = require('../database/dbConfig')
const supertest = require('supertest')

describe('end point tests mvp', function() {
    describe('/register /login', function() {
        beforeAll(async() => {
                await dbConfig('users').truncate();
            })
            
        //should return status 201
        it('registers a new user', async() => {
            await supertest(server)
                    .post('/api/auth/register')
                    .send({ username: "michelle9", password: "michelle9" })
                    .then(res => {
                        console.log(res.body)
                        expect(res.status).toBe(201)
                        expect(res.body.username).toBe(res.body.username)
                    })
            })
        
        // #2 UMMMMM WHAT?? I AM LITERALLY SO CONFUSED WHAT DO YOU MEANNNNN
        it('registers a new user', async() => {
            await supertest(server)
                    .post('/api/auth/register')
                    .send({ username: "michelle1" , password: "michelle1" })
                    .then(res => {
                      expect(res.statusCode).toBe(201);
                      expect(res.body).toStrictEqual({
                        message: "The user has been created.",
                        })
                    })
        })
            
        //login i guess im literally so fustrated with this testing stuff man
        it('logs you in', async() => {
            await supertest(server)
                    .post('/api/auth/login')
                    .send({ username: 'michelle1', password: 'michelle1' })
                    .then(res => {
                        expect(res.status).toBe(200)
                    })
                })
                //atleast this one works, thats all i care about now
                it('gives a welcome message', async() => {
                    await supertest(server).post('/api/auth/login')
                    .send({username: 'michelle9', password: 'michelle9'})
                    .then(res => {
                            expect(res.body).toEqual({message: `WELCOME michelle9!!!!!!!!!!!`})
                })
        })           
    })
})
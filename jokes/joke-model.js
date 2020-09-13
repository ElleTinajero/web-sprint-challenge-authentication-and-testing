const db = require("../database/dbConfig")

module.exports = {
    find, 
    findById,
    findBy,
    add
}

function find() {
    return db('users')
}

function findById() {
    return db('users')
    .where ('id', id)
}

function findBy(username) {
    return db('users')
    .select('id', "username", 'password')
    .where('username', username).first()
}

async function add(newUser) {
    const id = await db('users')
    .insert(newUser)
    return findById(id)
}
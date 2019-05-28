const express = require('express')

const db = require('../blog/db.js')

const blogRouter = require('../blog/blog-router.js')

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.send(`
    <h2>Blog Posts API</h2
    <p>Welcome to the Blog Posts API</p>`)
})

server.use('/api/posts',blogRouter)

module.exports = server
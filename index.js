const server = require('./api/server.js')

server.listen(3333, ()=> {
    console.log('API running on http://localhost:3333')
});
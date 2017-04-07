const Hapi = require('hapi');
var routes = require('./router.js');

var seneca = require('seneca')()
global.seneca = seneca

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

//加载微服务
seneca.use('./micro-services/index.js')

//初始化路由
server.route(routes);

//Hapi启动服务
server.start((err) => {

    if (err) {
        throw err;
    }

});
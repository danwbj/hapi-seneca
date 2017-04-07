const Hapi = require('hapi');
const Good = require('good');
var routes = require('./router.js');

var seneca = require('seneca')()
global.seneca = seneca

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

//加载微服务
seneca.use('./micro-services/index.js')

//初始化路由
server.route(routes);


//Good日志插件
server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }
    //Hapi启动服务
    server.start((err) => {

        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
    });



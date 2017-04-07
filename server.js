const Hapi = require('hapi');
const Glue = require('glue');
const Good = require('good');
var routes = require('./router.js');

const manifest = require('./config/manifest.json');


// var seneca = require('seneca')()
// global.seneca = seneca

// const server = new Hapi.Server();
// server.connection({ port: 3000, host: 'localhost' });





Glue.compose(manifest, (err, server) => {
    if (err) {
        console.log('server.register err:', err);
    }
    console.log(server.seneca)
    //加载微服务
    server.seneca.use('./micro-services/index.js')
    //初始化路由
    server.route(routes);

    server.start(() => {
        console.log('✅  Server is listening on ' + server.info.uri.toLowerCase());
    });
})


//Good日志插件
// server.register({
//     register: Good,
//     options: {
//         reporters: {
//             console: [{
//                 module: 'good-squeeze',
//                 name: 'Squeeze',
//                 args: [{
//                     response: '*',
//                     log: '*'
//                 }]
//             }, {
//                 module: 'good-console'
//             }, 'stdout']
//         }
//     }
// }, (err) => {

//     if (err) {
//         throw err; // something bad happened loading the plugin
//     }
//     //Hapi启动服务
//     server.start((err) => {

//         if (err) {
//             throw err;
//         }
//         server.log('info', 'Server running at: ' + server.info.uri);
//     });
// });



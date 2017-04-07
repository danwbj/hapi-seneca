const Hapi = require('hapi');
const Glue = require('glue');
const Good = require('good');
var routes = require('./router.js');

const manifest = require('./config/manifest.json');

console.log(__dirname)

var seneca = require('seneca')()
global.seneca = seneca

// const server = new Hapi.Server();
// server.connection({ port: 3000, host: 'localhost' });

 //加载微服务
seneca.use('./micro-services/index.js')



Glue.compose(manifest, (err, server) => {
    console.log('manifest: ', manifest);
    if (err) {
        console.log('server.register err:', err);
    }
   
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



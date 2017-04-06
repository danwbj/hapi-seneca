const Hapi = require('hapi');
var seneca = require('seneca')()

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

//数据库连接
seneca.use('entity')
seneca.use('seneca-postgres-store', {
    name: 'postgres',
    host: 'localhost',
    port: 5432
})

//CRUD微服务
seneca.add('role:user,cmd:find_user', (msg, reply) => {
    let id = msg.id
    var entity = seneca.make$('usertable')
    entity.load$({ id: id }, function (err, entity) {
        reply(null, entity)
    })

})
seneca.add('role:user,cmd:find_all_user', (msg, reply) => {
    var entity = seneca.make$('usertable')
    entity.list$({ name: 'danw' ,sort$:{limit:2}}, function (err, entity) {
        console.log('err: ', err);
        reply(null, entity)
    })
})
seneca.add('role:user,cmd:edit_user', (msg, reply) => {
    var entity = seneca.make$('usertable')
    entity.save$({ id: msg.id, name: msg.name }, function (err, entity) {
        reply(null, entity)
    })
})
seneca.add('role:user,cmd:delete_user', (msg, reply) => {
    var entity = seneca.make$('usertable')
    entity.remove$({ id: msg.id }, function (err, entity) {
        reply(null, entity)
    })
})
// seneca.add({ role: 'sql', hook: 'generate_id' }, function (args, done) {
//     return done(null, { id: 'idPrefix' })
// })
seneca.add({ role: 'user', cmd: 'create_user',hook:'generate_id' }, function (msg, reply) {
    var entity = seneca.make$('usertable')
    entity.name = "danw"
    entity.age = 100
    // entity.id='abc'
    entity.save$(function (err, entity) {
        reply(null, { data: entity })
    })
})

//
createUser = function (reply) {
    // seneca.act('role:sql,hook:generate_id', { left: 1, right: 2 }, (err, result) => {
    //     
    // })
    seneca.act('role:user,cmd:create_user,hook:generate_id', function (err, result) {
        if (err) return
        reply('Hello, user!' + result.data)
    })

}

findUserById = (request,reply) => {
    seneca.act('role:user,cmd:find_user', { id: request.query.id }, (err, result) => {
        if (err) return
        reply(result)
    })
}
findAllUserById = (request,reply) => {
    seneca.act('role:user,cmd:find_all_user', (err, result) => {
        if (err) return
        reply(result)
    })
}
editUser = (request, reply) => {
    seneca.act('role:user,cmd:edit_user', {id:request.query.id,name:request.query.name}, (err, result) => {
        if (err) return
        reply(result)
    })
}
deleteUser = (request, reply) => {
    seneca.act('role:user,cmd:delete_user', { id: request.query.id }, (err, result) => {
        if (err) return
        reply({result:'success'})
    })
}

//路由
server.route([
{
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
},
{
    method: 'GET',
    path: '/user/create',
    handler: function (request, reply) {
        createUser(reply)
    }
},
{
    method: 'GET',
    path: '/user/info',
    handler: function (request, reply) {
        findUserById(request,reply)
    }
},
{
    method: 'GET',
    path: '/user/list',
    handler: function (request, reply) {
        findAllUserById(request,reply)
    }
},
{
    method: 'GET',
    path: '/user/edit',
    handler: function (request, reply) {
        editUser(request,reply)
    }
},
{
    method: 'GET',
    path: '/user/delete',
    handler: function (request, reply) {
        deleteUser(request,reply)
    }
},

]);




//Hapi启动服务
server.start((err) => {

    if (err) {
        throw err;
    }

});
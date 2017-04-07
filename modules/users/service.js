'use strict';
// var seneca = require('seneca')()



class UsersService {

    findUserById(request, reply) {
        console.log(request.seneca)
        seneca.act('role:user,cmd:find_user', { id: request.query.id }, (err, result) => {
            if (err) return
            reply(result)
        })
    }
    editUser(request, reply) {
        seneca.act('role:user,cmd:edit_user', { id: request.query.id, name: request.query.name }, (err, result) => {
            if (err) return
            reply(result)
        })
    }
    deleteUser(request, reply) {
        seneca.act('role:user,cmd:delete_user', { id: request.query.id }, (err, result) => {
            if (err) return
            reply({ result: 'success' })
        })
    }
    findAllUser(request, reply) {
        // seneca.act('role:sql,hook:generate_id', { left: 1, right: 2 }, (err, result) => {
        //     reply(result)
        // })
        seneca.act('role:user,cmd:find_all_user', (err, result) => {
            if (err) return
            reply(result)
        })
    }
    createUser(request, reply) {
        seneca.act('role:user,cmd:create_user', function (err, result) {
            if (err) return reply({ result: err })
            reply(result)
        })
    }
}


module.exports = new UsersService()


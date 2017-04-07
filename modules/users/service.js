'use strict';


class UsersService {

    findUserById(request, reply) {
        request.seneca.act('role:user,cmd:find_user', { id: request.query.id }, (err, result) => {
            if (err) return
            reply(result)
        })
    }
    editUser(request, reply) {
        request.seneca.act('role:user,cmd:edit_user', { id: request.query.id, name: request.query.name }, (err, result) => {
            if (err) return
            reply(result)
        })
    }
    deleteUser(request, reply) {
        request.seneca.act('role:user,cmd:delete_user', { id: request.query.id }, (err, result) => {
            if (err) return
            reply({ result: 'success' })
        })
    }
    findAllUser(request, reply) {
        // request.seneca.act('role:sql,hook:generate_id', { left: 1, right: 2 }, (err, result) => {
        //     reply(result)
        // })
        request.seneca.act('role:user,cmd:find_all_user', (err, result) => {
            if (err) return
            reply(result)
        })
    }
    createUser(request, reply) {
        request.seneca.act('role:user,cmd:create_user', function (err, result) {
            if (err) return reply({ result: err })
            reply(result)
        })
    }

}


module.exports = new UsersService()


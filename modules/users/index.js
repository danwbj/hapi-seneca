var UsersService = require('./service.js') 

module.exports = [
    {
        method: 'GET',
        path: '/user/create',
        handler: UsersService.createUser
    },
    {
        method: 'GET',
        path: '/user/info',
        handler: UsersService.findUserById
    },
    {
        method: 'GET',
        path: '/user/list',
        handler: UsersService.findAllUser
    },
    {
        method: 'GET',
        path: '/user/edit',
        handler: UsersService.editUser
    },
    {
        method: 'GET',
        path: '/user/delete',
        handler: UsersService.deleteUser
    },

]
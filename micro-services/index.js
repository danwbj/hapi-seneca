// foo.js
var seneca = require('seneca')()
//数据库连接
seneca.use('entity')
seneca.use('seneca-postgres-store', {
    name: 'postgres',
    host: 'localhost',
    port: 5432
})

module.exports = function (options) {
    this.add('role:user,cmd:find_user', (args, done) => {
        let id = args.id
        var entity = seneca.make$('usertable')
        entity.load$({ id: id }, function (err, entity) {
            done(err, entity)
        })

    })
    this.add('role:user,cmd:find_all_user', (args, done) => {
        var entity = seneca.make$('usertable')
        entity.list$({ name: 'danw', limit$: 2 }, function (err, entity) {
            done(err, entity)
        })
    })
    this.add('role:user,cmd:edit_user', (args, done) => {
        var entity = seneca.make$('usertable')
        entity.save$({ id: args.id, name: args.name }, function (err, entity) {
            done(err, entity)
        })
    })
    this.add('role:user,cmd:delete_user', (args, done) => {
        var entity = seneca.make$('usertable')
        entity.remove$({ id: args.id }, function (err, entity) {
            done(err, entity)
        })
    })
    this.add({ role: 'sql', hook: 'generate_id' }, function (args, done) {
        return done(err, { id: 'idPrefix' })
    })
    this.add({ role: 'user', cmd: 'create_user', hook: 'generate_id' }, function (args, done) {
        var entity = seneca.make$('usertable')
        entity.name = "danw"
        entity.age = 100
        // entity.id='abc'
        entity.save$(function (err, entity) {
            reply(err, { data: entity })
        })
    })

}
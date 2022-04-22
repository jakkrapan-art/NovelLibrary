import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{
    Route.post('/users/register', 'UsersController.register').as('users.register')
    Route.post('/users/login', 'UsersController.login').as('users.login')
})
Route.get('/users/logout', 'UsersController.logout').as('users.logout').middleware('auth')
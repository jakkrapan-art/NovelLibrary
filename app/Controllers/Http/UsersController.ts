import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash';
import RegisterUserValidator from 'App/Validators/RegisterUserValidator';
import LoginValidator from 'App/Validators/LoginValidator';

export default class UsersController {
  public async register({response, request}: HttpContextContract) {
    const payload = await request.validate(RegisterUserValidator)

    const user = await User.create({username: payload.username, password: payload.password})

    response.redirect().toRoute('login')
  }

  public async login({request, session, response}: HttpContextContract){
    const payload = await request.validate(LoginValidator)
    const username = payload.username
    const password = payload.password

    try{
        const user = await User.findByOrFail('username', username)

        if(user){
            if(await Hash.verify(user.password, password)){
              response.cookie('user', {userId: user.userId, username: username})
              console.log('Login successful.')
              return response.redirect().toRoute('books.showAll')
            }
            else{
              session.flash('error','The password is incorrect!')
              return response.redirect().toRoute('login')
            }
        }
    }
    catch(error){
      console.log('Login failed.')
        session.flash('error','The user is not authorized!')
        return response.redirect().toRoute('login')
    }
  }

  public async logout({request, response}: HttpContextContract){
    const user = await request.cookie('user')

    if(user){
        await response.clearCookie('user')
    }
    
    return response.redirect().toRoute('login')
  }
}

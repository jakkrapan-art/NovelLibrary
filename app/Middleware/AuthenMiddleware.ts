import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthenMiddleware {
  public async handle({request, view, response}: HttpContextContract, next: () => Promise<void>) {
    const user = await request.cookie('user')

    if(user){
      await next()
    } 
    else{
      response.redirect().toRoute('login');
    }
  }
}

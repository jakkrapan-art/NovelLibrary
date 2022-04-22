import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class ShareLoggedInUser {
  public async handle({request,view}: HttpContextContract, next: () => Promise<void>) {
    const user = await request.cookie('user') as User
    if(user){
      view.share({
        currentUser: {username: user.username,userId: user.userId}
      })
    }
    await next()
  }
}

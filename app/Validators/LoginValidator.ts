import { schema,rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({trim: true}),
    password: schema.string({trim:true})
  })
  public messages = {
    required: 'The {{field}} is empty.'
  }
}

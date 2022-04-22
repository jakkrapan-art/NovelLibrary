import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EditBookValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    bookId: schema.number(),
    bookName: schema.string({trim: true}),
    category: schema.string({trim: true})
  })

  public messages = {
    required: 'The {{field}} is empty.',
    unique: 'Name of book already exist.'
  }
}

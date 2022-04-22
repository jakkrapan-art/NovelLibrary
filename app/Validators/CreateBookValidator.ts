import { schema,rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateBookValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    bookName: schema.string({trim: true},[
      rules.unique({table: 'books', column: 'book_name', caseInsensitive: true})
    ]),
    category: schema.string({trim: true})
  })

  public messages = {
    required: 'The {{field}} is empty.',
    unique: 'Name of book already exist.'
  }
}

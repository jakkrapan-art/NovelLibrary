import { schema,rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    username: schema.string({trim: true}, [
      rules.maxLength(40),
      rules.unique({table: 'users', column: 'username', caseInsensitive: true})
    ]),
    password: schema.string({}, [
      rules.maxLength(40),
      rules.minLength(8),
      rules.confirmed('confirmpassword')
    ]),
    confirmpassword: schema.string()
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    required: "The {{field}} is not filled yet.",
    unique: "Username is already use.",
    maxLength: "The {{field}} can fill max at 40 characters.",
    "confirmpassword.confirmed": "The password and confirm password doesn't match.",
    "password.minLength": "The {{field}} required at least 8 characters"
  }
}

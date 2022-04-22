import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class ExistedBook {
  public async handle({ request, session, response }: HttpContextContract, next: () => Promise<void>) {
    const bookId = await request.param('bookId')
    try {
      const book = await Book.findByOrFail('book_id', bookId)
      session.put('book', book)
      await next()
    } catch (error) {
      console.log('Error found: \n'+error)
      return response.redirect().toRoute('books.showAll')
    }
  }
}

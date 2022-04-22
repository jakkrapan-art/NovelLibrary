import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Page from 'App/Models/Page'

export default class ExistedPage {
  public async handle({ request, session, response }: HttpContextContract, next: () => Promise<void>) {
    const pageNo = await request.param('pageNo')
    const pageId = await request.param('pageId')
    try {
      if (pageId) {
        const page = await Page.findByOrFail('page_id', pageId)
        session.put('page', page)
        await next()
        return;
      }
      else if (pageNo) {
        const bookId = await request.param('bookId')
        const queriedPages = await Page.query().where('book_id', bookId).andWhere('page_no', pageNo)
        const page = queriedPages[0]
        session.put('page', page)
        await next()
        return;
      }
    } catch (error) {
      const bookId = await request.param('bookId')
      console.log(error)
      if (bookId) {
        return response.redirect().toRoute('books.detail', { bookId: bookId })
      }
    }

    return response.redirect().toRoute('books.showAll')
  }
}

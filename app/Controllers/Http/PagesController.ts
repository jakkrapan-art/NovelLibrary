import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'
import Page from 'App/Models/Page'
import PageFormValidator from 'App/Validators/PageFormValidator'

export default class PagesController {
  public async show({ view, session }: HttpContextContract) {
    const book = await session.get('book') as Book
    await session.forget('book')

    const page = await session.get('page') as Page
    await session.forget('page')

    const nearPages = await Page.query().where('book_id', page.bookId).andWhereIn('page_no', [page.pageNo-1, page.pageNo+1])

    let nextPage
    let previousPage
    if(nearPages.length === 2){
      previousPage = nearPages[0]
      nextPage = nearPages[1]
    }
    else if(nearPages.length === 1){
      if(nearPages[0].pageNo > page.pageNo){
        nextPage = nearPages[0]
      }
      else{
        previousPage = nearPages[0]
      }
    }

    view.share({
      title: 'Page Detail',
      page: page,
      book: book,
      previousPage: previousPage,
      nextPage: nextPage
    })
    return view.render('pages/page_detail')
  }

  public async create({ view, params, session }: HttpContextContract) {
    const bookId = await params.bookId

    const book = await session.get('book') as Book
    await session.forget('book')

    const pageNo = await params.pageNo
    view.share({
      title: 'Create Book Page',
      header: 'Create',
      pageName: 'createPage',
      bookId: bookId,
      bookName: book.bookName,
      pageNo: pageNo
    })
    return view.render('pages/page_form')
  }

  public async store({ params, request, response }: HttpContextContract) {
    const bookId = await params.bookId
    const pageNo = await params.pageNo
    const pageHeader = await request.input('pageHeader')
    const payload = await request.validate(PageFormValidator)

    const page = await Page.create({ bookId: bookId, pageNo: pageNo, pageHeader: pageHeader, content: payload.content })
    return response.redirect().toRoute('books.detail', { bookId: bookId })
  }

  public async edit({ params, view, session }: HttpContextContract) {
    const bookId = await params.bookId

    const book = await session.get('book') as Book
    await session.forget('book')

    const page = await session.get('page') as Page
    await session.forget('page')

    view.share({
      title: 'Edit Book Page',
      header: 'Edit',
      pageName: 'editPage',
      bookId: bookId,
      bookName: book.bookName,
      page: page
    })
    return view.render('pages/page_form')
  }

  public async update({ params, request, response, session }: HttpContextContract) {
    const payload = await request.validate(PageFormValidator)
    const bookId = await params.bookId

    const page = await session.get('page') as Page
    await session.forget('page')

    const pageHeader = await request.input('pageHeader')

    page.pageHeader = pageHeader
    page.content = payload.content
    await page.save()

    return response.redirect().toRoute('page.show', { bookId: bookId, pageNo: page.pageNo })
  }

  public async destroy({ session, response }: HttpContextContract) {
    const page = await session.get('page') as Page
    await session.forget('page')

    const bookId = await page.bookId

    const nextPages = await Page.query().where('book_id', bookId).andWhere('page_no', '>', page.pageNo)
    nextPages.forEach(nextPage => {
      nextPage.pageNo -= 1
      nextPage.save()
    });

    await page.delete()

    return response.redirect().toRoute('books.detail', { bookId: bookId })
  }
}
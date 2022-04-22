import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'
import User from 'App/Models/User';
import CreateBookValidator from 'App/Validators/CreatebookValidator';
import EditBookValidator from 'App/Validators/EditBookValidator';

export default class BooksController {
  public async create({view}: HttpContextContract) {
    return view.render('books/book_form', {title: 'Create Book', pageName: 'createBook'})
  }

  public async store({request, response}: HttpContextContract) {
    const payload = await request.validate(CreateBookValidator)
    const userId = await request.cookie('user').userId
    const synopsis = await request.input('synopsis')

    const book = await Book.create({bookName: payload.bookName, category: payload.category,synopsis: synopsis, userId: userId})

    return response.redirect().toRoute('books.showMine')
  }

  public async showAll({view}: HttpContextContract) {
    const books = await Book.query().whereNotNull('publish_date');
    view.share({
      pageName: 'allBooks'
    })
    return view.render('books/books', {books:books, booksCount: books.length, header: 'Books'})
  }
  
  public async showMine({request, view}: HttpContextContract) {
    const user = await request.cookie('user')
    const books = await Book.query().where('user_id', user.userId)
    view.share({
      pageName: 'myBooks'
    })

    return view.render('books/books',{books:books, booksCount: books.length, header: 'My Books'})
  }

  public async bookDetail({view, session}: HttpContextContract){
    const book = await session.get('book') as Book
    await session.forget('book')

    await book.load('pages')
    const author = await User.findBy('user_id',book.userId)

    view.share({
      author: author?.username
    })
    return view.render('books/book_detail', {book: book})
  }
  public async edit({view, session}: HttpContextContract) {
    const book = await session.get('book') as Book
    await session.forget('book')

    const tempBook = await session.get('tempBook')
    view.share({
      tempBook: tempBook
    })
    
    await session.forget('tempBook')
    return view.render('books/book_form', {book: book, title: 'Edit Book', pageName: 'editBook'})
  }

  public async update({params, session,request, response}: HttpContextContract) {
    const payload = await request.validate(EditBookValidator)
    const bookId = await params.bookId
    const bookWithName = await Book.findBy('book_name', payload.bookName)
    const synopsis = await request.input('synopsis')

    const book = await session.get('book') as Book
    await session.forget('book')
    
    if(bookWithName && bookWithName.bookId != bookId){
      const tempName = payload.bookName
      const tempCategory = payload.category
      const tempSynopsis = synopsis

      await session.put('tempBook', {bookName: tempName,category: tempCategory, synopsis: tempSynopsis})
      await session.flash('error','Name of book already exist.')
      return response.redirect().toRoute('books.edit', {bookId: bookId})
    }
    
    book.bookName = payload.bookName
    book.category = payload.category
    book.synopsis = synopsis
    await book.save()
    return response.redirect().toRoute('books.detail', {bookId: bookId})
  }

  public async publish({response, session}: HttpContextContract) {
    const book = await session.get('book') as Book
    await session.forget('book')

    book.publishDate = await new Date()
    await book.save()
    return response.redirect().toRoute('books.showMine')
  }

  public async delete({response, request, session}: HttpContextContract) {
    const user = await request.cookie('user')
    const book = await session.get('book') as Book
    await session.forget('book')

    if(book.userId === user.userId){
      await book?.delete()
      return response.redirect().toRoute('books.showMine')
    }
    else{
      return response.redirect().toRoute('books.showAll')
    }
  }
}

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/books', 'BooksController.showAll').as('books.showAll')
    
    Route.group(() => {
        Route.get('/books/createNewBook', 'BooksController.create').as('books.create')
        Route.post('/books/createNewBook', 'BooksController.store').as('books.store')
        Route.get('/books/myBooks', 'BooksController.showMine').as('books.showMine')
        Route.group(() => {
            Route.get('/books/:bookId/edit', 'BooksController.edit').as('books.edit')
            Route.get('/books/:bookId/publish', 'BooksController.publish').as('books.publish')
            Route.get('/books/:bookId/unpublish', 'BooksController.unpublish').as('books.unpublish')
            Route.get('/books/:bookId/delete', 'BooksController.delete').as('books.delete')
            Route.post('/books/:bookId/update', 'BooksController.update').as('books.update')
        }).middleware('checkBook')
    }).middleware('auth')
    Route.get('/books/:bookId', 'BooksController.bookDetail').as('books.detail').middleware('checkBook')
}).middleware('shareUser')

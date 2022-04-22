import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/book/:bookId/page/:pageNo', 'PagesController.show').as('page.show').middleware('checkPage')

    Route.group(() => {
        Route.get('/book/:bookId/page/:pageNo/create/', 'PagesController.create').as('pages.create')
        Route.post('/book/:bookId/page/:pageNo/create/', 'PagesController.store').as('pages.store')
        
        Route.group(() => {
            Route.get('/book/:bookId/page/:pageId/edit', 'PagesController.edit').as('pages.edit')
            Route.post('/book/:bookId/page/:pageId/edit', 'PagesController.update').as('pages.update')
            Route.get('/book/:bookId/page/:pageId/delete', 'PagesController.destroy').as('pages.delete')
        }).middleware('checkPage')
    }).middleware('auth')
}).middleware('shareUser').middleware('checkBook')
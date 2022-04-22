import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Page from 'App/Models/Page'

export default class PageSeeder extends BaseSeeder {
  public async run () {
    await Page.createMany([
      {
        bookId: 1,
        pageHeader: 'The prologue',
        content: 'This is the prologue of book',
        pageNo: 1
      },
      {
        bookId: 1,
        pageHeader: 'The second page',
        content: 'This is the second page of book',
        pageNo: 2
      },
      {
        bookId: 1,
        pageHeader: 'The END',
        content: 'This is the end of book',
        pageNo: 3
      },
      {
        bookId: 2,
        pageHeader: 'The Beginning',
        content: 'This is the beginning of story in book',
        pageNo: 1
      },
      {
        bookId: 2,
        pageHeader: 'The End',
        content: 'This is the end of story.',
        pageNo: 1
      }
    ])
  }
}

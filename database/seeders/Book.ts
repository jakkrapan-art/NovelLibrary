import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Book from 'App/Models/Book'

export default class BookSeeder extends BaseSeeder {
  public async run () {
    await Book.createMany([
      {
        bookName: 'The Book',
        category: 'Horror',
        synopsis: 'This is the horror book'
      },
      {
        bookName: 'The Real Book',
        category: 'Fantasy',
        synopsis: 'This book is real'
      }
    ])
  }
}

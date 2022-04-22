import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pages extends BaseSchema {
  protected tableName = 'pages'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('page_id').unsigned().primary()
      table.integer('page_no').unsigned().notNullable()
      table.string('page_header').nullable()
      table.text('content').notNullable()
      table.integer('book_id').unsigned().notNullable().references('books.book_id').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropForeign('book_id')
      table.dropColumn('book_id')
    })
  }
}

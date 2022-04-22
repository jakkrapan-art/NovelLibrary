import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('book_id').unsigned().primary()
      table.string('book_name').notNullable()
      table.string('category').notNullable()
      table.text('synopsis').nullable()
      table.date('publish_date').nullable()
      table.integer('user_id').unsigned().notNullable().references('users.user_id').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropForeign('user_id')
      table.dropColumn('user_id')
    })
  }
}

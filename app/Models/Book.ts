import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Page from './Page'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public bookId: number

  @column()
  public bookName: string

  @column()
  public category: string

  @column()
  public synopsis: string
  
  @column()
  public publishDate: Date

  @column()
  public userId: number

  @hasMany( ()=> Page, {
    foreignKey: 'bookId'
  })
  public pages: HasMany<typeof Page>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

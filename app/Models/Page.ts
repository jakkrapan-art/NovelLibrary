import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Page extends BaseModel {
  @column({ isPrimary: true })
  public pageId: number

  @column()
  public pageNo: number

  @column()
  public pageHeader: string

  @column()
  public content: string

  @column()
  public bookId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

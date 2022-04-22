import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, beforeSave, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Book from './Book'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public userId: number

  @column()
  public username: string

  @column({serializeAs: null})
  public password: string

  @column()
  public rememberMeToken?: string
  
  @hasMany(()=> Book,{
    foreignKey: 'userId'
  })
  public books: HasMany<typeof Book>
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User){
    if(user.$dirty.password){
      user.password = await Hash.make(user.password)
    }
  }
}

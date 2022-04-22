import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        username: 'userAccount',
        password: 'password',
      },
      {
        username: 'userAccount2',
        password: '123456789ab'
      }
    ])
  }
}

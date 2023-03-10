import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { UserModule } from './components/user/user.module';
import { AuthModule } from './components/auth/auth.module';
import { BookModule } from './components/book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    UserModule,
    AuthModule,
    BookModule,
  ],
})
export class AppModule {}

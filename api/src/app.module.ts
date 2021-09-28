import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';
import { QuizModule } from './quiz/quiz.module';

const uri =
  'mongodb+srv://maroon775:iccc0edciDSOrkux@cluster0.2vqay.mongodb.net/nestdatabase?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(uri),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password)',
      database: 'nest_learn',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProductsModule,
    UsersModule,
    PhotosModule,
    QuizModule,
  ],
  controllers: [AppController, TransactionsController],
  providers: [AppService, TransactionsService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {
    console.log('connection status', connection.isConnected);
  }

  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes(AppController);
  // }
}

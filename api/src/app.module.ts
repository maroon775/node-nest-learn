import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { MongooseModule } from '@nestjs/mongoose';

const uri =
  'mongodb+srv://maroon775:iccc0edciDSOrkux@cluster0.2vqay.mongodb.net/nestdatabase?retryWrites=true&w=majority';

@Module({
  imports: [MongooseModule.forRoot(uri)],
  controllers: [AppController, TransactionsController],
  providers: [AppService, TransactionsService],
})
export class AppModule {}

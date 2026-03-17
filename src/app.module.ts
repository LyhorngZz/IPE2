import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptsModule } from './receipts/receipts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './receipts/receipts.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'nestjs_db',
    entities: [Receipt],
    synchronize: true,
  }),
  ReceiptsModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

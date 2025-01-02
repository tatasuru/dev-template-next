import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  // TODO: find env variables in ../../.env
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

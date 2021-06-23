import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { BoardModule } from './Board/board.module';

@Module({
  imports: [BoardModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}

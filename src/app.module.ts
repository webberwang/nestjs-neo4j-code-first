import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// import { UserModule } from './user-neo4j/user.module';


@Module({
  imports: [
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

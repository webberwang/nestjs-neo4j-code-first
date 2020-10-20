import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserModule } from './user-schemafirst/user.module';
import { UserGraphqlModule } from './user-codefirst/user.module';


@Module({
  imports: [
    UserGraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

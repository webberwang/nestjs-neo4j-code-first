import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { UserResolver } from './user.resolvers';

@Module({
  imports: [
    UserResolver,
    GraphQLModule.forRoot({
      include: [UserResolver],
      autoSchemaFile: true,
    })
  ],
})
export class UserModule{}
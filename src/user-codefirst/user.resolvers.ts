import { Query, Resolver } from "@nestjs/graphql";
import { User } from "./user.model";

@Resolver(of => User)
export class UserResolver {

  @Query(returns => User)
  async user() {
    return 'codelab'
  }
}

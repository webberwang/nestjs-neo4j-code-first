import { Query, Resolver, ResolveReference } from "@nestjs/graphql";
import { Node } from "./user.model";

@Resolver(of => Node)
export class UserResolver {

  @Query(returns => Node)
  user() {
    return 'codelab'
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return { id: '1'}
  }
}

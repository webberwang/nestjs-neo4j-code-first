import { Field, Int, ObjectType,registerEnumType } from '@nestjs/graphql';

export enum NodeType {
  A,B
}

registerEnumType(NodeType, { name: 'NodeType' })

@ObjectType()
export class Node {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field(() => NodeType)
  declare type?: NodeType
}
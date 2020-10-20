import { Module } from "@nestjs/common";
import { GraphQLFederationModule, GraphQLModule } from "@nestjs/graphql";
import { GraphQLSchema } from "graphql";
import { augmentSchema, makeAugmentedSchema } from 'neo4j-graphql-js'
import { printIntrospectionSchema, printSchema, stripIgnoredCharacters } from 'graphql/utilities'
import { extractResolversFromSchema } from 'neo4j-graphql-js/dist/augment/resolvers'
import { buildFederatedSchema } from '@apollo/federation'
import { extractSchemaDefinitions } from 'neo4j-graphql-js/dist/augment/augment'
import { mergeSchemas } from "graphql-tools";
import { join } from "path";
import * as util from 'util'
import { UserModule } from "src/user";

export const cLog = (data: any) =>
{
  console.log(util.inspect(data, false, null, true))
}


@Module({
  imports: [
    UserModule,
    // GraphQLModule.forRootAsync({
    GraphQLFederationModule.forRootAsync({
      useFactory: () =>
      {
        return {
          include: [UserModule],
          autoSchemaFile: join(process.cwd(), 'src/user-codefirst/schema.graphql'),
          transformSchema: (schema: GraphQLSchema) =>
          {
            const newSchema = makeAugmentedSchema({
              schema,
              config: {
                isFederated: true
              }
            })
            return buildFederatedSchema([newSchema])
          },
          transformAutoSchemaFile: true
        }
      }
    })
  ],
  providers: []
})
export class UserGraphqlModule { }
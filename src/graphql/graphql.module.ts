import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/hr-salary-management/api/graphql',
      autoSchemaFile: true,
      playground: true,
      introspection: true,
    }),
  ],
})
export class GraphqlModule {}

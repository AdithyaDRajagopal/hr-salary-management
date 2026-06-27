import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/hr-salary-management/api/graphql',
      typePaths: ['./src/**/graphql/*.graphql'],
      definitions: {
        path: path.join(process.cwd(), 'src/schema/graphql.schema.ts'),
        outputAs: 'class',
      },
      playground: true,
      introspection: true,
    }),
  ],
})
export class GraphqlModule {}

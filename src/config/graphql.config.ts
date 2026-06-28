import { GraphQLDefinitionsFactory } from "@nestjs/graphql";
import { join } from "path";

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: [join(__dirname, "../**/graphql/*.graphql")],
  path: join(__dirname, "../schema/graphql.schema.ts"),
  outputAs: "class",
});

import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PaginationInput {
  @Field({ nullable: true })
  limit?: number;

  @Field({ nullable: true })
  offset?: number;
}

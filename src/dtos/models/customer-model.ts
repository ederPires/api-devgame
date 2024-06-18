import { Field, ObjectType } from "type-graphql";

// cliente
// O cliente marca um agendamento, configura isso no appointments-resolvers
@ObjectType()
export class Customer {
  @Field()
  name: string;
}

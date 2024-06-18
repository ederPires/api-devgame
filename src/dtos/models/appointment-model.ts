import { Field, ObjectType } from 'type-graphql'

// informações disponíveis para o front-end consumir
@ObjectType()
export class Appointment {
  @Field()
  startsAt: Date;

  @Field()
  endsAt: Date;
}

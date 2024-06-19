import { Field, ID, ObjectType } from "type-graphql";
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
export class Genre {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}



// Definindo uma lista de gêneros com IDs fixos
export const genres: Genre[] = [
  { id: 'a94cc4c9-cfb3-4053-afda-f452e8882bf7', name: 'Ação' },
  { id: 'b84dc2b8-cfb3-4053-afda-f452e8882cf8', name: 'Aventura' },
  { id: 'c74ec3d7-cfb3-4053-afda-f452e8882df9', name: 'RPG' },
  //{ id: uuidv4(), name: 'Luta' },
];

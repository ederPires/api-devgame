import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Game } from './game-model';
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class Genre {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => Game, (game) => game.genre)
  games: Game[];
}



// Definindo uma lista de gêneros com IDs fixos
/* para teste sem DB */
export const genres: Genre[] = [
  {
    id: 'a94cc4c9-cfb3-4053-afda-f452e8882bf7', name: 'Ação',
    games: []
  },
  {
    id: 'b84dc2b8-cfb3-4053-afda-f452e8882cf8', name: 'Aventura',
    games: []
  },
  {
    id: 'c74ec3d7-cfb3-4053-afda-f452e8882df9', name: 'RPG',
    games: []
  },
  //{ id: uuidv4(), name: 'Luta' },
];

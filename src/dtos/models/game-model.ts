import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Genre } from './genres-model';
import { Field, ObjectType, ID, Float } from 'type-graphql';


// informações disponíveis para o front-end consumir
@ObjectType()
@Entity()
export class Game {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  dateRelease: Date;

  @Field(() => Float)
  @Column()
  rating: number;

  @Field()
  @Column()
  site: string;

  @Field(() => Genre)
  @ManyToOne(() => Genre, (genre) => genre.games)
  genre: Genre;
}

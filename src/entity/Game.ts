import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Genre } from "./Genre";

@Entity()
@ObjectType()
export class Game {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Genre)
  @ManyToOne(() => Genre, genre => genre.games)
  @JoinColumn({ name: "id" })
  genre: Genre;
}

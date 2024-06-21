// src/entity/Genre.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Game } from "./Game";

@Entity()
@ObjectType()
export class Genre {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => [Game], { nullable: true })
  @OneToMany(() => Game, (game) => game.genre)
  games?: Game[];
}

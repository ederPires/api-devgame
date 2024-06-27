import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { GameEntity } from "./GameEntity";

@Entity("genres")
@ObjectType()
export class GenreEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => [GameEntity], { nullable: true })
  @OneToMany(() => GameEntity, game => game.genre)
  games?: GameEntity[];
}

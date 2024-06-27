import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { GenreEntity } from "./GenreEntity";

@Entity("games")
@ObjectType()
export class GameEntity {
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
  @Column({ type: 'date' })
  dateRelease: Date;

  @Field()
  @Column({ type: 'float' })
  rating: number;

  @Field()
  @Column()
  site: string;

  @Field()
  @Column()
  urlImage: string;

  @Field(() => GenreEntity)
  @ManyToOne(() => GenreEntity, genre => genre.games)
  genre: GenreEntity;
}

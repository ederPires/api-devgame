import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Genre } from './GenresModel';
import { Field, ObjectType, ID, Float } from 'type-graphql';


// informações disponíveis para o front-end consumir
@ObjectType()
@Entity("games")
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
  urlImage: string; // URL da imagem do jogo

  @Field(() => Genre)
  @ManyToOne(() => Genre, (genre) => genre.games)
  @JoinColumn({ name: 'genreId' })
  genre: Genre;
}

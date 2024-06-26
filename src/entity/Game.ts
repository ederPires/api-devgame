import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Genre } from "./Genre";

@Entity()
@ObjectType()
export class Game {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string; // Identificador único do jogo, gerado automaticamente como UUID

  @Field()
  @Column()
  name: string; // Nome do jogo

  @Field()
  @Column()
  description: string; // Descrição do jogo

  @Field()
  @Column({ type: 'date' })
  dateRelease: Date; // Data de lançamento do jogo

  @Field()
  @Column({ type: 'float' }) // Certifique-se de que o tipo é 'float'
  rating: number;

  @Field()
  @Column()
  site: string; // URL do site do jogo

  @Field()
  @Column() // Novo campo adicionado
  urlImage: string; // URL da imagem do jogo

  @Field(() => Genre)
  @ManyToOne(() => Genre, genre => genre.games)
  @JoinColumn({ name: "genreId" }) // Nome da coluna de junção que contém a chave estrangeira
  genre: Genre; // Relação muitos-para-um com a entidade Genre
}

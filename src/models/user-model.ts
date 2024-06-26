import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { Field, ObjectType, ID } from 'type-graphql';
import * as bcrypt from 'bcryptjs';


@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

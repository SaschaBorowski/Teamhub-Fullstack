import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TaskStatus } from './task-status.enum';

@ObjectType()
export class Task {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => TaskStatus)
  status!: keyof typeof TaskStatus;

  @Field(() => ID)
  projectId!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
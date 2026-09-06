import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Task } from '../../tasks/models/task.model';

@ObjectType()
export class Project {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => [Task])
  tasks!: Task[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

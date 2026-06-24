import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './dto/create-task.input';
import { Task } from './models/task.model';
import { TaskStatus } from './models/task-status.enum';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) { }

  @Mutation(() => Task)
  createTask(@Args('input') input: CreateTaskInput) {
    return this.tasksService.create(input);
  }

  @Mutation(() => Task)
  updateTaskStatus(
    @Args('id', { type: () => ID }) id: string,
    @Args('status', { type: () => TaskStatus }) status: keyof typeof TaskStatus,
  ) {
    return this.tasksService.updateStatus(id, status);
  }
  @Mutation(() => Task)
  deleteTask(
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.tasksService.delete(id);

  }

  @Mutation(() => Task)
  updateTaskTitle(
    @Args('id', { type: () => ID }) id: string,
    @Args('title') title: string,
  ) {
    return this.tasksService.updateTitle(id, title);
  }
}
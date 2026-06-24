import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskInput } from './dto/create-task.input';
import { TaskStatus } from './models/task-status.enum';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) { }

  create(input: CreateTaskInput) {
    return this.prisma.task.create({
      data: input,
    });
  }

  updateStatus(id: string, status: keyof typeof TaskStatus) {
    return this.prisma.task.update({
      where: { id },
      data: { status },
    });
  }

  updateTitle(
    id: string,
    title: string,
    description: string
  ) {
    return this.prisma.task.update({
      where: { id },
      data: {
        title,
        description,
      },
    });
  }

  delete(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}

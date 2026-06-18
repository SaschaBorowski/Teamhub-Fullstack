import { registerEnumType } from '@nestjs/graphql';
import { TaskStatus as PrismaTaskStatus } from '@prisma/client';

export const TaskStatus = PrismaTaskStatus;

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});

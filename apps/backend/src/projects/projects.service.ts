import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectInput } from './dto/create-project.input';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) { }

  findAll() {
    return this.prisma.project.findMany({
      include: { tasks: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: { tasks: true },
    });
  }

  create(input: CreateProjectInput) {
    return this.prisma.project.create({
      data: input,
      include: { tasks: true },
    });
  }

  delete(id: string) {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
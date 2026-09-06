import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectInput } from './dto/create-project.input';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) { }

  findAll() {
    return this.prisma.project.findMany({
      include: { tasks: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: { tasks: true },
    });
  }

  async create(input: CreateProjectInput) {
    const lastProject = await this.prisma.project.findFirst({
      orderBy: { sortOrder: 'desc' },
      select: { sortOrder: true },
    });

    const sortOrder = (lastProject?.sortOrder ?? -1) + 1;

    return this.prisma.project.create({
      data: {
        ...input,
        sortOrder,
      },
      include: { tasks: true },
    });
  }

  delete(id: string) {
    return this.prisma.project.delete({
      where: { id },
    });
  }

  update(id: string, name: string, description: string | null) {
    return this.prisma.project.update({
      where: { id },
      data: {
        name,
        description,
      },
      include: { tasks: true },
    });
  }

  reorder(id: string, sortOrder: number) {
    return this.prisma.project.update({
      where: { id },
      data: {
        sortOrder,
      },
      include: { tasks: true },
    });
  }
}
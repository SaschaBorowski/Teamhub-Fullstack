import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProjectInput } from './dto/create-project.input';
import { Project } from './models/project.model';
import { ProjectsService } from './projects.service';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) { }

  @Query(() => [Project])
  projects() {
    return this.projectsService.findAll();
  }

  @Query(() => Project, { nullable: true })
  project(@Args('id', { type: () => ID }) id: string) {
    return this.projectsService.findOne(id);
  }

  @Mutation(() => Project)
  createProject(@Args('input') input: CreateProjectInput) {
    return this.projectsService.create(input);
  }

  @Mutation(() => Project)
  deleteProject(
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.projectsService.delete(id);
  }

  @Mutation(() => Project)
  updateProject(
    @Args('id', { type: () => ID }) id: string,
    @Args('name') name: string,
    @Args('description', { type: () => String, nullable: true })
    description: string | null,
  ) {
    return this.projectsService.update(id, name, description);
  }

  @Mutation(() => Project)
  reorderProject(
    @Args('id', { type: () => ID }) id: string,
    @Args('sortOrder', { type: () => Int }) sortOrder: number,
  ) {
    return this.projectsService.reorder(id, sortOrder);
  }
}

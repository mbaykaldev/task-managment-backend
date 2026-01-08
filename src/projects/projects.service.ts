import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity.js';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(name: string, description: string, userId: number): Promise<Project> {
    const project = this.projectRepository.create({
      name,
      description,
      userId,
    });
    return this.projectRepository.save(project);
  }

  async findAll(userId: number, userRole: string): Promise<Project[]> {
    if (userRole === 'admin') {
      return this.projectRepository.find({
        relations: ['user', 'tasks'],
      });
    }
    return this.projectRepository.find({
      where: { userId },
      relations: ['tasks'],
    });
  }

  async findOne(id: number, userId: number, userRole: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['tasks', 'tasks.tags', 'user'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    if (userRole !== 'admin' && project.userId !== userId) {
      throw new ForbiddenException('You can only access your own projects');
    }

    return project;
  }

  async update(id: number, name: string, description: string, userId: number, userRole: string): Promise<Project> {
    const project = await this.findOne(id, userId, userRole);
    
    if (name) project.name = name;
    if (description) project.description = description;

    return this.projectRepository.save(project);
  }

  async remove(id: number, userId: number, userRole: string): Promise<void> {
    const project = await this.findOne(id, userId, userRole);
    await this.projectRepository.remove(project);
  }
}
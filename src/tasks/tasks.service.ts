import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity.js';
import { Tag } from '../tags/entities/tag.entity.js';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(title: string, description: string, projectId: number, status: string, userId: number): Promise<Task> {
    const task = this.taskRepository.create({
      title,
      description,
      projectId,
      status,
      userId,
    });
    return this.taskRepository.save(task);
  }

  async findAll(userId: number, userRole: string, projectId?: number, status?: string): Promise<Task[]> {
    const where: any = {};
    
    if (userRole !== 'admin') {
      where.userId = userId;
    }
    
    if (projectId) {
      where.projectId = projectId;
    }
    
    if (status) {
      where.status = status;
    }

    return this.taskRepository.find({
      where,
      relations: ['project', 'tags', 'user'],
    });
  }

  async findOne(id: number, userId: number, userRole: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['project', 'tags', 'user'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (userRole !== 'admin' && task.userId !== userId) {
      throw new ForbiddenException('You can only access your own tasks');
    }

    return task;
  }

  async update(id: number, updateData: Partial<Task>, userId: number, userRole: string): Promise<Task> {
    const task = await this.findOne(id, userId, userRole);
    
    Object.assign(task, updateData);
    return this.taskRepository.save(task);
  }

  async remove(id: number, userId: number, userRole: string): Promise<void> {
    const task = await this.findOne(id, userId, userRole);
    await this.taskRepository.remove(task);
  }

  async addTag(taskId: number, tagId: number, userId: number, userRole: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['tags'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    if (userRole !== 'admin' && task.userId !== userId) {
      throw new ForbiddenException('You can only modify your own tasks');
    }

    const tag = await this.tagRepository.findOne({ where: { id: tagId } });
    if (!tag) {
      throw new NotFoundException(`Tag with ID ${tagId} not found`);
    }

    if (!task.tags.find(t => t.id === tagId)) {
      task.tags.push(tag);
      await this.taskRepository.save(task);
    }

    return this.findOne(taskId, userId, userRole);
  }

  async removeTag(taskId: number, tagId: number, userId: number, userRole: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['tags'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    if (userRole !== 'admin' && task.userId !== userId) {
      throw new ForbiddenException('You can only modify your own tasks');
    }

    task.tags = task.tags.filter(tag => tag.id !== tagId);
    await this.taskRepository.save(task);

    return this.findOne(taskId, userId, userRole);
  }
}
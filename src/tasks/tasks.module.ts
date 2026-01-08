import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service.js';
import { TasksController } from './tasks.controller.js';
import { Task } from './entities/task.entity.js';
import { Tag } from '../tags/entities/tag.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Tag])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
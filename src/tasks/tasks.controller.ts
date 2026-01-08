import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body() body: { title: string; description: string; projectId: number; status?: string },
    @Request() req,
  ) {
    return this.tasksService.create(
      body.title,
      body.description,
      body.projectId,
      body.status || 'todo',
      req.user.userId,
    );
  }

  @Get()
  findAll(
    @Request() req,
    @Query('projectId') projectId?: string,
    @Query('status') status?: string,
  ) {
    return this.tasksService.findAll(
      req.user.userId,
      req.user.role,
      projectId ? +projectId : undefined,
      status,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.tasksService.findOne(+id, req.user.userId, req.user.role);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: { title?: string; description?: string; status?: string; projectId?: number },
    @Request() req,
  ) {
    return this.tasksService.update(+id, updateData, req.user.userId, req.user.role);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.tasksService.remove(+id, req.user.userId, req.user.role);
  }

  @Post(':id/tags/:tagId')
  addTag(@Param('id') id: string, @Param('tagId') tagId: string, @Request() req) {
    return this.tasksService.addTag(+id, +tagId, req.user.userId, req.user.role);
  }

  @Delete(':id/tags/:tagId')
  removeTag(@Param('id') id: string, @Param('tagId') tagId: string, @Request() req) {
    return this.tasksService.removeTag(+id, +tagId, req.user.userId, req.user.role);
  }
}
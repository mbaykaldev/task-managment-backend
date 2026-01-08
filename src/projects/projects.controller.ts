import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() body: { name: string; description: string }, @Request() req) {
    return this.projectsService.create(body.name, body.description, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.projectsService.findAll(req.user.userId, req.user.role);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.projectsService.findOne(+id, req.user.userId, req.user.role);
  }

  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() body: { name?: string; description?: string }, 
    @Request() req
  ) {
    return this.projectsService.update(
      +id, 
      body.name || '', 
      body.description || '', 
      req.user.userId, 
      req.user.role
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.projectsService.remove(+id, req.user.userId, req.user.role);
  }
}
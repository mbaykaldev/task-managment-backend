import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
import { Project } from '../../projects/entities/project.entity.js';
import { Tag } from '../../tags/entities/tag.entity.js';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo',
  })
  status: string;

  @ManyToOne(() => Project, project => project.tasks, { onDelete: 'CASCADE' })
  project: Project;

  @Column()
  projectId: number;

  @ManyToOne(() => User, user => user.tasks)
  user: User;

  @Column()
  userId: number;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'task_tags',
    joinColumn: { name: 'taskId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;
}
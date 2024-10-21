import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskReposiory: Repository<Task>,
  ) {}

  create(createTaskInput: CreateTaskInput) {
    const newBook = this.taskReposiory.create(createTaskInput);
    return this.taskReposiory.save(newBook);
  }

  findAll(filters: { searchTerm: string; status?: boolean }) {
    return this.taskReposiory.find({
      order: { created_at: 'ASC' },
      where: {
        title: Like(`%${filters.searchTerm}%`),
        status: filters.status === null ? undefined : filters.status,
      },
    });
  }

  findOne(id: string) {
    return this.taskReposiory.findOne({ where: { id } });
  }

  async update(id: string, updateTaskInput: UpdateTaskInput): Promise<Task> {
    await this.taskReposiory.update(updateTaskInput.id, updateTaskInput);
    return this.taskReposiory.findOne({ where: { id: updateTaskInput.id } });
  }

  async remove(id: string): Promise<Task> {
    const deletedTask = await this.taskReposiory.findOneOrFail({
      where: { id },
    });
    await this.taskReposiory.delete(id);
    return deletedTask;
  }
}

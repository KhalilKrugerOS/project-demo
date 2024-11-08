import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo)
  private readonly todoRepository: Repository<Todo>) { }
  async create(createTodoDto: CreateTodoDto) {
    const res = await this.todoRepository.save(createTodoDto);
    return res;
  }

  async addTodo(createTodoDto: CreateTodoDto) {
    const res = await this.todoRepository.save(createTodoDto);
    return res;
  }

  findAll() {
    return `This action returns all todo`;
  }

  async findOne(id: number) {
    const res = await this.todoRepository.findOne({ where: { id } });
    if (res === null || res.deletedAt !== null)
      return null;
    return res;
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
    const res = await this.todoRepository.findOne({ where: { id } });
    if (res === null || res.deletedAt !== null)
      return null;
    res.updatedAt = new Date();
    return this.todoRepository.update({ id }, updateTodoDto);

  }

  async deleteTodo(id: number) {
    const res = await this.todoRepository.findOne({ where: { id } });
    if (res === null)
      return null;
    res.deletedAt = new Date();
    res.updatedAt = null;
    return this.todoRepository.update({ id }, { deletedAt: new Date() });
  }
}

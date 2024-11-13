import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAllDto } from './dto/get-all.dto';
import { PaginationResponse } from './interfaces/pagination.interface';

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

  // implement pagination
  async getAll(query: GetAllDto): Promise<PaginationResponse<Todo>> {
    const { page, limit, sortBy, sortDirection } = query;
    console.log(query);
    const skip = (page - 1) * limit; // number of items to skip
    const queryBuilder = this.todoRepository.createQueryBuilder('todo');

    const allowedSortFields = ['createdAt', 'updatedAt', 'name', 'id']; // add your allowed fields
    const sanitizedSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    queryBuilder.orderBy(`todo.${sanitizedSortBy}`, sortDirection);

    // gets paginated results and return total
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = page;
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      items,
      metadata: {
        totalItems,
        itemsPerPage: limit,
        currentPage,
        totalPages,
        hasNextPage,
        hasPreviousPage
      }
    };


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

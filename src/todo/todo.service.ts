import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetAllDto } from './dto/get-all.dto';
import { PaginationResponse } from './interfaces/pagination.interface';
import { StatusType } from './ENUMS/status.enums';

interface FindOptionsWhere<T> {
  [key: string]: any;
}
export abstract class BaseService<T> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async create(dto: any): Promise<T> {
    return this.repository.save(dto);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<T | null> {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (entity === null || this.isDeleted(entity)) {
      return null;
    }
    return entity;
  }

  async update(id: number, dto: any): Promise<T | null> {
    const entity = await this.findOne(id);
    if (!entity) {
      return null;
    }
    await this.repository.update({ id } as any, dto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<T | null> {
    const entity = await this.findOne(id);
    if (!entity) {
      return null;
    }
    await this.markAsDeleted(entity);
    await this.repository.save(entity);
    return entity;
  }

  protected isDeleted(entity: T): boolean {
    // Implement your logic to check if an entity is deleted  
    return false;
  }

  protected async markAsDeleted(entity: T): Promise<void> {
    // Implement your logic to mark an entity as deleted  
  }
}


@Injectable()
export class TodoService extends BaseService<Todo> {

  getTodoByStatus(status: StatusType) {
    return this.repository.find({ where: { status: status } });
  }
  // implement pagination
  async getAll(page: number, limit: number, sortBy: string, sortDirection: 'ASC' | 'DESC'): Promise<PaginationResponse<Todo>> {
    console.log(page, limit, sortBy, sortDirection);
    const skip = (page - 1) * limit; // number of items to skip
    const queryBuilder = this.repository.createQueryBuilder('todo');

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
    const res = await this.repository.findOne({ where: { id } });
    if (res === null || res.deletedAt !== null)
      return null;
    return res;
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
    const res = await this.repository.findOne({ where: { id } });
    if (res === null || res.deletedAt !== null)
      return null;
    res.updatedAt = new Date();
    return this.repository.update({ id }, updateTodoDto);

  }

  async deleteTodo(id: number) {
    const res = await this.repository.findOne({ where: { id } });
    if (res === null)
      return null;
    res.deletedAt = new Date();
    res.updatedAt = null;
    return this.repository.update({ id }, { deletedAt: new Date() });
  }

}

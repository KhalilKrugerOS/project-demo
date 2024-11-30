import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus, UseFilters, ForbiddenException, ParseIntPipe, DefaultValuePipe, ParseEnumPipe, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { GetAllDto } from './dto/get-all.dto';
import { PaginationResponse } from './interfaces/pagination.interface';
import { Todo } from './entities/todo.entity';
import { StatusType } from './ENUMS/status.enums';
import { HttpExceptionFilter } from './exception.filter';
import { AuthGuard } from 'src/auth/auth.guard';


//@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @UseFilters(HttpExceptionFilter)
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    try {
      return this.todoService.create(createTodoDto);
    } catch (error) {
      throw new HttpException(
        {
          status: 403,
          error: "please enter valid Todo"
        }, HttpStatus.FORBIDDEN,
        { cause: error }
      )
    }
    //throw new ForbiddenException();
  }

  @Get()
  async getAllTodos(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query("sortBy", new DefaultValuePipe('createdAt'), new ParseEnumPipe(['createdAt', 'updatedAt', 'name', 'id'])) sortBy: string,
    @Query("sortDirection", new DefaultValuePipe('ASC')) sortDirection: 'ASC' | 'DESC',
  ): Promise<PaginationResponse<Todo>> {
    return this.todoService.getAll(page, limit, sortBy, sortDirection);
  }
  @Get('/status/:status')
  getTodoByStatus(@Param('status') status: StatusType) {
    return this.todoService.getTodoByStatus(status);
  }
  @Get(':id')
  findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateTodo(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.deleteTodo(+id);
  }
}

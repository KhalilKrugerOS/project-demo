import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoMiddleware } from './todo.middleware';
//import { TodoMiddleware } from './todo.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService, /*TodoMiddleware*/],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(TodoMiddleware).forRoutes('todo');
  }
}

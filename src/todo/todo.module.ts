import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { AuthGuard } from 'src/auth/auth.guard';
//import { TodoMiddleware } from './todo.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService, /*{
    provide: 'APP_GUARD',
    useClass: AuthGuard,
  }*/],
})
export class TodoModule {

}

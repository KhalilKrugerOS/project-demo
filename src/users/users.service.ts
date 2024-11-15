import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
  async create(createUserDto: CreateUserDto) {
    const res = await this.userRepository.save(createUserDto);
    return res
  }

  async findAll() {
    const res = await this.userRepository.find();
    return res;
  }

  async findOne(id: number) {
    const res = await this.userRepository.findOne({ where: { id } });
    return res;
  }

  async findByName(username: string) {
    const res = await this.userRepository.findOne({ where: { name: username } });
    return res;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

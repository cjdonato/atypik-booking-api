import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = this.usersRepository.create(createUserDTO);
    return this.usersRepository.save(newUser);
  }

  async getUserByID(userID: number): Promise<User> {
    // const user = this.users.find((u) => u.id === userID);
    return this.usersRepository.findOneBy({ id: userID });
  }

  async getUser(createUserDTO: CreateUserDTO): Promise<User> {
    // const user = this.users.find((u) => u.id === userID);
    return this.usersRepository.findOneBy({
      username: createUserDTO.username,
      password: createUserDTO.password,
    });
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // async editUser(userID: number, createUserDTO: CreateUserDTO): Promise<User> {
  //   // TODO alternative ?
  //   await this.deleteUser(userID);
  //   this.users.push(createUserDTO);

  //   return this.users.at(-1);
  // }

  async deleteUser(userID: number): Promise<any> {
    // const userIndex = this.users.findIndex((u) => u.id === userID);
    // return this.users.splice(userIndex, 1);
    return this.usersRepository.delete(userID);
  }
}

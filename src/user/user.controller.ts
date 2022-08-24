import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // Create a user
  @Post('/')
  async create(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    const newUser = await this.userService.addUser(createUserDTO);

    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully!',
      user: newUser,
    });
  }

  @Get('/:userID')
  async getUser(@Res() res, @Param('userID') userID) {
    const user = await this.userService.getUser(userID);

    if (!user) throw new NotFoundException('User does not exist!');

    return res.status(HttpStatus.OK).json(user);
  }

  @Get('/')
  async getUsers(@Res() res) {
    const users = await this.userService.getUsers();

    return res.status(HttpStatus.OK).json(users);
  }

  // @Put('/')
  // async editUser(
  //   @Res() res,
  //   @Query('userID') userID,
  //   @Body() createUserDTO: CreateUserDTO,
  // ) {
  //   const editedUser = await this.userService.editUser(userID, createUserDTO);

  //   if (!editedUser) throw new NotFoundException('User does not exist!');

  //   return res.status(HttpStatus.OK).json({
  //     message: 'User has been successfully updated!',
  //     user: editedUser,
  //   });
  // }

  @Delete('/delete')
  async deleteUser(@Res() res, @Query('userID') userID) {
    const deletedUser = await this.userService.deleteUser(userID);

    if (!deletedUser) throw new NotFoundException('User does not exist!');

    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully deleted!',
      user: deletedUser,
    });
  }
}

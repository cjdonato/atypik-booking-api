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
import { AccommodationService } from './accommodation.service';
import { CreateAccommmodationDTO } from './dto/create-accommodation.dto';

@Controller('accommodation')
export class AccommodationController {
  constructor(private accommodationService: AccommodationService) {}

  @Post('/')
  async create(
    @Res() res,
    @Body() createAccommodationDTO: CreateAccommmodationDTO,
  ) {
    const newAccommodation = await this.accommodationService.addAccommodation(
      createAccommodationDTO,
    );

    return res.status(HttpStatus.OK).json({
      message: 'Accommodation has been created successfully!',
      accommodation: newAccommodation,
    });
  }

  @Get('/:accommodationID')
  async getAccommodation(
    @Res() res,
    @Param('accommodationID') accommodationID,
  ) {
    const accommodation = await this.accommodationService.getAccommodation(
      accommodationID,
    );

    if (!accommodation)
      throw new NotFoundException('Accommodation does not exist!');

    return res.status(HttpStatus.OK).json(accommodation);
  }

  @Get('/')
  async getAccommodations(@Res() res) {
    const accommodations = await this.accommodationService.getAccommodations();

    return res.status(HttpStatus.OK).json(accommodations);
  }

  // @Put('/')
  // async editUser(
  //   @Res() res,
  //   @Query('userID') userID,
  //   @Body() createAccommodationDTO: CreateAccommodationDTO,
  // ) {
  //   const editedUser = await this.accommodationService.editUser(userID, createAccommodationDTO);

  //   if (!editedUser) throw new NotFoundException('User does not exist!');

  //   return res.status(HttpStatus.OK).json({
  //     message: 'User has been successfully updated!',
  //     user: editedUser,
  //   });
  // }

  @Delete('/delete')
  async deleteAccommodation(
    @Res() res,
    @Query('accommodationID') accommodationID,
  ) {
    const deletedAccommodation =
      await this.accommodationService.deleteAccommodation(accommodationID);

    if (!deletedAccommodation)
      throw new NotFoundException('Accommodation does not exist!');

    return res.status(HttpStatus.OK).json({
      message: 'Accommodation has been successfully deleted!',
      accommodation: deletedAccommodation,
    });
  }
}

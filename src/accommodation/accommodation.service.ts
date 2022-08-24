import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Accommodation } from './accommodation.entity';
import { CreateAccommmodationDTO } from './dto/create-accommodation.dto';

@Injectable()
export class AccommodationService {
  constructor(
    @InjectRepository(Accommodation)
    private accommodationRepository: Repository<Accommodation>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async addAccommodation(
    createAccommodationDTO: CreateAccommmodationDTO,
  ): Promise<Accommodation> {
    const { id, name, description, image, userID } = createAccommodationDTO;

    const user = await this.usersRepository.findOneBy({ id: userID });

    const newAccommodation = this.accommodationRepository.create({
      id,
      name,
      description,
      image,
      user,
    });

    return this.accommodationRepository.save(newAccommodation);
  }

  async getAccommodation(accommodationID: number): Promise<Accommodation> {
    return this.accommodationRepository.findOneBy({ id: accommodationID });
  }

  async getAccommodations(): Promise<Accommodation[]> {
    return this.accommodationRepository.find({ relations: { user: true } });
  }

  // async editUser(userID: number, createUserDTO: CreateUserDTO): Promise<User> {
  //   // TODO alternative ?
  //   await this.deleteUser(userID);
  //   this.users.push(createUserDTO);

  //   return this.users.at(-1);
  // }

  async deleteAccommodation(accommodationID: number): Promise<any> {
    return this.accommodationRepository.delete(accommodationID);
  }
}

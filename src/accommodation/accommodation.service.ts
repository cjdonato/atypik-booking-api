import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { Accommodation } from './accommodation.entity';
import { CreateAccommmodationDTO } from './dto/create-accommodation.dto';
// import { faker } from '@faker-js/faker';

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
    const { id, type, name, description, image, price, capacity, userID } =
      createAccommodationDTO;

    const user = await this.usersRepository.findOneBy({ id: userID });

    const newAccommodation = this.accommodationRepository.create({
      id,
      type,
      name,
      description,
      image,
      price,
      capacity,
      user,
    });

    return this.accommodationRepository.save(newAccommodation);
  }

  async getAccommodation(accommodationID: number): Promise<Accommodation> {
    return this.accommodationRepository.findOneBy({ id: accommodationID });
  }

  async getAccommodationByUser(userID: number): Promise<Accommodation[]> {
    const user = await this.usersRepository.findOneBy({ id: userID });

    return this.accommodationRepository.findBy({ user });
  }

  async getAccommodations(): Promise<Accommodation[]> {
    // Create 10 random accoms
    // for (let i = 0; i < 10; i++) {
    //   const randomType = 'Category' + (Math.floor(Math.random() * 3) + 1);
    //   const randomName = faker.lorem.words();
    //   const randomDesc = faker.lorem.paragraphs();
    //   const randomImage = faker.image.nature(640, 480, true);
    //   const randomPrice = Math.floor(Math.random() * 300) + 10;
    //   const randomCapacity = Math.floor(Math.random() * 10) + 1;

    //   const userID = Math.floor(Math.random() * 55) + 8;
    //   const user = await this.usersRepository.findOneBy({ id: userID });

    //   const newRandomAccom = this.accommodationRepository.create({
    //     type: randomType,
    //     name: randomName,
    //     description: randomDesc,
    //     image: randomImage,
    //     price: randomPrice,
    //     capacity: randomCapacity,
    //     user,
    //   });
    //   this.accommodationRepository.save(newRandomAccom);
    // }

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

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    const exsistingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (exsistingUser) throw new BadRequestException('User Already exsists');
    const createUser = await this.userModel.create(createUserDto);
    return createUser;
  }

  findAll() {
    return this.userModel.find();
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel
      .findOne({ email: email })
      .select('+password');
    return user;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException('invalid (Mongo id)');
    const findUser = await this.userModel.findById(id);
    if (!findUser) throw new NotFoundException('user not found');
    return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id))
      throw new BadRequestException('invalid (Mongo id)');
    const updateUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    if (!updateUser) throw new NotFoundException('user not found');
    return updateUser;
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    return deletedUser;
  }
}

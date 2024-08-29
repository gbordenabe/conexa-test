import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    const user = await createdUser.save();
    return { id: user._id, email: user.email, role: user.role };
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findOneById(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }

  async removeAll() {
    return await this.userModel.deleteMany({}).exec();
  }
}

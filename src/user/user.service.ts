import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly UserModel : Model<UserDocument>) {}

    async create(name: string,email: string, hashPassword: string): Promise<UserDocument> {
        console.log('name',name,email,hashPassword)
        const newUser = new this.UserModel({name,email, password:hashPassword})
        console.log('newUser',newUser)
        return newUser.save()
    }

    getDetails(user:UserDocument) {
        return {
            id: user._id,
            name: user.name,
            email: user.email
        }
    }

    async findByEmail(email:String) {
        return await this.UserModel.findOne({email}).exec()
    }

    findById(id:string) {
        return this.UserModel.findById(id).exec()

    }
}

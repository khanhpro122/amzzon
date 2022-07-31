import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel : Model<ProductDocument>){}
    async createProduct(name:string,price:number,description:string): Promise<ProductDocument>{
        const newProduct = new this.productModel({name,price,description})
        return newProduct.save()
    }

    async findAllProduct(): Promise<ProductDocument[]> {
        return this.productModel.find().exec()
    }

    async findProductById(id:string): Promise<ProductDocument> {
        return this.productModel.findById(id).exec()
    }

    async updateProduct(id:string, newName: string, newPrice: number, newDescription: string): Promise<ProductDocument> {
        let product = await this.productModel.findById(id).exec()
        product.name = newName
        product.price = newPrice
        product.description = newDescription
        return product.save()
    }

    async deleteProduct(id:string) {
        return this.productModel.deleteOne({_id : id})
    }
}

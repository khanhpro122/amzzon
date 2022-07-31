import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService : ProductService){}
    @Post()
    create(@Body('name') name :string,@Body('price') price: number,@Body('description') description:string){
        return this.productService.createProduct(name,price,description)
    }

    @Get()
    findAll(){
        return this.productService.findAllProduct()
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    findProductById(@Param('id') id : string){
        return this.productService.findProductById(id)
    }

    @Patch(':id')
    updateProduct(@Param('id') id : string, @Body('name') name : string, @Body('price') price : number, @Body('description') description : string){
        return this.productService.updateProduct(id,name,price,description)
    }

    @Delete(':id')
    deleteProduct(@Param('id') id : string){
        return this.productService.deleteProduct(id)
    }
}

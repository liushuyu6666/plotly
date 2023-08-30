import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';

@Resolver('Product')
export class ProductResolver {
    constructor(private readonly productService: ProductService) {}

    @Mutation('createProduct')
    async create(
        @Args('createProductInput') createProductInput: CreateProductInput,
    ) {
        return await this.productService.create(createProductInput);
    }

    @Query('products')
    async findAll() {
        return await this.productService.findAll();
    }

    @Query('product')
    async findOne(@Args('id') id: string) {
        return await this.productService.findOne(id);
    }
}

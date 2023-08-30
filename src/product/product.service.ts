import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    async create(createProductInput: CreateProductInput): Promise<Product> {
        return await this.productRepository.save(createProductInput);
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async findOne(id: string): Promise<Product> {
        return await this.productRepository.findOne({
            where: { id: id },
        });
    }
}

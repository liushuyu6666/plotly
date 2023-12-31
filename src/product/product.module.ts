/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
	providers: [ProductResolver, ProductService, Repository<Product>],
})
export class ProductModule {}

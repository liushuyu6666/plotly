import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    async create(createUserInput: CreateUserInput): Promise<User> {
        const { orderIds, ...restOfCreateUserInput } = createUserInput;
        const orderIdsWithoutDup = Array.from(new Set(orderIds));
        const allProducts = await this.productRepository.find();
        const selectedProducts = allProducts.filter((prod) =>
            orderIdsWithoutDup.includes(prod.id),
        );

        const user = {
            ...restOfCreateUserInput,
            order: selectedProducts,
        };

        return await this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
        return await this.userRepository.findOne({
            where: { id: id },
        });
    }
}

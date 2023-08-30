import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Product])],
    providers: [
        UserResolver,
        UserService,
        Repository<User>,
        Repository<Product>,
    ],
})
export class UserModule {}

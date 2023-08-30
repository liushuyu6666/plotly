import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

describe('UserService', () => {
    let userService: UserService;
    let userRepository: Repository<User>;
    let productRepository: Repository<Product>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Product),
                    useClass: Repository,
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
        productRepository = module.get<Repository<Product>>(
            getRepositoryToken(Product),
        );
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('create', () => {
        it('should create a user with valid input', async () => {
            const createUserInput: CreateUserInput = {
                name: 'jack',
                email: 'jack@gmail.com',
                age: 23,
                orderIds: ['11111111-1111-1111-1111-111111111111'],
            };

            const product: Product = {
                id: '11111111-1111-1111-1111-111111111111',
                name: 'test_product',
                price: 12.3,
            };

            const user = {
                name: 'jack',
                email: 'jack@gmail.com',
                age: 23,
                order: [product],
            };

            productRepository.find = jest.fn().mockResolvedValue([product]);
            userRepository.find = jest.fn().mockResolvedValue([]);
            userRepository.save = jest.fn().mockResolvedValue(user);

            const result = await userService.create(createUserInput);
            expect(userRepository.save).toHaveBeenCalledWith(user);
            expect(result).toBeDefined();
        });

        it('should throw an error if product name already exists', async () => {
            const createUserInput: CreateUserInput = {
                name: 'jack',
                email: 'jack@gmail.com',
                age: 23,
                orderIds: ['11111111-1111-1111-1111-111111111111'],
            };

            const product: Product = {
                id: '11111111-1111-1111-1111-111111111111',
                name: 'test_product',
                price: 12.3,
            };

            const user: User = {
                id: '11111111-1111-1111-1111-111111111112',
                name: 'jack',
                email: 'jack@gmail.com',
                age: 23,
                order: [product],
            };

            productRepository.find = jest.fn().mockResolvedValue([]);
            userRepository.find = jest.fn().mockResolvedValue([user]);

            await expect(
                userService.create(createUserInput),
            ).rejects.toThrowError();
        });
    });

    describe('findAll', () => {
        it('should return all users', async () => {
            const product: Product = {
                id: '11111111-1111-1111-1111-111111111111',
                name: 'test_product',
                price: 12.3,
            };

            const users: User[] = [
                {
                    id: '11111111-1111-1111-1111-111111111112',
                    name: 'jack',
                    email: 'jack@gmail.com',
                    age: 23,
                    order: [product],
                },
                {
                    id: '11111111-1111-1111-1111-111111111113',
                    name: 'john',
                    email: 'john@gmail.com',
                    age: 24,
                    order: [product],
                },
            ];

            userRepository.find = jest.fn().mockResolvedValue(users);

            const result = await userService.findAll();
            expect(result).toEqual(users);
        });
    });

    describe('findOne', () => {
        it('should return one user', async () => {
            const product: Product = {
                id: '11111111-1111-1111-1111-111111111111',
                name: 'test_product',
                price: 12.3,
            };

            const user: User = {
                id: '11111111-1111-1111-1111-111111111112',
                name: 'jack',
                email: 'jack@gmail.com',
                age: 23,
                order: [product],
            };

            userRepository.findOne = jest.fn().mockResolvedValue(user);

            const result = await userService.findOne(
                '11111111-1111-1111-1111-111111111112',
            );
            expect(result).toEqual(user);
        });
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { Product } from 'src/product/entities/product.entity';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

describe('UserResolver', () => {
    let userResolver: UserResolver;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserResolver,
                {
                    provide: UserService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
            ],
        }).compile();

        userResolver = module.get<UserResolver>(UserResolver);
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userResolver).toBeDefined();
    });

    describe('create', () => {
        it('should create a user with valid input', async () => {
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
            const createUserInput: CreateUserInput = {
                name: 'jack',
                email: 'jack@gmail.com',
                age: 23,
                orderIds: ['11111111-1111-1111-1111-111111111111'],
            };

            userService.create = jest.fn().mockResolvedValue(user);

            const result = await userResolver.create(createUserInput);
            expect(userService.create).toHaveBeenCalledWith(createUserInput);
            expect(result).toEqual(user);
        });
    });

    describe('findAll', () => {
        it('should return all users', async () => {
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

            userService.findAll = jest.fn().mockResolvedValue([user]);

            const result = await userResolver.findAll();
            expect(result).toEqual([user]);
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

            userService.findOne = jest.fn().mockResolvedValue(user);

            const result = await userResolver.findOne(
                '11111111-1111-1111-1111-111111111112',
            );
            expect(result).toEqual(user);
        });
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';

describe('ProductResolver', () => {
    let productResolver: ProductResolver;
    let productService: ProductService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductResolver,
                {
                    provide: ProductService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                    },
                },
            ],
        }).compile();

        productResolver = module.get<ProductResolver>(ProductResolver);
        productService = module.get<ProductService>(ProductService);
    });

    it('should be defined', () => {
        expect(productResolver).toBeDefined();
    });

    describe('create', () => {
        it('should create a product with valid input', async () => {
            const createProductInput: CreateProductInput = {
                name: 'test_prod',
                price: 100.01,
            };

            const product: Product = {
                id: '11111111-1111-1111-1111-111111111111',
                ...createProductInput,
            };

            productService.create = jest.fn().mockResolvedValue(product);

            const result = await productResolver.create(createProductInput);
            expect(productService.create).toHaveBeenCalledWith(
                createProductInput,
            );
            expect(result).toEqual(product);
        });
    });

    describe('findAll', () => {
        it('should return all products', async () => {
            const products: Product[] = [
                {
                    id: '11111111-1111-1111-1111-111111111111',
                    name: 'test_prod1',
                    price: 10.23,
                },
                {
                    id: '11111111-1111-1111-1111-111111111112',
                    name: 'test_prod2',
                    price: 10.11,
                },
            ];

            productService.findAll = jest.fn().mockResolvedValue(products);

            const result = await productResolver.findAll();
            expect(result).toEqual(products);
        });
    });

    describe('findOne', () => {
        it('should return one products', async () => {
            const product: Product = {
                id: '11111111-1111-1111-1111-111111111111',
                name: 'test_prod1',
                price: 10.23,
            };

            productService.findOne = jest.fn().mockResolvedValue(product);

            const result = await productResolver.findOne(
                '11111111-1111-1111-1111-111111111111',
            );
            expect(result).toEqual(product);
        });
    });
});

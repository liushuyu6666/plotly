import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';

describe('ProductService', () => {
    let productService: ProductService;
    let productRepository: Repository<Product>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: getRepositoryToken(Product),
                    useClass: Repository,
                },
            ],
        }).compile();

        productService = module.get<ProductService>(ProductService);
        productRepository = module.get<Repository<Product>>(
            getRepositoryToken(Product),
        );
    });

    it('should be defined', () => {
        expect(productService).toBeDefined();
    });

    describe('create', () => {
        it('should create a product with valid input', async () => {
            const createProductInput: CreateProductInput = {
                name: 'test_prod1',
                price: 10.23,
            };

            const newProduct: Product = {
                id: '11111111-1111-1111-1111-111111111111',
                ...createProductInput,
            };

            productRepository.find = jest.fn().mockResolvedValue([]);
            productRepository.save = jest
                .fn()
                .mockResolvedValue({ newProduct });

            const result = await productService.create(createProductInput);
            expect(productRepository.save).toBeCalledWith(createProductInput);
            expect(result).toEqual({ newProduct });
        });

        it('should throw an error if product name already exists', async () => {
            const createProductInput: CreateProductInput = {
                name: 'test_prod1',
                price: 10.23,
            };

            const product: Product = {
                id: '11111111-1111-1111-1111-111111111111',
                ...createProductInput,
            };

            productRepository.find = jest.fn().mockResolvedValue([product]);

            await expect(
                productService.create(createProductInput),
            ).rejects.toThrowError();
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

            productRepository.find = jest.fn().mockResolvedValue(products);

            const result = await productService.findAll();
            expect(result).toEqual(products);
        });
    });

    describe('findOne', () => {
        it('should return one product', async () => {
            const product: Product = {
                id: '11111111-1111-1111-1111-111111111111',
                name: 'test_prod1',
                price: 10.23,
            };

            productRepository.findOne = jest.fn().mockResolvedValue(product);

            const result = await productService.findOne(
                '11111111-1111-1111-1111-111111111111',
            );

            expect(result).toEqual(product);
        });
    });
});

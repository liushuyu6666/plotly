import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: ':memory:',
			entities: [User, Product],
			synchronize: true,
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			typePaths: ['./**/*.graphql'],
			definitions: {
				path: join(process.cwd(), 'src/graphql.ts'),
			},
		}),
		UserModule,
		ProductModule,
	],
})
export class AppModule {}

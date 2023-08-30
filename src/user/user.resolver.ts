import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';

@Resolver('User')
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation('createUser')
    async create(@Args('createUserInput') createUserInput: CreateUserInput) {
        return await this.userService.create(createUserInput);
    }

    @Query('users')
    async findAll() {
        return await this.userService.findAll();
    }

    @Query('user')
    async findOne(@Args('id') id: string) {
        return await this.userService.findOne(id);
    }
}

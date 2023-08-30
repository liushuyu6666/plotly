
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateProductInput {
    name: string;
    price: number;
}

export interface CreateUserInput {
    name: string;
    email?: Nullable<string>;
    age: number;
    orderIds: Nullable<string>[];
}

export interface Product {
    id: string;
    name: string;
    price: number;
}

export interface IQuery {
    products(): Nullable<Product>[] | Promise<Nullable<Product>[]>;
    product(id: string): Nullable<Product> | Promise<Nullable<Product>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createProduct(createProductInput: CreateProductInput): Product | Promise<Product>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
}

export interface User {
    id: string;
    name: string;
    email?: Nullable<string>;
    age: number;
    order: Nullable<Product>[];
}

type Nullable<T> = T | null;

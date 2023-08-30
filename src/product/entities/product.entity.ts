import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
// @Unique(['name'])
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('numeric', { precision: 10, scale: 2 })
    price: number;
}

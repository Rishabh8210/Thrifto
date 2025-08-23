import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column()
    isVerified: boolean;

    @Column()
    totalAmount: number;
}
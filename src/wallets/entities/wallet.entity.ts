import { Users } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Wallets {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string

    @Column({ default: 0 })
    amount: number

    @ManyToOne(() => Users, (user) => user.wallets, { onDelete: 'CASCADE', onUpdate: 'CASCADE',nullable: false })
    user: Users
}
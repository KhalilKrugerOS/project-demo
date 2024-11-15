import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: true })
    currency: string;
    @Column()
    amount: number;
    @Column({ default: true })
    isActive: boolean;

}

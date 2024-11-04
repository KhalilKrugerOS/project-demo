import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { StatusEnum, StatusType } from "../ENUMS/status.enums";
import { IsNotEmpty, MaxLength, maxLength, MinLength, minLength } from "class-validator";
@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty({
        message: 'name is required'
    })
    @MinLength(3, {
        message: 'name must be at least 3 characters'
    })
    @MaxLength(10, {
        message: 'name must be less than 10 characters'
    })
    name: string;

    @Column()
    @MinLength(10, {
        message: 'description must be at least 10 characters'
    })
    @IsNotEmpty({
        message: 'description is required'
    })
    description: string;

    @Column({ nullable: true })
    createdAt: Date;

    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.IN_PROGRESS
    })
    Status: StatusType;
}

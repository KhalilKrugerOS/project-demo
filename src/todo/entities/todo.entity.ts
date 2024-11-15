import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusEnum, StatusType } from "../ENUMS/status.enums";
import { IsEnum, IsNotEmpty, MaxLength, maxLength, MinLength, minLength } from "class-validator";
import { crudEntity } from "./crudEntity.entity";
@Entity()
export class Todo extends crudEntity {
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

    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.IN_PROGRESS
    })
    @IsEnum(StatusEnum)
    status: StatusType;
}

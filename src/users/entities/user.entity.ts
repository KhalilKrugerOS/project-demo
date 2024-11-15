import { IsEmail, IsNotEmpty, IsString, Max, Min } from "class-validator";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty({
        message: 'name is required'
    })
    @IsString()
    @Min(3)
    @Max(30)
    name: string;

    @Column()
    @IsNotEmpty({
        message: 'email is required'
    })
    @IsString()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    @Min(8)
    @Max(50)
    @IsNotEmpty({
        message: 'password is required'
    })
    password: string;

}

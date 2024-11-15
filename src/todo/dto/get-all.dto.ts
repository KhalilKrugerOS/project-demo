import { DefaultValuePipe } from "@nestjs/common";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class GetAllDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    @Transform(({ value }) => value ? parseInt(value) : 1)
    page: number = 1;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    @Type(() => Number)
    //@Transform(({ value }) => value ? parseInt(value) : 1)
    limit: number = 10;

    @IsOptional()
    @IsString()
    //@Transform(({ value }) => value ? value : 'createdAt')
    sortBy: string = 'createdAt';

    @IsOptional()
    @IsEnum(['ASC', 'DESC'])
    //@Transform(({ value }) => value ? value : 'ASC')
    sortDirection: 'ASC' | 'DESC' = 'ASC';
}

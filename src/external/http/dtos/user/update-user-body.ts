import { IsOptional, IsString, Length, IsNumber } from "class-validator";
import { IsEmail } from "@helpers/emailValidator";
import { ApiProperty } from "@nestjs/swagger";


export class UpdateUserBody {
    @ApiProperty({ example: 'Marcos Mantovani', description: 'IsOptional(not required)' })
    @IsOptional()
    @Length(4, 100)
    @IsString()
    name?: string;
    @ApiProperty({ example: 'teste@teste.com', description: 'IsOptional(not required)' })
    @IsOptional()
    @Length(4, 100)
    @IsEmail()
    email?: string;
    @ApiProperty({ example: 'pass@sword123*', description: 'IsOptional(not required), Min length: 8, Max length: 20' })
    @IsOptional()
    @Length(8, 20)
    @IsString()
    password?: string;
    @ApiProperty({ example: '12345678901', description: 'IsOptional(not required), Min length: 11, Max length: 12' })
    @Length(11, 12)
    @IsOptional()
    @IsString()
    cpf?: string;
}
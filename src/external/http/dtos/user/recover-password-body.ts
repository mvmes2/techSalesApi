import { Length, IsNotEmpty } from "class-validator";
import { IsEmail } from "@helpers/emailValidator";
import { ApiProperty } from "@nestjs/swagger";


export class RecoverPasswordDTO {
    @IsNotEmpty()
    @ApiProperty({ example: 'teste@teste.com', description: 'IsRequired!' })
    @Length(4, 100)
    @IsEmail()
    email?: string;
}
import { IsOptional, IsString, Length, IsNumber } from "class-validator";



export class UpdateUserPasswordAccessTokenBody {
    @Length(8, 20)
    @IsString()
    password: string;
    @Length(265, 400)
    @IsString()
    token: string;
}
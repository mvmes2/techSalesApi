import { IsNotEmpty, IsNumber, IsOptional, IsString, Length,  } from "class-validator";
import { IsEmail } from "@helpers/emailValidator";
import { Type } from "class-transformer";

export class CreateCustomerBody {
    @IsNotEmpty()
    @Length(4, 100)
    @IsString()
    customer_name: string;
    
    @IsEmail()
    @IsNotEmpty()
    @Length(6, 100)
    customer_email: string;

    @IsOptional()
    @IsString()
    customer_address: string;

    @IsOptional()
    @IsString()
    customer_address_number: string;

    @IsOptional()
    @IsString()
    customer_phone_number: string;

    @IsOptional()
    @IsString()
    customer_cpf: string;

    @IsOptional()
    @IsString()
    customer_cep: string;

    @IsOptional()
    @IsString()
    customer_neighborhood: string;

    @IsOptional()
    created_at: Date;
}
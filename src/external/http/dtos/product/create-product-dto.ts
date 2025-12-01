import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, isUUID, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDTO {

    @IsNotEmpty()
    @IsUUID()
    company_id: string;

    @IsOptional()
    @IsString()
    @Length(10, 255)
    description?: string;

    @IsOptional()
    @IsNumber()
    search_number?: number;

    @IsOptional()
    @IsNumber()
    serial_number?: number;

    @IsOptional()
    @IsString()
    code_bar_id?: string;

    @IsOptional()
    @IsString()
    product_type_id?: string;

    @IsString()
    @IsNotEmpty()
    product_name: string;

    @IsOptional()
    @IsString()
    product_brand?: string;

    @IsOptional()
    @IsNumber()
    product_weight?: number;

    @IsOptional()
    @IsNumber()
    bought_value?: number;

    @IsNotEmpty()
    @IsNumber()
    sell_value: number;

    @IsOptional()
    @IsString()
    discount_id?: string;


    @IsOptional()
    @IsString()
    product_img?: string;

    @IsOptional()
    @IsDate()
    validity?: Date;

    @IsOptional()
    @IsDate()
    packaging_date?: Date;

    @IsOptional()
    @IsNumber()
    quantity?: number
}
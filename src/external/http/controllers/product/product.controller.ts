import { IsPublic } from "@app/auth/decorators/is-public.decorator";
import { ProductService } from "@app/use-cases/product/product-service";
import { CreateProductDTO } from "@external/http/dtos/product/create-product-dto";
import { Body, Controller, HttpStatus, Post } from "@nestjs/common";

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}
    @IsPublic()
    @Post()
    async create(@Body() body: CreateProductDTO) {
        try {
            await this.productService.create(body);
            return HttpStatus.CREATED
        } catch (err: any) {
            console.log('err no controller, ', err)
        }
    }
}

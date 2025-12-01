import { Injectable } from "@nestjs/common";
import { CreateProduct, CreateProductRequest, CreateProductResponse } from "./create-product";


@Injectable()
export class ProductService {
    constructor(
            private createProduct: CreateProduct,
    ) {}

    async create(request: CreateProductRequest):Promise<CreateProductResponse> {
        return await this.createProduct.execute(request);
    }
}
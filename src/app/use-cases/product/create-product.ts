import { Email } from "@app/entities/user/validations/user.email.validation";
import { Customer } from "@app/entities/customer/customer";
import { spTimeZoneDate } from "@helpers/dateSpTimezone";
import { Injectable } from "@nestjs/common";
import { capitalizeWords } from "@helpers/captalizeWords";
import { Productrepository } from "@app/repositories/product/product-repository";
import { Product } from "@app/entities/product/product";

export interface CreateProductRequest {
    description?: string | null;
    company_id: string;
    search_number?: number | null;
    serial_number?: number | null;
    code_bar_id?: string | null;           
    product_type_id?: string;
    product_name?: string;
    product_brand?: string;
    product_weight?: number;
    bought_value?: number;
    sell_value: number;
    discount_id?: string | null;
    product_img?: string | null;
    validity?: Date | null;
    packaging_date?: Date | null;
    quantity?: number | null;
    updated_at?: Date | null;
    deleted_at?: Date | null;
}

export type CreateProductResponse = Product | 'Updated';

function normalizeRequest(request: CreateProductRequest): CreateProductRequest {
    return {
        ...request,
        serial_number: request.serial_number ?? null,
        validity: request.validity ?? null,
        description: request.description ?? null,
        code_bar_id: request.code_bar_id ?? null,
        discount_id: request.discount_id ?? null,
        product_img: request.product_img ?? null,
        packaging_date: request.packaging_date ?? null,
        quantity: request.quantity ?? 1,
    };
}
@Injectable()
export class CreateProduct {
    constructor(private readonly productRepository: Productrepository) { }
    async execute(request: CreateProductRequest): Promise<CreateProductResponse> {
        const normalizedRequest = normalizeRequest(request);
        const { product_name, product_brand, serial_number, validity, packaging_date, company_id } = normalizedRequest;

        const sameProductFound = await this.productRepository.findByNameAndBrand(product_name?.toLowerCase(), product_brand?.toLowerCase(), company_id);

        // se tiver o mesmo produto cadastrado Considerando serialNumber, validade e data de embalagem, acrescentaremos 1 em sua quantidade ao invés de criar um novo produto.
        // se o produto nao tiver serial number, temos que levar em conta ele como nulo para a comparação de um novo produto ou atualizar existente.
        // se o produto nao tem, ou tem data de validade, também temos que levar em consideração para tratar como adicionar novo produto, ou atulizar +1 na quantidade de um produto igual cadastrado.
        // se a data de embalagem do produto existir, também temos que levar em consideração na comparação para adicionar um novo produto, ou apenas atualizar a quantidade de um produto igual ja cadastrado.
        // a regra de negocio se extende para qualquer tipo de produto, seja eletronico, alimento, medicamento, por isso temos que entender o minimo que precisamos validar para tratar como um novo produto, ou apenas atualizar a quantidade.


        if (sameProductFound && sameProductFound.serial_number === serial_number && sameProductFound.validity === validity && sameProductFound.packaging_date === packaging_date) {
            const quantityToUpdate = (Number(sameProductFound.quantity) || 0) + 1;
            try {

                await this.productRepository.update(sameProductFound.id, company_id, { quantity: quantityToUpdate });
                return 'Updated'
            } catch (err: any) {
                console.log(err)
                return err
            }
        } else {
            try {
                const newProduct = new Product(normalizedRequest);
                await this.productRepository.create(newProduct);
                return newProduct;
            } catch (err: any) {
                console.log('error: ', err)
                return err
            }
        }
       
    }
}
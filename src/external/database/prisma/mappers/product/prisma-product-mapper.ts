import { Product } from "@app/entities/product/product";

export type RawProduct = {
    id: string;
    company_id: string;
    description?: string | null;
    search_number?: number | null;
    serial_number?: number | null;
    code_bar_id?: string | null;         
    product_type_id?: string;
    product_name: string;
    product_brand?: string;
    product_weight?: number;
    bought_value?: number;
    sell_value: number;
    discount_id?: string | null;
    product_img?: string | null;
    validity?: Date | null;
    packaging_date?: Date | null;
    quantity?: number | null;
    created_at: Date;
}

export class PrismaProductMapper {
    static toPrisma(product:Product) {
        return {
            id: product.id,
            company_id: product.company_id,
            description: product.description || null,
            search_number: product.search_number > 0 ? product.search_number : null,
            serial_number: product.serial_number > 0 ? product.serial_number : null,
            code_bar_id: product.code_bar_id || null,
            product_type_id: product.product_type_id || null,
            product_name: product.product_name || null,
            product_brand: product.product_brand || null,
            product_weight: product.product_weight > 0 ? product.product_weight : null,
            bought_value: product.bought_value > 0 ? product.bought_value : null,
            sell_value: product.sell_value > 0 ? product.sell_value : null,
            discount_id: product.discount_id || null,
            product_img: product.product_img || null,
            validity: product.validity instanceof Date && !isNaN(product.validity.getTime()) ? product.validity : null,
            quantity: product.quantity > 0 ? product.quantity : null,
            created_at: product.created_at
        }
    }
}


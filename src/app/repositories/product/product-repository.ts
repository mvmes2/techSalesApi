import { Product } from "@app/entities/product/product";

export interface ProductDataToUpdateProps {
    description?: string | null;
    value?: number | null;
    search_number?: number | null;
    serial_number?: number | null;
    code_bar_id?: string | null;           
    product_type_id?: string;
    product_name?: string;
    product_brand?: string;
    product_weight?: number;
    bought_value?: number;
    sell_value?: number;
    discount_id?: string | null;
    product_img?: string | null;
    validity?: Date | null;
    packaging_date?: Date | null;
    quantity?: number | null;
    updated_at?: Date | null;
    deleted_at?: Date | null;
}

export abstract class Productrepository {
    abstract create(product: Product): Promise<void>;
    abstract update(productId: string, companyId: string, dataToUpdate: ProductDataToUpdateProps): Promise<void>;
    abstract findById(productId: string, companyId: string): Promise<Product>;
    abstract findByNameAndBrand(productName: string, productBrand: string, companyId: string): Promise<Product>;
    abstract findBySearchNumber(productSearchNumber: number, companyId: string): Promise<Product>;
    abstract findBySerialNumber(productSerialNumber: number, companyId: string): Promise<Product>;
    abstract findByCodeBar(productCodeBarId: string, companyId: string): Promise<Product>;
}
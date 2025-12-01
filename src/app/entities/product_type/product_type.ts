import { Replace } from "src/helpers/Replace";
import { randomUUID } from "crypto";
import { spTimeZoneDate } from "@helpers/dateSpTimezone";
import { Product } from "../product/product";



export interface Product_Type_Props {
    company_id: string;
    type_name: string;
    products?: Product | null;
    created_at: Date
    deleted_at?: Date | null;
    updated_at?: Date | null;
}

export class Product_Type {
    private _id: string;
    private props: Product_Type_Props;

    constructor(props: Replace<Product_Type_Props, { created_at?: Date }>, id?: string) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            created_at: props.created_at ?? spTimeZoneDate(new Date()),
        };
    }

    public get id(): string {
        return this._id;
    }
    
    public get created_at(): Date {
        return this.props.created_at;
    }

    public get company_id(): string {
        return this.props.company_id;
    }

    public set company_id(company_id: string) {
        this.props.company_id = company_id;
    }

    public get type_name(): string {
        return this.props.type_name;
    }

    public set type_name(type_name: string) {
        this.props.type_name = type_name;
    }

    public get products(): Product | null | undefined{
        return this.props.products;
    }

    public set product(product: Product) {
        this.props.products = product;
    }

    public get deleted_at(): Date {
        return this.props.deleted_at;
    }

    public set deleted_at(deleted_at: Date) {
        this.props.deleted_at = deleted_at
    }

    public get updated_at(): Date | null | undefined{
        return this.props.updated_at;
    }

    public set updated_at(updated_at: Date) {
        this.props.updated_at = updated_at
    }

}
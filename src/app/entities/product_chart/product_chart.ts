import { Replace } from "src/helpers/Replace";
import { randomUUID } from "crypto";

import { spTimeZoneDate } from "@helpers/dateSpTimezone";
import { Product_Chart_Item } from "../product_chart_item/product_chart_item";


export interface Product_Chart_Props {
    company_id: string;
    created_at: Date
    deleted_at?: Date | null;
    products?:   Product_Chart_Item[] | null;
}

export class Product_Chart {
    private _id: string;
    private props: Product_Chart_Props;

    constructor(props: Replace<Product_Chart_Props, { created_at?: Date }>, id?: string) {
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

    public get products(): Product_Chart_Item[] | null | undefined {
        return this.props.products;
    }

    public set products(products: Product_Chart_Item[]) {
        this.props.products = products;
    }

   
    public get deleted_at(): Date {
        return this.props.deleted_at;
    }

    public set deleted_at(deleted_at: Date) {
        this.props.deleted_at = deleted_at
    }

}
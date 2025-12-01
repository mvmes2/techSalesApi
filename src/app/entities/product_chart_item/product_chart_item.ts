import { Replace } from "src/helpers/Replace";
import { randomUUID } from "crypto";

import { spTimeZoneDate } from "@helpers/dateSpTimezone";
import { Product } from "../product/product";


export interface Product_Chart_Item_Props {   
    company_id: string;
    product_chart_id?: string | null;
    product_id: string;
    product?: Product | null;
    quantity?: number | null;
}

export class Product_Chart_Item {
    private _id: string;
    private props: Product_Chart_Item_Props;

    constructor(id?: string) {
        this._id = id ?? randomUUID();
    }

    public get id(): string {
        return this._id;
    }

    public get company_id(): string {
        return this.props.company_id;
    }

    public set company_id(company_id: string) {
        this.props.company_id = company_id;
    }

    public get product(): Product | null | undefined {
        return this.props.product;
    }

    public set product(product: Product) {
        this.props.product = product;
    }

    public get product_chart_id(): string | null | undefined{
        return this.props.product_chart_id;
    }

    public set product_chart_id(product_chart_id: string) {
        this.props.product_chart_id = product_chart_id;
    }

    
    public get product_id(): string {
        return this.props.product_id;
    }

    public set product_id(product_id: string) {
        this.props.product_id = product_id;
    }
}
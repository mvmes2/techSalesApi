import { Replace } from "src/helpers/Replace";
import { randomUUID } from "crypto";
import { spTimeZoneDate } from "@helpers/dateSpTimezone";
import { Code_Bar } from "../code_bar/code_bar";
import { Product_Type } from "../product_type/product_type";
import { Discount } from "../discount/discount";

export interface Product_Props {
    company_id: string;
    description?: string | null;
    search_number?: number | null;
    serial_number?: number | null;
    code_bar_id?: string | null;
    code_bar?: Code_Bar | null;           
    product_type_id?: string;
    product_type?: Product_Type | null;
    product_name?: string;
    product_brand?: string;
    product_weight?: number;
    bought_value?: number;
    sell_value?: number;
    discount_id?: string | null;
    discount?: Discount;
    product_img?: string | null;
    validity?: Date | null;
    packaging_date?: Date | null;
    quantity?: number | null;
    created_at: Date;
    updated_at?: Date | null;
    deleted_at?: Date | null;
}

export class Product {
    private _id: string;
    private props: Product_Props;

    constructor(props: Replace<Product_Props, { created_at?: Date }>, id?: string) {
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

    public get search_number(): number | null | undefined {
        return this.props.search_number;
    }

    public set search_number(search_number: number) {
        this.props.search_number = search_number
    }

    public get description(): string | null | undefined {
        return this.props.description;
    }

    public set description(description: string) {
        this.props.description = description
    }

    public get serial_number(): number | null | undefined {
        return this.props.serial_number;
    }

    public set serial_number(serial_number: number) {
        this.props.serial_number = serial_number
    }

    public get product_name(): string {
        return this.props.product_name;
    }

    public set product_name(product_name: string) {
        this.props.product_name = product_name
    }

    public get product_brand(): string {
        return this.props.product_brand;
    }

    public set product_brand(product_brand: string) {
        this.props.product_brand = product_brand
    }

    public get product_weight(): number | null | undefined {
        return this.props.product_weight;
    }

    public set product_weight(product_weight: number) {
        this.props.product_weight = product_weight
    }
    
    public get bought_value(): number {
        return this.props.bought_value;
    }

    public set bought_value(bought_value: number) {
        this.props.bought_value = bought_value
    }

    public get sell_value(): number {
        return this.props.sell_value;
    }

    public set sell_value(sell_value: number) {
        this.props.sell_value = sell_value
    }

    public get discount_id(): string | null | undefined {
        return this.props.discount_id;
    }

    public set discount_id(discount_id: string) {
        this.props.discount_id = discount_id
    }

    public get discount(): Discount | null | undefined {
        return this.props.discount;
    }

    public set discount(discount: Discount) {
        this.props.discount = discount
    }

    public get code_bar_id(): string | null | undefined {
        return this.props.code_bar_id;
    }

    public set code_bar_id(code_bar_id: string) {
        this.props.code_bar_id = code_bar_id
    }

    public get code_bar(): Code_Bar | null | undefined {
        return this.props.code_bar;
    }

    public set code_bar(code_bar: Code_Bar) {
        this.props.code_bar = code_bar
    }

    public get product_type_id(): string | null | undefined {
        return this.props.product_type_id;
    }

    public set product_type_id(product_type_id: string) {
        this.props.code_bar_id = product_type_id
    }

    public get product_type(): Product_Type | null | undefined {
        return this.props.product_type;
    }

    public set product_type(product_type: Product_Type) {
        this.props.product_type = product_type
    }

    public get product_img(): string | null | undefined {
        return this.props.product_img;
    }

    public set product_img(product_img: string) {
        this.props.product_img = product_img
    }  

    public get validity(): Date | null | undefined {
        return this.props.validity;
    }

    public set validity(validity: Date) {
        this.props.validity = validity
    }

    public get packaging_date(): Date | null | undefined {
        return this.props.packaging_date;
    }

    public set packaging_date(packaging_date: Date) {
        this.props.packaging_date = packaging_date
    } 

    public get quantity(): number | null | undefined {
        return this.props.quantity;
    }

    public set quantity(quantity: number) {
        this.props.quantity = quantity
    }

    public get updated_at(): Date | null | undefined {
        return this.props.updated_at;
    }

    public set updated_at(updated_at: Date) {
        this.props.updated_at = updated_at
    }

    public get deleted_at(): Date | null | undefined {
        return this.props.deleted_at;
    }

    public set deleted_at(deleted_at: Date) {
        this.props.deleted_at = deleted_at
    }
}
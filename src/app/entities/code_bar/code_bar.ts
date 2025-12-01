import { Replace } from "src/helpers/Replace";
import { randomUUID } from "crypto";
import { spTimeZoneDate } from "@helpers/dateSpTimezone";
import { Product } from "../product/product";



export interface Code_Bar_Props {
    company_id: string;
    code_bar_number: number;
    product_id?: string | null;
    product?: Product | null;
    created_at: Date
    deleted_at?: Date | null;
    updated_at?: Date | null;
}

export class Code_Bar {
    private _id: string;
    private props: Code_Bar_Props;

    constructor(props: Replace<Code_Bar_Props, { created_at?: Date }>, id?: string) {
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

    public get code_bar_number(): number {
        return this.props.code_bar_number;
    }

    public set code_bar_number(code_bar_number: number) {
        this.props.code_bar_number = code_bar_number;
    }

    public get product_id(): string | null | undefined{
        return this.props.product_id;
    }

    public set product_id(product_id: string) {
        this.props.product_id = product_id;
    }

    public get product(): Product | null | undefined{
        return this.props.product;
    }

    public set product(product: Product) {
        this.props.product = product;
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
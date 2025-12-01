import { Replace } from "src/helpers/Replace";
import { randomUUID } from "crypto";
import { spTimeZoneDate } from "@helpers/dateSpTimezone";
import { Product } from "../product/product";



export interface Discount_Props {
    company_id: string;
    discount_type: string; //Promoção | Bônus | Manual  -> adicionar manualmente em um select no front apenas essas opções. 
    description?: string | null;
    value?: number | null;
    percent?: number | null;
    created_by: string
    start_at?: Date | null;
    end_at?: Date | null;
    created_at: Date;
    deleted_at: Date | null;
    updated_at: Date | null;
    products?: Product[];
    // Sale?: Sale[];
}

export class Discount {
    private _id: string;
    private props: Discount_Props;

    constructor(props: Replace<Discount_Props, { created_at?: Date }>, id?: string) {
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

    public get discount_type(): string {
        return this.props.discount_type;
    }

    public set discount_type(discount_type: string) {
        this.props.discount_type = discount_type;
    }

    public get description(): string | null | undefined{
        return this.props.description;
    }

    public set description(description: string) {
        this.props.description = description;
    }

    public get value(): number | null | undefined{
        return this.props.value;
    }

    public set value(value: number) {
        this.props.value = value;
    }
  
    public get percent(): number | null | undefined{
        return this.props.percent;
    }

    public set percent(percent: number) {
        this.props.percent = percent;
    }

    public get created_by(): string {
        return this.props.created_by;
    }

    public set created_by(created_by: string) {
        this.props.created_by = created_by;
    }
    
    public get start_at(): Date | null | undefined {
        return this.props.start_at;
    }

    public set start_at(start_at: Date) {
        this.props.start_at = start_at;
    }
    
    public get end_at(): Date | null | undefined {
        return this.props.end_at;
    }

    public set end_at(end_at: Date) {
        this.props.end_at = end_at;
    }
    
    public get products(): Product[] | null | undefined {
        return this.props.products;
    }

    public set products(products: Product[]) {
        this.props.products = products;
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
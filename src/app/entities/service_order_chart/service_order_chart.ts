import { Replace } from "src/helpers/Replace";
import { randomUUID } from "crypto";
import { spTimeZoneDate } from "@helpers/dateSpTimezone";
import { Service_Order_Chart_Item } from "../service_order_chart_item/service_order_chart_item";


export interface Service_Order_Chart_Props {
    company_id: string;
    service_name?: string | null;
    description?: string | null;
    value?: number | null;
    created_at: Date;
    updated_at?: Date | null;
    deleted_at?: Date | null;
    service_order_items?: Service_Order_Chart_Item[]
}

export class Service_Order_Chart {
    private _id: string;
    private props: Service_Order_Chart_Props;

    constructor(props: Replace<Service_Order_Chart_Props, { created_at?: Date }>, id?: string) {
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
  
    public get service_name(): string | null | undefined{
        return this.props.service_name;
    }

    public set service_name(service_name: string) {
        this.props.service_name = service_name
    }

    public get description(): string | null | undefined{
        return this.props.description;
    }

    public set description(description: string) {
        this.props.description = description
    }

    public get value(): number | null | undefined{
        return this.props.value;
    }

    public set value(value: number) {
        this.props.value = value
    }

    public get service_order_items(): Service_Order_Chart_Item[] | null | undefined {
        return this.props.service_order_items;
    }

    public set service_order_items(service_order_items: Service_Order_Chart_Item[]) {
        this.props.service_order_items = service_order_items;
    }

    public get updated_at(): Date | null | undefined{
        return this.props.updated_at;
    }

    public set updated_at(updated_at: Date) {
        this.props.updated_at = updated_at
    }

    public get deleted_at(): Date | null | undefined{
        return this.props.deleted_at;
    }

    public set deleted_at(deleted_at: Date) {
        this.props.deleted_at = deleted_at
    }
}
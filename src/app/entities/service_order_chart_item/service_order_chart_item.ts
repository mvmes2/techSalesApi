import { Replace } from "src/helpers/Replace";
import { randomUUID } from "crypto";

import { spTimeZoneDate } from "@helpers/dateSpTimezone";
import { Service_Order_Item } from "../service_order_item/service_order_item";


export interface Service_Order_Chart_Item_Props {   
    company_id: string;
    service_order_chart_id?: string | null;
    service_order_item_id: string;
    service_order_item?: Service_Order_Item | null;
    quantity?: number | null;
}

export class Service_Order_Chart_Item {
    private _id: string;
    private props: Service_Order_Chart_Item_Props;

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

    public get service_order_item(): Service_Order_Item | null | undefined {
        return this.props.service_order_item;
    }

    public set service_order_item(service_order_item: Service_Order_Item) {
        this.props.service_order_item = service_order_item;
    }

    public get service_order_chart_id(): string | null | undefined{
        return this.props.service_order_chart_id;
    }

    public set service_order_chart_id(service_order_chart_id: string) {
        this.props.service_order_chart_id = service_order_chart_id;
    }

    
    public get service_order_item_id(): string {
        return this.props.service_order_item_id;
    }

    public set service_order_item_id(service_order_item_id: string) {
        this.props.service_order_item_id = service_order_item_id;
    }
}
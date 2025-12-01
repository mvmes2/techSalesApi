import { Product } from "@app/entities/product/product";
import { ProductDataToUpdateProps, Productrepository } from "@app/repositories/product/product-repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { PrismaProductMapper } from "../../mappers/product/prisma-product-mapper";
import { spTimeZoneDate } from "@helpers/dateSpTimezone";

@Injectable()
export class PrismaProductRepository implements Productrepository {
    constructor(private readonly prismaService: PrismaService) {}
    async create(product: Product): Promise<void> {
			const rawProduct = PrismaProductMapper.toPrisma(product);
       await this.prismaService.product.create({ data: rawProduct });
			 return;
    }
    async update(productId: string, companyId: string, dataToUpdate: ProductDataToUpdateProps): Promise<void> {
        try {
            dataToUpdate.updated_at = spTimeZoneDate(new Date());
            await this.prismaService.product.update({ where: { id: productId, company_id: companyId }, data: dataToUpdate });
            return
        } catch (err: any) {
            console.log('err ', err)
            return err
        }
    }
    findById(productId: string, companyId: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    async findByNameAndBrand(productName: string, productBrand: string, companyId: string): Promise<any> {

        try {
        const product = await this.prismaService.product.findFirst({
            where: { company_id: companyId, product_name: productName.toLocaleLowerCase(), product_brand: productBrand ? productBrand.toLocaleLowerCase() : null }
        });

        if (!product) {
            return null;
        }
            return product;
        } catch (err: any) {
            console.log('error Prisma..: ', err)
            return err
        }
    }
    findBySearchNumber(productSearchNumber: number, companyId: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    findBySerialNumber(productSerialNumber: number, companyId: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    findByCodeBar(productCodeBarId: string, companyId: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    
}
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@external/database/database.module';
import { CreateProduct } from './create-product';
import { ProductService } from './product-service';



@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    ProductService,
    CreateProduct
  ],
  exports: [
    ProductService,
    CreateProduct
  ]
  
})
export class ProductModule {}

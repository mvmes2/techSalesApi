import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { DatabaseModule } from '@external/database/database.module';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthModule } from '@app/auth/auth.module';
import { UserModule } from '@app/use-cases/user/user.module';
import { CompanyModule } from '@app/use-cases/company/company.module';
import { CompanyController } from './controllers/company/company.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { CustomerModule } from '@app/use-cases/customer/customer.module';
import { MailerModule } from '@external/mailer/mailer.module';
import { ProductModule } from '@app/use-cases/product/product-module';
import { ProductController } from './controllers/product/product.controller';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, CompanyModule, CustomerModule, ProductModule, MailerModule],
  controllers: [UserController, AuthController, CompanyController, CustomerController, ProductController],
  providers: []
  
})
export class HttpModule {}

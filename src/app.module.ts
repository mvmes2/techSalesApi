import { Module } from '@nestjs/common';
import { HttpModule } from '@external/http/http.module';
import { DatabaseModule } from '@external/database/database.module';
import { UserModule } from '@app/use-cases/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { CompanyModule } from '@app/use-cases/company/company.module';
import { CustomerModule } from '@app/use-cases/customer/customer.module';
import { SessionModule } from '@app/use-cases/session/session.module';
import { MailerModule } from '@external/mailer/mailer.module';
import { ProductModule } from '@app/use-cases/product/product-module';


@Module({
  imports: [HttpModule, DatabaseModule, UserModule, CompanyModule, CustomerModule, SessionModule, ProductModule, MailerModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    MailerModule
],
  controllers: []
})
export class AppModule {}

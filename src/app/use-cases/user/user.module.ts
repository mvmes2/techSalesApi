import { Module } from '@nestjs/common';
import { CreateUser } from '@app/use-cases/user/create-user';
import { DatabaseModule } from '@external/database/database.module';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { GetUserByEmail } from './get-user-by-email';
import { UpdateUser } from './update-user';
import { GetUserById } from './get-user-by-id';
import { CheckUserPassRecoverToken } from './check-user-pass-recover-token';
import { RecoverPasswordService } from './recoverUserPassword';
import { MailerModule } from '@external/mailer/mailer.module';

@Module({
  imports: [DatabaseModule, MailerModule],
  controllers: [],
  providers: [
    CreateUser,
    GetUserByEmail,
    UpdateUser,
    GetUserById,
    CheckUserPassRecoverToken,
    RecoverPasswordService,
    UserService,
    JwtService
  ],
  exports: [
    CreateUser,
    UpdateUser,
    GetUserById,
    UserService,
    GetUserByEmail,
    CheckUserPassRecoverToken,
    RecoverPasswordService,
    JwtService
  ]
  
})
export class UserModule {}

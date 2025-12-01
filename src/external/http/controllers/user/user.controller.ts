import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Request } from '@nestjs/common';
import { CreateUserBody } from '@external/http/dtos/user/create-user-body';
import { UserViewModel } from '@external/http/view-models/user/user-created-view-model';
import { UserEmailAlreadyInUse } from '@app/use-cases/user/errors/user-email-already-in-use-error';
import { UpdateUserBody } from '@external/http/dtos/user/update-user-body';
import { UserNotFound } from '@app/use-cases/user/errors/user-not-found-error';
import { UserAlreadyDeleted } from '@app/use-cases/user/errors/user-already-deleted-error';
import { UserService } from '@app/use-cases/user/user.service';
import { IsPublic } from '@app/auth/decorators/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@app/entities/user/user';
import { JwtService } from '@nestjs/jwt';
import { RecoverPasswordDTO } from '@external/http/dtos/user/recover-password-body';
import { MailerService } from '@external/mailer/mailer.service';
import { generateNewJwtShadowed } from '@helpers/generateJwtShadowed';
import { UpdateUserPasswordAccessTokenBody } from '@external/http/dtos/user/update-password-acess-tokenDTO';
import { removeRandomCharsFromToken } from '@helpers/overshadowedToken';

interface GetUserByIdWithTokenRequest {
  user: User
}
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService, private jwt: JwtService, private mailerService: MailerService) {}
  @IsPublic()
  @Post()
  async create(@Body() body: CreateUserBody) {

    const { name, email, password, company_id, user_cpf, user_level } = body;
    try {
      const { user } = await this.userService.create({
        name,
        email,
        password,
        company_id,
        user_cpf,
        user_level
      });
  
      return { message: 'Usuário criado com sucesso!' }
    } catch (error) {
      console.log('Erro:', error);
      console.log('Tipo do erro:', error.constructor.name);
      if (error instanceof UserEmailAlreadyInUse) {
        
        throw new HttpException('Este email de usuário já está em uso.', HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  };

@IsPublic()
@Post('/recover-password')
async RecoverPassword(@Body() body: RecoverPasswordDTO) {
  const { email } = body;

  try {
    await this.userService.recoverUserPassword({ email });
    return { message: 'Password recovery email sent successfully.' };
  } catch (error) {
    if (error instanceof UserNotFound) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    throw error;
  }
}

  @Patch(':id')
  async UpdateUser(@Param('id') id: string, @Body() body: UpdateUserBody) {
    if (!body || Object.keys(body).length === 0) {
      throw new HttpException('At least one of the fields (email, name, cpf or password) must be provided.', HttpStatus.BAD_REQUEST);
    }
    try {
      const { name, email, password, cpf } = body;
      const userToUpdate = {
        user_id: id,
        update: {
          name,
          email,
          password,
          cpf
        }
      }
      await this.userService.userUpdate(userToUpdate);
      return;
    } catch (error) {
      if (error instanceof UserNotFound) {
        throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  };
  @IsPublic()
  @Patch('/public/:id')
  async PublicUpdateUserPasswordOnly(@Param('id') id: string, @Body() body: UpdateUserPasswordAccessTokenBody) {
    if (!body || Object.keys(body).length === 0) {
      throw new HttpException('Field "password" must be provided.', HttpStatus.BAD_REQUEST);
    }
    try {
      const { password, token } = body;
      const userToUpdate = {
        user_id: id,
        token,
        update: {
          password
        }
      }
      const canProceed = await this.userService.userCheckRecoverPassToken({ user_id: id, token: token });
      if (canProceed) {      
        return await this.userService.userUpdate(userToUpdate);
      } else {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      if (error instanceof UserNotFound) {
        throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  };

//   @Get('')
//   async get(@Request() req: any) {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = this.jwt.decode(token).sub
//     const id = decodedToken
//     try {
//     const { user } =  await this.userService.getById({ id });
//     return { user: UserViewModel.toHTTP(user) }
//     } catch (error) {
//       if (error instanceof UserNotFound) {
//         throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
//       } else {
//         throw error;
//       }
//     }
//   };
//   @Delete(':id')
//   async delete(@Param('id') id: string) {
//     try {
//       await this.userService.deleteById({ id });
//     } catch (error) {
//       if (error instanceof UserNotFound) {
//         throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
//       } else if (error instanceof UserAlreadyDeleted) {
//         throw new HttpException('This user has already been deleted.', HttpStatus.BAD_REQUEST);
//       } else {
//         throw error;
//       }
//     }
//   }
}

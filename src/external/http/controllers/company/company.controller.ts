import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { IsPublic } from '@app/auth/decorators/is-public.decorator';
import { CompanyService } from '@app/use-cases/company/company.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCompanyAndUserBody, CreateCompanyBody } from '@external/http/dtos/company/create-company-body';
import { CompanyAlreadyExists } from '@app/use-cases/company/errors/company-cnpj-already-exists-error';
import { UserService } from '@app/use-cases/user/user.service';
import { UserEmailAlreadyInUse } from '@app/use-cases/user/errors/user-email-already-in-use-error';
import { LocalAuthGuard } from '@app/auth/guards/local-auth.guard';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { CompanyOrUserNotExists } from '@app/use-cases/company/errors/company-user-not-exists-error';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService, private userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateCompanyBody) {
    const { company_name, cnpj, owner_name, owner_email } = body;

    try {
      const { company } = await this.companyService.create({
        cnpj,
        company_name,
        owner_name,
        owner_email
      });

      return { message: 'Empresa criada com sucesso!' }
    } catch (error) {
      if (error instanceof CompanyAlreadyExists) {
        throw new HttpException('Esse cnpj de empresa já está em uso.', HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  };
  @IsPublic()
  @Post('company-user')
  async createCompanyAndUser(@Body() body: CreateCompanyAndUserBody) {
    
    
    try {

      await this.companyService.createCompanyAndUserService(body);

      return { message: 'Empresa e usuario mestre criados com sucesso!' }
    } catch (error) {
      console.log('qual o erro? ', error)
      if (error instanceof CompanyAlreadyExists) {
        throw new HttpException('Esse cnpj de empresa já está em uso.', HttpStatus.BAD_REQUEST);
      } if (error instanceof UserEmailAlreadyInUse) {
        throw new HttpException('Este email de usuário já está em uso.', HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  };

  @Get('company-user')
  async getCompanyAndUser(@Request() req: any) {

    try {

      const newReq = {
        companyId: req.user.company_id,
        userId: req.user.id
      }
      const response = await this.companyService.getCompanyAndUserInfoService(newReq);
      return response;
      
    } catch (error) {
      console.log('qual o erro? ', error)
      if (error instanceof CompanyOrUserNotExists) {
        throw new HttpException(new CompanyOrUserNotExists().message, HttpStatus.UNAUTHORIZED)
      } else {
        throw new HttpException('Internal server error.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  };

//   @Patch(':id')
//   async update(@Param('id') id: string, @Body() body: UpdateUserBody) {
//     if (!body || Object.keys(body).length === 0) {
//       throw new HttpException('At least one of the fields (email, name, or password) must be provided.', HttpStatus.BAD_REQUEST);
//     }
//     try {
//       const { name, email, password } = body;
//       await this.userService.update({
//         id,
//         name,
//         email,
//         password
//       }); 
//       return;
//     } catch (error) {
//       if (error instanceof UserNotFound) {
//         throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
//       } else {
//         throw error;
//       }
//     }
//   };

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

import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyAlreadyExists } from '@app/use-cases/company/errors/company-cnpj-already-exists-error';
import { UserEmailAlreadyInUse } from '@app/use-cases/user/errors/user-email-already-in-use-error';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { CompanyOrUserNotExists } from '@app/use-cases/company/errors/company-user-not-exists-error';
import { CustomerService } from '@app/use-cases/customer/service/customer.service';
import { spTimeZoneDate } from '@helpers/dateSpTimezone';
import { CreateCustomerBody } from '@external/http/dtos/customer/create-customer-body';
import { CustomerAlreadyExists } from '@app/use-cases/customer/errors/customer-already-exists-error';
import { CustomerCpfAlreadyExists } from '@app/use-cases/customer/errors/customer-cpf-already-exists-error';
import { CustomerNotFoundWithID } from '@app/use-cases/customer/errors/customer-nnot-found-byId-error';
import { CustomeremailAlreadyInUse } from '@app/use-cases/customer/errors/customerEmailAlreadyInUser-error';

@ApiTags('customer')
@Controller()
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  @UseGuards(JwtAuthGuard)
  @Post('customer')
  async create(@Body() body: CreateCustomerBody, @Request() req: any) {

    console.log('qual user vem? ', req.user)
    try {
      await this.customerService.create({...body, company_id: req.user.company_id });
      return { message: 'Cliente criado com sucesso!' }
    } catch (error) {
      if (error instanceof CustomerAlreadyExists) {
        throw new HttpException(new CustomerAlreadyExists().message, HttpStatus.BAD_REQUEST);
      } else if (error instanceof CustomerCpfAlreadyExists) {
        throw new HttpException(new CustomerCpfAlreadyExists().message, HttpStatus.BAD_REQUEST);
      } else {
        throw error;
      }
    }
  };
  @UseGuards(JwtAuthGuard)
  @Get('customers')
  async getAllCustomers(@Request() req: any) {

    try {
      const newReq = {
        company_id: req.user.company_id,
      }
      const response = await this.customerService.getAll(newReq);
      return response;
      
    } catch (error) {
      console.log('qual o erro? ', error)
        throw new HttpException('Internal server error.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  @UseGuards(JwtAuthGuard)
  @Get('customer/:id')
  async getCustomerById(@Param('id') id: string) {
    try {
      const newReq = {
        id
      }
      const response = await this.customerService.getById(newReq);
      return response;
      
    } catch (error) {
      console.log('qual o erro? ', error)
        throw new HttpException('Internal server error.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };
  @UseGuards(JwtAuthGuard)
  @Patch('customer')
  async update(@Request() req: any, @Body() body: any) {
    const { id, field, data } = body;
    const newReq = {
      id,
      field,
      data,
      company_id: req.user.company_id
    }

    try {

      await this.customerService.updateByField(newReq);
      
    } catch (error) {
      console.log('qual o erro? ', error)
      if (error instanceof CustomerNotFoundWithID) {
        throw new HttpException(new CustomerNotFoundWithID().message, HttpStatus.BAD_REQUEST);
      } else if (error instanceof CustomerCpfAlreadyExists) {
        throw new HttpException(new CustomerCpfAlreadyExists().message, HttpStatus.BAD_REQUEST);
      } else if (error instanceof CustomeremailAlreadyInUse) {
        throw new HttpException(new CustomeremailAlreadyInUse().message, HttpStatus.BAD_REQUEST);
      }
        throw new HttpException('Internal server error.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };
}
import { Controller, Get, HttpException, HttpStatus, Param, Query, Req, Res, UseGuards } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiTags('Paypal')
@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) { }

  @Get('create/:id')
  @UseGuards(AuthGuard)
  async getByEmailTotal(@Param('id') id: number, @Query('precio') precio: number, @Query('email') email: string) {
    return await this.paypalService.createPayment(id, precio, email);
  }

  @Get('capture')
  async capturePayment(@Query('token') token: string, @Query('id') id: number, @Query('email') email: string, @Res() res) {
    try {
      await this.paypalService.capturePayment(token, id, email);
      return res.redirect('https://timely12.netlify.app/timely-servicios-cliente');
    } catch (error) {
      console.error(error.message);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}


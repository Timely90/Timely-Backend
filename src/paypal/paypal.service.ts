import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from "axios";
import { Paypal } from './entities/paypal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiciosService } from 'src/servicios/servicios.service';
import { ReservadosService } from 'src/reservados/reservados.service';

@Injectable()
export class PaypalService {

  constructor(
    @InjectRepository(Paypal)
    private readonly paypalRepository: Repository<Paypal>,
    private servicioService: ServiciosService,
    private reservadoService: ReservadosService
  ) { }

  async createPayment(id: number, precio: number, email: string) {

    const exchangeRateUrl = 'https://v6.exchangerate-api.com/v6/88f8216501af6facfeb24881/latest/USD';
    const response = await axios.get(exchangeRateUrl);

    const totalValueInUSD = precio / response.data.conversion_rates.DOP;

    try {
      const order = {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: totalValueInUSD.toFixed(2),
            },
          },
        ],
        application_context: {
          brand_name: 'timely12.netlify.app',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `https://timely-backend-rouge.vercel.app/paypal/capture?id=${id}&email=${email}`,
          cancel_url: `https://timely12.netlify.app/timely-servicios-cliente`,
        },
      };

      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');

      const {
        data: { access_token },
      } = await axios.post(
        'https://api-m.sandbox.paypal.com/v1/oauth2/token',
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: "AVZKIAf1X8UY3xyEaJ6C-IsgV95tOTyXaBAVapFX4LiH1WZ5LHp9Se7fj1CWbcy_UhbT6vED-imyMxFG",
            password: "EBwo70iAPzBCF2EPyrQ4To5ED8bsNCieVey18fNBR7kHVXdlMNoK4XyR35t5kidgarQwJTpn28r_D8a7",
          },
        },
      );

      const response = await axios.post(
        `https://api-m.sandbox.paypal.com/v2/checkout/orders`,
        order,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      const data = response.data;
      const primerEnlace = data.links[1];
      return { primerEnlace }

    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong');
    }
  }

  async capturePayment(token: string, id: number, email: string): Promise<any> {

    try {
      const response = await axios.post(
        `https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`,
        {},
        {
          auth: {
            username: "AVZKIAf1X8UY3xyEaJ6C-IsgV95tOTyXaBAVapFX4LiH1WZ5LHp9Se7fj1CWbcy_UhbT6vED-imyMxFG",
            password: "EBwo70iAPzBCF2EPyrQ4To5ED8bsNCieVey18fNBR7kHVXdlMNoK4XyR35t5kidgarQwJTpn28r_D8a7",
          },
        }
      );
      const servicios = await this.servicioService.getServicioId(id);

      const datos = {
        nombre: servicios.nombre,
        salon: servicios.salon,
        descripcion: servicios.descripcion,
        horario: servicios.horario,
        precio: servicios.precio,
        email: email
      };

      await this.reservadoService.createReservados(datos);
    } catch (error) {
      throw new Error('Error capturing payment');
    }
  }

}



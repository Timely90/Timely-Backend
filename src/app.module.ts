import { Module } from '@nestjs/common';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ArchivesModule } from './archives/archives.module';
import { SalonModule } from './salon/salon.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ServiciosModule } from './servicios/servicios.module';
import { PaypalModule } from './paypal/paypal.module';
import { ReservadosModule } from './reservados/reservados.module';
require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.host,
      username: process.env.usernameDta,
      password: process.env.password,
      database: process.env.database,
      entities: [join(__dirname + '/**/*.entity{.ts,.js}')],
      synchronize: false,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UsersModule,
    AuthModule,
    ArchivesModule,
    SalonModule,
    CloudinaryModule,
    ServiciosModule,
    PaypalModule,
    ReservadosModule,
  ],
})
export class AppModule {}

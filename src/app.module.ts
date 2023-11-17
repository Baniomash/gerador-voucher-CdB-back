import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherModule } from './voucher/voucher.module';
import { ImportVouchersService } from './voucher/importVouchers.service';
import { ImportVouchersController } from './voucher/importVouchers.controller';
import { Voucher } from './voucher/entities/voucher.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Voucher]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
    }),
    VoucherModule,
    
  ],
  controllers: [AppController, ImportVouchersController],
  providers: [AppService, ImportVouchersService],
})
export class AppModule implements OnModuleInit{
  constructor(private readonly importVouchersService: ImportVouchersService){}

  async onModuleInit(): Promise<void> {
    const filePath = process.env.CSV_PATH;
    await this.importVouchersService.importCsvToDatabase(filePath);
  }
}

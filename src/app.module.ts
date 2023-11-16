import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherModule } from './voucher/voucher.module';
import { ImportVouchersService } from './voucher/importVouchers.service';
import { ImportVouchersController } from './voucher/importVouchers.controller';
import { Voucher } from './voucher/entities/voucher.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Voucher]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'abc@123',
      username: 'postgres',
      entities: ["dist/**/*.entity{.ts,.js}"],
      database: 'airdropV3DB',
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
    const filePath = './data.csv';
    await this.importVouchersService.importCsvToDatabase(filePath);
  }
}

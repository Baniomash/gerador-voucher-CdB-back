import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Voucher } from "./entities/voucher.entity";
import { Repository } from "typeorm";
import { VoucherDto } from "./dto/voucher.dto";
import * as csvParser from 'csv-parser';
import * as fs from 'fs';


@Injectable()
export class ImportVouchersService {

  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
  ) { }

  async importCsvToDatabase(filePath: string): Promise<string> {
    const existingVouchers = await this.voucherRepository.find();
    if (existingVouchers.length > 0) {
      return 'Data allredy imported';
    }
    const stream = fs.createReadStream(filePath).pipe(csvParser());
    const vouchers: VoucherDto[] = []
    for await (const row of stream) {
      const { CODIGO } = row;
      const voucher: VoucherDto = { voucherCode: CODIGO };
      vouchers.push(voucher);
    }
    await this.voucherRepository.save(vouchers);
  }
}
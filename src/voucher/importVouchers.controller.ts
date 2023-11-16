import { Controller, Post } from "@nestjs/common";
import { ImportVouchersService } from "./importVouchers.service";

@Controller('csv')
export class ImportVouchersController {
  constructor(private readonly importVouchersService: ImportVouchersService) { }

  @Post('import')
  async importCsv(): Promise<string> {
    const filePath = '../data.csv';
    return await this.importVouchersService.importCsvToDatabase(filePath);
  }
}
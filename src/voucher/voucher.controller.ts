import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}
  
  @Post()
  getVoucher(@Body() createVoucherDto: CreateVoucherDto) {
    return this.voucherService.addingCpfToVoucher(createVoucherDto);
  }

  @Get()
  findAll() {
    return this.voucherService.findAll();
  }
}

import { Injectable } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Voucher } from './entities/voucher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VoucherService {

  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
  ) { }

  async findAll(): Promise<Voucher[]> {
    return await this.voucherRepository.find();
  }
  
  async getFreeVoucher(): Promise<Voucher>{
    const voucher = await this.voucherRepository
    .createQueryBuilder('voucher')
    .where('voucher.clientCpf IS NULL')
    .orderBy('RANDOM()')
    .limit(1)
    .getOne();

    return voucher || null;
  }

  async addingCpfToVoucher(createVoucherDto: CreateVoucherDto): Promise<string>{
    var voucher = await this.verifyCpf(createVoucherDto.clientCpf);
    if(voucher == null){
      voucher = await this.getFreeVoucher();
      if(voucher != null){
        voucher.clientCpf = createVoucherDto.clientCpf;
        await this.voucherRepository.update(voucher.id, voucher);
        return voucher.voucherCode;
      } else {
        return 'Ocorreu um erro'
      }
    } else {
      return voucher.voucherCode;
    }
  }

  async verifyCpf(clientCpf: string): Promise<Voucher> {
    const voucher = await this.voucherRepository.findOneBy({clientCpf: clientCpf})
    if (voucher != null){
      return voucher;
    } else {
      return;
    }
  }
}

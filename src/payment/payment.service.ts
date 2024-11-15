import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>) { }
  async create(createPaymentDto: CreatePaymentDto) {
    const res = await this.paymentRepository.save(createPaymentDto);
    return res;
  }

  findAll() {
    const payments = this.paymentRepository.find();
    return payments;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const existingPayment = await this.paymentRepository.findOne({
      where: { id },
    })
    if (existingPayment !== null) {
      const existingPayment = this.paymentRepository.update(id, updatePaymentDto);
      return existingPayment;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}

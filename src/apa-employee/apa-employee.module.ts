import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApaEmployeeEntity } from '../../db/entities/APA_EMPLEADO';
import { ApaEmployeeService } from './apa-employee.service';
import { ApaEmployeeController } from './apa-employee.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ApaEmployeeEntity])],
  providers: [ApaEmployeeService],
  controllers: [ApaEmployeeController],
})
export class ApaEmployeeModule {}

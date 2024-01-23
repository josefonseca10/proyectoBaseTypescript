import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApaEmployeeService } from './apa-employee.service';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ApaEmployeeEntity } from '../../db/entities/APA_EMPLEADO';
import { TransformResponseInterceptor } from '../../utils/transform.interceptor';
import { PaginatedResult } from '../../utils/PaginationMetaDto';
import { JoiValidationPipe } from '../../utils/JoiValidationPipe';
import { findAllSchema } from './validators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('apa-employee')
export class ApaEmployeeController {
  constructor(private apaEmployeeService: ApaEmployeeService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformResponseInterceptor)
  @UsePipes(new JoiValidationPipe(findAllSchema))
  findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<PaginatedResult<ApaEmployeeEntity>> {
    try {
      return this.apaEmployeeService.findAll(query);
    } catch (reason) {
      if (reason instanceof BadRequestException) {
        console.error('Error de validación:', reason.getResponse());
        throw reason;
      }
      console.error('Error inesperado:', reason);
      throw new InternalServerErrorException(
        'Ocurrió un error en el servidor.',
      );
    }
  }
}

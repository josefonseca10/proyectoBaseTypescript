import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private objectSchema: ObjectSchema) {}

  transform(value: any): object {
    const { error: bodyError } = this.objectSchema.validate(value);
    if (bodyError) {
      const errorMessage = bodyError.details
        .map((detail) => detail.message.replace(/"/g, ''))
        .join(', ');
      throw new BadRequestException(`Validation failed: ${errorMessage}`);
    }
    return value;
  }
}

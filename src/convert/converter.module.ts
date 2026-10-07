import { Module } from '@nestjs/common';
import { ConvertController } from './converter.controller.js';
import { ConverterService } from './converter.service.js';

@Module({
  controllers: [ConvertController],
  providers: [ConverterService],
})
export class ConvertModule {}
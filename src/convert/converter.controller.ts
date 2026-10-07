import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConverterService } from './converter.service.js';
import type { Response as ExpressResponse} from 'express';
@Controller('convert')
export class ConvertController {
  constructor(private readonly converterService: ConverterService){}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  convert(@UploadedFile() file: Express.Multer.File,@Res() res: ExpressResponse) {
   return this.converterService.ConvertFile(file,res);
    
  }
}
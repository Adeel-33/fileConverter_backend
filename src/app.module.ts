import { Module } from '@nestjs/common';
import { ConvertModule } from './convert/converter.module.js';

@Module({
  imports: [ConvertModule],
})
export class AppModule {}
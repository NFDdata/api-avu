import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Validate } from './schema/validate.schema';
import { ConfigModule } from '@nestjs/config';
import { ValidateService } from './validate.service';

@Module({
  imports: [
    // import MongoDB with typegoose
    TypegooseModule.forFeature([
      { typegooseClass: Validate, schemaOptions: { timestamps: true } }
    ]),
    ConfigModule // config module according to nestjs
  ],
  controllers: [],
  providers: [ValidateService],
  exports: [ValidateService]
})
export class ValidateModule {}

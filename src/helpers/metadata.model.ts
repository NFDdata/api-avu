import { prop } from '@typegoose/typegoose';

export class MongoProps {
  @prop({ nulleable: true })
  createdAt?: Date;

  @prop({ nulleable: true })
  updetedAt?: Date;
}

export class ApiResponse<T extends object> {
  status: number;
  message: string;
  data?: T;
  error?: any;
}

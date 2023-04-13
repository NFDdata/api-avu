import { prop } from '@typegoose/typegoose';

export class MongoProps {
  @prop({ nulleable: true })
  createdAt?: Date;

  @prop({ nulleable: true })
  updetedAt?: Date;
}

import { Index, prop } from '@typegoose/typegoose';

import { MongoProps } from '../../helpers/metadata.model';

@Index({ documentNumber: 1 }, { unique: true })
export class User extends MongoProps {
  @prop({ required: true, unique: true })
  name: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true, select: false })
  password: string;
}

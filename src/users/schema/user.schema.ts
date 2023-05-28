import { Index, prop } from '@typegoose/typegoose';

import { MongoProps } from '../../helpers/metadata.model';

export enum DOCUMENT_TYPE {
  RUT = 'rut',
  PASSPORT = 'passport'
}

@Index({ documentNumber: 1 }, { unique: true })
export class User extends MongoProps {
  @prop({ _id: true })
  _id: string;

  @prop({ required: true, unique: true })
  name: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ unique: true })
  documentNumber: string;

  @prop({ required: true, type: () => String, enum: DOCUMENT_TYPE })
  documentType: DOCUMENT_TYPE;

  @prop({ required: true })
  password: string;
}

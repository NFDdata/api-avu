import { Index, mongoose, prop } from '@typegoose/typegoose';

import { MongoProps } from '../../helpers/metadata.model';
import { DOCUMENT_TYPE } from '../../constants';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  PENDING_VALIDATE = 'PENDING_VALIDATE'
}

@Index({ documentNumber: 1 }, { unique: true })
export class User extends MongoProps {
  _id!: mongoose.Types.ObjectId;

  @prop({ required: true })
  name: string;

  @prop()
  secondName: string;

  @prop({ required: true })
  lastName: string;

  @prop()
  secondLastName: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true, unique: true })
  documentNumber: string;

  @prop({ required: true, type: String, enum: DOCUMENT_TYPE })
  documentType: DOCUMENT_TYPE;

  @prop({ required: true })
  password: string;

  @prop()
  state: string;

  @prop()
  city: string;

  @prop()
  postalCode: string;

  @prop()
  country: string;

  @prop()
  phone: string;

  @prop({
    type: String,
    enum: UserStatus,
    default: UserStatus.PENDING_VALIDATE
  })
  status: UserStatus;

  @prop({ required: false, default: undefined })
  activateAccountToken?: string;
}

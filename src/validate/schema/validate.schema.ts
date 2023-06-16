import { Index, mongoose, prop } from '@typegoose/typegoose';
import { MongoProps } from '../../helpers/metadata.model';
import { User } from '../../users/schema/user.schema';

@Index({ documentNumber: 1 }, { unique: true })
export class Validate extends MongoProps {
  _id!: mongoose.Types.ObjectId;

  @prop({ required: true })
  name: string;

  @prop({ default: false })
  isValidate: boolean;

  @prop({ unique: true, ref: 'User', type: () => User })
  user: User;
}

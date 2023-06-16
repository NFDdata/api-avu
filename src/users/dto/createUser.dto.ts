import { DOCUMENT_TYPE } from '../../constants';

export class CreateUserDto {
  name: string;
  secondName?: string;
  email: string;
  documentNumber: string;
  activateAccountToken?: string;
  documentType: DOCUMENT_TYPE;
  password: string;
  state?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
}

export class UpdateUserInput {
  name: string;
  secondName?: string;
  email?: string;
  documentNumber?: string;
  documentType?: DOCUMENT_TYPE;
  password?: string;
  state?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
}

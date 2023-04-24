import { MongoProps } from '../../helpers/metadata.model';
export declare class User extends MongoProps {
    _id: string;
    name: string;
    email: string;
    documentNumber: string;
    documentType: string;
    password: string;
}

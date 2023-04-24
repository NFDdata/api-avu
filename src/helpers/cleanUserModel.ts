import { assoc, omit, pipe, prop } from 'ramda';
import { User } from '../users/schema/user.schema';

const omitValues = omit(['_id', '__v', 'password', 'activateAccountToken']);

const renameToId = (user: User): User => {
  const id = prop('_id', user);

  return assoc('id', id, user);
};

export const cleanUserModel: (user: User) => User = pipe(
  JSON.stringify,
  JSON.parse,
  renameToId,
  omitValues
);

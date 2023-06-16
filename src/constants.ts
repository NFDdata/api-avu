export enum UserLoginStatus {
  USER_NOT_FOUND = 'UserNotFound',
  USER_BLOCKED = 'UserBlocked',
  USER_ONE_TRY = 'OneTry',
  WRONG_CREDENTIALS = 'WrongCredentials',
  USER_BLOCKED_FIRST = 'UserBlockedFirst',
  PENDING_CONFIRMATION = 'PendingConfirmation'
}

export enum DOCUMENT_TYPE {
  RUT = 'rut',
  PASSPORT = 'passport'
}

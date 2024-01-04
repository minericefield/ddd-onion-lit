export class NotFoundApplicationException extends Error {}

/**
 * It might be better to relocate AuthenticationFailedApplicationException to 'login.usecase' due to its direct association with that module.
 */
export class AuthenticationFailedApplicationException extends Error {}

export class UnexpectedApplicationException extends Error {}

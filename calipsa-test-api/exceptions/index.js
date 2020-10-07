'use strict';

const BaseError = require('./base-error');
const AuthenticationError = require('./authentication-error');
const AuthorizationError = require('./authorization-error');
const MalformedInputError = require('./malformed-input-error');
const ConnectionRefusedError = require('./connection-refused-error');
const InternalServerError = require('./internal-server-error');
const UserNotExistError = require('./user-not-exist-error');
const UserAlreadyExistsError = require('./user-already-exists-error');
const NetworkRequestError = require('./network-request-error');
const ServerError = require('./server-error');
const ServiceUnavailableError = require('./service-unavailable-error');
const ResourceNotFoundError = require('./resource-not-found-error');
const ResourceAlreadyExistsError = require('./resource-already-exists-error');
const ResourceCreationFailedError = require('./resource-creation-failed-error');
const ResourceDeletionFailedError = require('./resource-deletion-failed-error');
const ResourceReadFailedError = require('./resource-read-failed-error');
const ResourceUpdateFailedError = require('./resource-update-failed-error');
const IncompleteSetupError = require('./incomplete-setup-error');
const GameSessionError = require('./game-session-error');


module.exports = {
    BaseError,
    MalformedInputError,
    ConnectionRefusedError,
    InternalServerError,
    UserAlreadyExistsError,
    UserNotExistError,
    NetworkRequestError,
    ServerError,
    ServiceUnavailableError,
    ResourceNotFoundError,
    ResourceAlreadyExistsError,
    ResourceCreationFailedError,
    ResourceDeletionFailedError,
    ResourceReadFailedError,
    ResourceUpdateFailedError,
    IncompleteSetupError,
    AuthenticationError,
    AuthorizationError,
    GameSessionError,
};

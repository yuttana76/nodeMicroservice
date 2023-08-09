import express  from "express";
// import VerifyUserMiddleware from '../authorization/middlewares/verify.user.middleware';
import {login} from '../authorization/controllers/authorization.controller.js';
// import AuthValidationMiddleware from '../common/middlewares/auth.validation.middleware';

const router = express.Router();

router.post('/auth', [
    // VerifyUserMiddleware.hasAuthValidFields,
    // VerifyUserMiddleware.isPasswordAndUserMatch,
    login
]);

// router.post('/auth/refresh', [
//     AuthValidationMiddleware.validJWTNeeded,
//     AuthValidationMiddleware.verifyRefreshBodyField,
//     AuthValidationMiddleware.validRefreshNeeded,
//     AuthorizationController.login
// ]);

export default router;
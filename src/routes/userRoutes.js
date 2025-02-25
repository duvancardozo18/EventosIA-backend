import { Router } from 'express';
import { getUsers, createUser, verifyEmail, loginUser } from '../controllers/userController.js';
import { requestPasswordReset, resetPassword } from '../controllers/newPasswordController.js';
import { deleteUser } from '../controllers/deleteUserController.js';


const router = Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/verify-email/:token', verifyEmail);
router.post('/login', loginUser);

//diego:
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);
router.delete('/users/:id_user', deleteUser);


export default router;

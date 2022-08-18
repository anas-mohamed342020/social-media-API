const { auth } = require('../../middlewear/auth');
const { handelValidation } = require('../../middlewear/handleValidation');
const { addAdmin } = require('./admin/addAdmin');
const { deletedAdmin } = require('./admin/delete');
const { getAdmins } = require('./admin/getAdminlist');
const { endPoints } = require('./endPoints');
const { report, block } = require('./userController/block&reportUser');
const { deactivateAccount } = require('./userController/deactivate');
const { forgetPasswordSend, changeForgetPass } = require('./userController/forgetPassword');
const { searchUser } = require('./userController/searchUser');

const { signIn } = require('./userController/signIn');
const { signUp, confirm } = require('./userController/signUp');
const { updatePassword } = require('./userController/updatePassword');
const { updateUser } = require('./userController/updateUser');
const { signUpSchema, signInSchema, updateScheme, token, reportv, updatePassScheme, noData, changePassword, sendACode, search } = require('./validation');

const router = require('express').Router();



router.post('/user/signup', handelValidation(signUpSchema), signUp)
router.post('/user/signin', handelValidation(signInSchema), signIn)
router.patch('/user/update', auth(endPoints.all), handelValidation(updateScheme), updateUser)
router.patch('/user/updatepassword', auth(endPoints.all), handelValidation(updatePassScheme), updatePassword)
router.post('/user/sendvcode',handelValidation(sendACode),forgetPasswordSend)
router.patch('/user/changeforget',handelValidation(changePassword),changeForgetPass)
router.patch('/user/report',auth(endPoints.all),handelValidation(reportv),report)
router.patch('/user/block',auth(endPoints.block),handelValidation(reportv),block)
router.patch('/user/deactivate', auth(endPoints.deactivate), handelValidation(noData), deactivateAccount)

router.post('/admin/add',auth(endPoints.addAdmin),handelValidation(signUpSchema),addAdmin)
router.patch('/admin/update', auth(endPoints.updateAdmin), handelValidation(updateScheme), updateUser)
router.patch('/admin/delete',auth(endPoints.addAdmin),handelValidation(reportv),deletedAdmin)
router.get('/admin/getalladmins',auth(endPoints.addAdmin),handelValidation(noData),getAdmins)

router.get('/user/search/:searchKey',auth(endPoints.all),handelValidation(search),searchUser)

router.get('/confirm/:token', handelValidation(token), confirm)

module.exports = router

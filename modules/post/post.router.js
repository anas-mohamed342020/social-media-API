const { auth } = require('../../middlewear/auth');
const { handelValidation } = require('../../middlewear/handleValidation');
const { endPoints } = require('./endPoints');
const { creatPost } = require('./postController/createPost');
const { deletePost } = require('./postController/deletePost');
const { getAllPosts } = require('./postController/getAllPosts');
const { getblockedPosts } = require('./postController/getBlockedPosts');
const { getUserPosts } = require('./postController/getUsrePost');
const { searchPost } = require('./postController/searchreport');
const { updatePost } = require('./postController/updatePost');
const { postValidation, updatePostValidation, idValidation, noData, search } = require('./validation');

const router = require('express').Router();

router.post("/post/create", auth(endPoints.all), handelValidation(postValidation), creatPost)

router.patch('/post/edit', auth(endPoints.all), handelValidation(updatePostValidation), updatePost)

router.delete('/post/delete', auth(endPoints.all), handelValidation(idValidation), deletePost)

router.get('/post/userposts', auth(endPoints.all), handelValidation(idValidation), getUserPosts)

router.get('/post/getallposts', auth(endPoints.getPosts), handelValidation(noData), getAllPosts)

router.get('/post/blocked',auth(endPoints.getPosts),handelValidation(noData),getblockedPosts)

router.get('/post/search/:searchKey',auth(endPoints.all),handelValidation(search),searchPost)

module.exports = router

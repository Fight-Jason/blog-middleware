import { Application } from 'egg';

export default (app: Application) => {
	const { controller, router, middleware } = app;
	const adminauth = middleware.adminauth()
	router.get('/default/getArticleList', controller.default.home.getArticleList)
	router.get('/default/getArticleById/:id', controller.default.home.getArticleById)
	router.get('/default/getTypeInfo', controller.default.home.getTypeInof)
	router.get('/default/getListById', controller.default.home.getListById)

	router.post('/admin/checkLogin', controller.admin.main.checkLogin)
	router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList)
	router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo)
	router.get('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById)
	router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle)
	router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle)
	router.post('/admin/delArticle/:id', adminauth, controller.admin.main.delArticle)

	router.get('/', controller.home.index);
};

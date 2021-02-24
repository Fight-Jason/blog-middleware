import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const adminauth = middleware.adminauth()
  router.get('/default/getArticleList', controller.default.home.getArticleList)
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById)
  router.get('/default/getTypeInfo', controller.default.home.getTypeInof)
  router.get('/default/getListById',controller.default.home.getListById)

  router.post('/admin/checkLogin',controller.admin.main.checkLogin)
  router.get('/admin/getTypeInfo',adminauth ,controller.admin.main.getTypeInfo)
  router.post('/admin/addArticle',adminauth,controller.admin.main.addArticle)

  router.get('/', controller.home.index);
};

import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.get('/default/getArticleList', controller.default.home.getArticleList)
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById)
  router.get('/default/getTypeInfo', controller.default.home.getTypeInof)
  router.get('/default/getListById',controller.default.home.getListById)
  router.get('/', controller.home.index);
};

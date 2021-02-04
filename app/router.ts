import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.get('/default/getArticleList', controller.default.home.getArticleList)
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById)
  router.get('/', controller.home.index);
};

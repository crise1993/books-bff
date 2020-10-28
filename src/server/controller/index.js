import Router from "koa-router";
import IndexController from "./indexController";
import ApiController from "./apiController";
import BookController from "./bookController";

const router = new Router();
const indexController = new IndexController();
const apiController = new ApiController();
const bookController = new BookController();

function initController(app) {
  router.get("/", indexController.actionIndex);
  router.get("/books/listSwig", bookController.actionListPage);
  router.get("/books/list", bookController.actionBookListPage);
  router.get("/books/detail", bookController.actionBookDetailPage);
  router.get("/books/add", bookController.actionBookAddPage);
  router.get("/api/bookList", apiController.actionBookList);
  router.get("/api/bookDetail", apiController.actionBookDetail);
  router.post("/api/bookAdd", apiController.actionBookAdd);
  router.post("/api/bookDelete", apiController.actionBookDelete);
  router.post("/api/bookUpdate", apiController.actionBookUpdate);

  app.use(router.routes()).use(router.allowedMethods());
}

export default initController;

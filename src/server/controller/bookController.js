import Controller from "./Controller";
import ApiController from "./apiController";
import BooksModel from '../models/BooksModel';

const booksModel = new BooksModel();
const apiController = new ApiController();

class BookController extends Controller {
  constructor() {
    super();
  }
  async actionListPage(ctx, next) {
    // throw new Error('xxxxx');
    const res = await booksModel.fetchBookList();
    console.log(res,'----res-----')
    ctx.body = await ctx.render("books/pages/listSwig", {
    // ctx.body = await ctx.render("books-swig/bookList", {
      bookList: res.data,
    });
  }
  async actionBookListPage(ctx, next) {
    // throw new Error('xxxxx');
    ctx.body = await ctx.render("books/pages/list");
  }
  async actionBookAddPage(ctx, next) {
    // throw new Error('xxxxx');
    ctx.body = await ctx.render("books/pages/add");
  }
  async actionBookDetailPage(ctx, next) {
    // throw new Error('xxxxx');
    ctx.body = await ctx.render("books/pages/detail");
  }
}

export default BookController;

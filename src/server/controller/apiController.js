import Controller from "./Controller";
import BooksModel from '../models/BooksModel';
const booksModel = new BooksModel();

class ApiController extends Controller {
  constructor() {
    super();
  }
  async actionBookList(ctx, next) {
    // throw new Error('xxxxx');
    ctx.body = await booksModel.fetchBookList();
  }
  async actionBookDetail(ctx, next) {
    ctx.body = await booksModel.fetchBookDetail(ctx.query.id);
  }
  async actionBookAdd(ctx, next) {
    ctx.body = await booksModel.addBook(ctx.request.body);
  }
  async actionBookDelete(ctx, next) {
    ctx.body = await booksModel.deleteBook(ctx.request.body);
  }
  async actionBookUpdate(ctx, next) {
    console.log(ctx.request.body,'---ctx.request.body----')
    ctx.body = await booksModel.updateBook(ctx.request.body);
  }
}

export default ApiController;

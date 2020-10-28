import Controller from "./Controller";

class IndexController extends Controller {
  constructor() {
    super();
  }
  async actionIndex(ctx, next) {
    // throw new Error('xxxxx');
    ctx.body = await ctx.render("index");
  };
}

export default IndexController;

import { Controller } from 'egg';

export default class HomeController extends Controller {

	public async getArticleList() {
		const { ctx } = this;
		ctx.body = await ctx.service.test.sayHi('egg');

		const SQL: String = `SELECT 
		article.id as id,
		article.title as title,
		article.introduce as introduce,
		article.addTime as addTime,
		article.view_count as view_count,
		.type.typeName as typeName
		FROM article LEFT JOIN type ON article.type_id = type.Id
		`
		const results = await this.app.mysql.query(SQL)
		ctx.body = {data: results}
	}

	public async getArticleById() {
		const { ctx } = this;
		let id = ctx.params.id;
		console.log(id)
		const SQL: String = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.article_content as article_content,'+
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName ,'+
        'type.id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE article.id='+ id
		const results = await this.app.mysql.query(SQL)
		ctx.body = {data: results}
	}





}

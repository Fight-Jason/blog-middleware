import { Controller } from 'egg';

export default class HomeController extends Controller {

	public async getArticleList() {
		const { ctx } = this;
		const SQL: String = `SELECT 
			article.id as id,
			article.title as title,
			article.introduce as introduce,
			FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,
			article.view_count as view_count,
			.type.typeName as typeName
			FROM article LEFT JOIN type ON article.type_id = type.Id
			ORDER BY article.id DESC
		`
		const results = await this.app.mysql.query(SQL)
		ctx.body = { data: results }
	}

	public async getArticleById() {
		const { ctx } = this;
		let id = ctx.params.id;
		const SQL: String = `SELECT
			article.id as id,
			article.title as title,
			article.introduce as introduce,
			article.article_content as article_content,
			FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,
			article.view_count as view_count,
			type.typeName as typeName,
			type.id as typeId
			FROM article LEFT JOIN type ON article.type_id = type.id
			WHERE article.id = ${id}
		`
		
		const results = await this.app.mysql.query(SQL)
		ctx.body = { data: results }
	}

	public async getTypeInof() {
		const { ctx } = this;
		const result = await this.app.mysql.select('type');
		ctx.body = { data: result }

	}

	public async getListById() {
		const { ctx } = this;
		let id = ctx.params.id;
		const SQL: String = `SELECT 
			article.id as id,
			article.title as title,
			article.introduce as introduce,
			FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,
			article.view_count as view_count,
			type.typeName as typeName
			FROM article LEFT JOIN type ON article.type_id = type.Id
			'WHERE type_id=${id}
		`;

		const results = await this.app.mysql.query(SQL)
		ctx.body = { data: results }
	}


}

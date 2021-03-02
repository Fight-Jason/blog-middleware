import { Controller } from 'egg';

export default class MainController extends Controller {

    public async checkLogin() {
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const SQL = " SELECT userName FROM admin_user WHERE userName = '"+userName +
                    "' AND password = '"+password+"'"

        const res = await this.app.mysql.query(SQL);
        if(res.length){
            //登录成功,进行session缓存
            let openId = new Date().getTime()
            this.ctx.session.openId={ 'openId':openId }
            this.ctx.body={'data':'登录成功','openId':openId}
  
        }else{
            this.ctx.body={data:'登录失败'}
        } 
    }

    public async getTypeInfo () {
        const resType = await this.app.mysql.select('type');
        this.ctx.body = {data: resType}
    }

    // 新增文章
    // affectedRows === -1 查询失败，执行成功返回受影响的行数
    // insertId判断是新增
    public async addArticle() {
        let tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.insert('article',tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
    
        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId:insertId
        }
    }

    // 更新文章
    public async updateArticle() {
        let tmpArticle = this.ctx.request.body;
        const result = await this.app.mysql.update('article', tmpArticle)
        const updateSuccess = result.affectedRows === 1;
        this.ctx.body = {
            isScuccess: updateSuccess
        }
    }

    // 获取文章列表
    public async getArticleList() {
        const SQL = `SELECT
            article.id as id,
            article.title as title,
            article.introduce as introduce,
            FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,
            type.typeName as typeName
            FROM article LEFT JOIN type ON article.type_id = type.id
            ORDER BY article.id DESC
        `
        const result =  await this.app.mysql.query(SQL)
        this.ctx.body = {list: result}
    }

    // 删除文章
    public async delArticle() {
        let id = this.ctx.params.id;
        const res = await this.app.mysql.delete('article', {id})
        this.ctx.body = {data: res}
    }
    
}

import { Controller } from 'egg';

export default class MainController extends Controller {

    public async checkLogin() {
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = " SELECT userName FROM admin_user WHERE userName = '"+userName +
                    "' AND password = '"+password+"'"
        const res = await this.app.mysql.query(sql);
        if(res.length){
            //登录成功,进行session缓存
            let openId = new Date().getTime()
            this.ctx.session.openId={ 'openId':openId }
            console.log(this.ctx.session.openId,"登录成功")
            this.ctx.body={'data':'登录成功','openId':openId}
  
        }else{
            this.ctx.body={data:'登录失败'}
        } 
    }

    public async getTypeInfo () {
        const resType = await this.app.mysql.select('type');
        this.ctx.body = {data: resType}
    }

    public async addArticle() {
        let tmpArticle= this.ctx.request.body
        // tmpArticle.
        const result = await this.app.mysql.insert('article',tmpArticle)
        console.log(tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
    
        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId:insertId
        }
    }
    
}

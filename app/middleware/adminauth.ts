export default () => {
    return async function adminauth (ctx, next){
        if(ctx.session.openId){
            await next()
        }else{
            ctx.body={data:'用户未登录'}
        }
    }
}
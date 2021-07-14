const Koa = require('koa');
const {getSignature, decrypt,encrypt} = require('@wecom/crypto')
const {token,EncodingAESKey} = require('./config/robot')
// 创建一个Koa对象表示web app本身:
const app = new Koa();
const bodyparser = require('koa-bodyparser')

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    const data = ctx.data
    const [msg_encrypt] = (data && data.Encrypt) || '';
    const { msg_signature, timestamp, nonce, echostr } = ctx.query;

    const requestData = decrypt(EncodingAESKey,echostr)
    const {message} = requestData
   if(getSignature(token, timestamp, nonce, msg_encrypt) === msg_signature){
       // 签名校验通过
       console.log(data)
       await next();
   }
    //    ctx.response.type = 'application/json';
    //    ctx.response.body = JSON.stringify({'a':'哈哈哈'});
        ctx.response.body = message
});

app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))

// 在端口3000监听:
app.listen(8080);

const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app){
    app.use(
        createProxyMiddleware("/api",{
            target: "http://localhost:8080/api",
            changeOrigin:true,
            pathRewrite: {
                "^/api": ""
            }
        }),
        
        createProxyMiddleware("/img",{
            target: "http://47.99.131.235:9001/ksc",
            changeOrigin:true,
            pathRewrite: {
                "^/img": ""
            }
        })
    )
}
const path = require('path');

module.exports = {
  secret: 'json-web-token-website',
  expiresIn: '1d',
  /**
   * cookie option
   */
  cookieOption: {
    // domain: 'localhost', // 写cookie所在的域名
    // path: '/', // 写cookie所在的路径
    maxAge: 1000 * 60 * 60 * 24, // cookie有效时长
    httpOnly: false, // 是否只用于http请求中获取
    overwrite: false, // 是否允许重写},
  },

  /**
   * project 文件上传路径配置
   */
  projectPath: path.join(__dirname, '/public'),
};

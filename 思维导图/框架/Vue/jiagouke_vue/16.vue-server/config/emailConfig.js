let nodemailer = require('nodemailer');

async function sendEmail(sendInfo) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    secure: false, 
    auth: {
      user: '1035465284@qq.com', // generated ethereal user
      pass: 'gzjpqerwnmesbcdi', // generated ethereal password
    },
  })

  let info = await transporter.sendMail({
    from: '"认证邮件" <1035465284@qq.com>', // sender address
    to: sendInfo.email, 
    subject: '修改密码的验证码，无需回复', // plain text body
    html: `
          <div>您好，${sendInfo.email} ，您的验证是 ${sendInfo.code} 有效时间30分钟
    `, // html body
  })
  return 'Message sent: %s', info.messageId
}


module.exports = sendEmail

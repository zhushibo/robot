const https = require('https')
const ROBOT_HOST_URL = 'qyapi.weixin.qq.com'
const ROBOT_PATH_URL = '/cgi-bin/webhook/send?key=e6c746e7-0b9c-48a4-bad2-cd7df3a61181'
const data = JSON.stringify({
    "msgtype": "text",
    "text": {
        "content": "<@yushanssli>害我加班的bug就是你写的",
        "mentioned_list":["wangqing","@all"],
        "mentioned_mobile_list":["13800001111","@all"]
    }
})

const options = {
  hostname: ROBOT_HOST_URL,
  port: 443,
  path: ROBOT_PATH_URL,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = https.request(options, res => {
  console.log(`状态码: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()
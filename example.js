const puppeteer = require('puppeteer');
const mail = require('./mail');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://www.weather.com.cn/weather/101230811.shtml');

  const dimensions = await page.evaluate(() => {

    const {
      od1: city,
      od2
    } = observe24h_data.od
    const data = od2
      .slice(0, -1)
      .map(item => ({
        hour: item.od21,
        temp: item.od22,
        prec: item.od26
      }))

    const statistics = data.reduce((result, {
      temp,
      prec
    }) => {
      return {
        max_temp: Math.max(temp, result.max_temp),
        min_temp: Math.min(temp, result.min_temp),
        total_prec: +(result.total_prec + +prec).toFixed(2)
      }
    }, {
      max_temp: -Infinity,
      min_temp: Infinity,
      total_prec: 0,
    })


    return {
      city,
      data,
      statistics
    };
  });

  const text = `
    最高温: ${dimensions.statistics.max_temp}℃
    最低温: ${dimensions.statistics.min_temp}℃
    降水量: ${dimensions.statistics.total_prec}mm
  `

  let mailOptions = {
    from: '刘晨<379563000@qq.com>',
    to: '刘晨<379563000@qq.com>',
    subject: '10月10号天气信息',
    text: JSON.stringify(dimensions.statistics),
    html: text
  };

  mail.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });

  console.log('close')

  await browser.close();
})();
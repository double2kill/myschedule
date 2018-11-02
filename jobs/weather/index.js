const puppeteer = require('puppeteer');
const mail = require('./mail');
const { weather: Model_weather } = require('../../model')
const {
    users
} = require('./config')
const moment = require('moment');

const getWeather = async () => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
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
            .filter(item => item.hour && item.hour && item.prec)

        const statistics = data.reduce((result, {
            temp,
            prec
        }) => {
            return {
                max_temp: Math.max(+temp, result.max_temp),
                min_temp: Math.min(+temp, result.min_temp),
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

    const {
        city,
        data,
        statistics
    } = dimensions

    const text = `
    最高温: ${statistics.max_temp}℃
    最低温: ${statistics.min_temp}℃
    降水量: ${statistics.total_prec}mm
    `

    const date = moment().format('MM-DD')

    let mailOptions = {
        from: '刘晨<379563000@qq.com>',
        // to: '刘晨<379563000@qq.com>',
        subject: `${date}天气信息`,
        text: text,
        html: text
    };

    await Model_weather.create({
        date,
        text,
        city,
        data,
        statistics,
        users
    })

    // 发送users的处理
    users.map(item => {
        return {
            to: item,
            ...mailOptions
        }
    }).map(option => {
        // 这里可能会有异步问题，应该要写一个promise
        mail.sendMail(option, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    })

    console.log('close')

    await browser.close();
}
module.exports = getWeather;

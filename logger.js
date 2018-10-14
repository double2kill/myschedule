const {
    createLogger,
    transports,
    format
} = require('winston')

const {
    combine,
    timestamp,
    label,
    printf
} = format;

const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

module.exports = createLogger({
    format: combine(
        label({
            label: 'right meow!'
        }),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'combined.log'
        })
    ]
});
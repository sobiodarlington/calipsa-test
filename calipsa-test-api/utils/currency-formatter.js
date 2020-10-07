'use strict';


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
});

const format = (number) => {
    let value = number;
    if (typeof number === 'string') {
        value = number.includes('.') ? parseFloat(number) : parseInt(number, 10);
    }

    // there happens to be an unprintable character inserted between the currency text
    // and the value (char-code: 160) hence the regex
    return formatter.format(value).replace(/([A-Z]+)[\w\W](\d+.\d{2})/, '$2');
};

module.exports = format;

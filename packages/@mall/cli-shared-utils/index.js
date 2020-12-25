['pkg'].forEach(m => {
    Object.assign(exports, require(`./lib/${m}`));
})

exports.chalk = require('chalk');

exports.execa = require('execa');

//判断版本的库
exports.semver = require('semver')
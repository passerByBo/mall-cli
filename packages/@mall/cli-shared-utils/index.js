[
    'env',
    'exit',
    'ipc',
    'logger',
    'module',
    'object',
    'openBrowser',
    'pkg',
    'pluginResolution',
    'launch',
    'request',
    'spinner',
    'validate'
].forEach(m => {
    Object.assign(exports, require(`./lib/${m}`));
})

exports.chalk = require('chalk');

exports.execa = require('execa');

//判断版本的库
exports.semver = require('semver')

Object.defineProperties(exports, 'installedBrowsers', {
    enumerable: true,
    get() {
        return exports.getInstalledBrowsers()
    }
})
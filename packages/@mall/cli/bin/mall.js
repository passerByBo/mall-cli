#!/usr/bin/env node
const requiredVersion = require('../package.json').engines.node
const { chalk, semver } = require('@mall/cli-shared-utils')
/**
 * 判断node版本，防止使用很老版本的node
 */
function checkNodeVersion(wanted, id) {
    if (semver.satisfies(process.version, wanted, { includePrerelease: true })) {
        console.log(chalk.red(
            '你使用的Node版本为：' + process.version + ',但是' + id + '必须使用' + wanted + ',请升级你的Node版本！'
        ))

        process.exit(0);
    } else {
        console.log(chalk.green(`当前使用的node版本是${process.version}`))
    }
}
checkNodeVersion(requiredVersion, '@mall/cli')

const fs = require('fs')
const path = require('path')

//命令参数解析
const program = require('commander')
//匹配命令
const leven = require('leven')
//解析进程参数
const minimist = require('minimist')

program
    .version(`@mall/cli ${require('../package').version}`)
    .usage('<command> [options]')


program.command('create <app-name>')
    .description('使用mall-cli新建一个工程')
    .option('-p,--parset <parsetName>', '跳过设置，直接使用远端的工程模板')
    .option('-d,--default', '跳过提示，使用默认设置')
    .option('--merge', '如果当前路径的文件已经存在，则进行文件合并！')
    .option('-x,--proxy <proxyUrl', '使用指定的代理创建工程！')
    .option('-f, --force', '如果当前目录下要创建的工程已经存在覆盖已经存在的工程！')
    .action((name, cmd) => {
        const options = cleanArgs(cmd)
        //解析进程参数中 子命令和命令参数
        const { _ } = minimist(process.argv.slice(3))
        if (_.length > 1) {
            console.log(chalk.yellow(`输入了多个子命令，只会选择第一个子命令（${_[0]}）去执行对应的应用。`))
        }

        //git提交
        if (process.argv.includes('-g') || process.argv.includes('--git')) {
            options.forceGit = true;
        }


        require('../lib/create')(name, options)
    })

program.arguments('<command>')
    .action(cmd => {
        program.outputHelp()
        console.log(`` + chalk.red(`未知的子命令：${chalk.yellow(cmd)}`) + ``)
        console.log()
        suggestCommands(cmd)
        process.exitCode = 1;
    })

program.on('--help', () => {
    console.log()
    console.log(`请使用 ${chalk.cyan(`mall <command> --help`)} 获取你想使用的子命令帮助！`)
    console.log()
})

//监听所有子命令的help，打印一个空行
// program.commands.forEach(c=> c.on('--help', () => {console.log()}))

//解析主进程的参数，必须写，不然不能解析命令
program.parse(process.argv);

/**
 * 查询子命令中的最佳匹配
 * @param {*} unknownCommand 
 */
function suggestCommands(unknownCommand) {
    const availableCommands = program.commands.map(cmd => cmd._name)

    let suggestion;

    availableCommands.forEach(cmd => {
        const isBestMath = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand)
        if (leven(cmd, unknownCommand) < 3 && isBestMath) {
            suggestion = cmd;
        }
    })

    if (suggestion) {
        console.log(`` + chalk.red(`你是不是想使用：${chalk.yellow(suggestion)}子命令`) + ``)
    }
}

/**
 * 将下划线分割的命名方式 修改为驼峰命名的方式
 * @param {*} str 
 */
function camelize(str) {
    return str.replace(/_(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

/**
 * 解析参数
 * @param {命令行对象} cmd 
 */
function cleanArgs(cmd) {
    const args = {}
    cmd.options.forEach(o => {
        const key = camelize(o.long.replace(/^--/, ''))
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key];
        }
    })

    return args;
}







//增强node fs模块功能， 并添加promise支持
const fs = require('fs-extra')
const { resolve } = require('path')
//交互式命令行用户界面
const inquirer = require('inquirer')
//验证是不是有效的npm包名
const validateProjectName = require('validate-npm-package-name')
const { chalk } = require('@mall/cli-shared-utils')
const { exit } = require('process')
const {clearConsole} = require('./util/clearConsole')
const {getPromptModules} = require('./util/createTools')
const Creator = require('./Creator')

async function create(projectName, options) {
    //设置代理
    if (options.proxy) {
        process.env.HTTP_PROXY = options.proxy
    }
    //当前运行的工作目录
    const cwd = options.cwd || process.cwd()
    //.代表在当前目录下构建工程无名称
    const inCurrent = projectName === "."
    const name = inCurrent ? resolve('../', cwd) : projectName
    const targetDir = resolve(cwd, projectName || '.')

    //验证工程名的正确性
    const result = validateProjectName(name)
    if (!result.validForNewPackages) {
        console.error(chalk.red(`输入的工程名称"${name}"是无效的！`))
        result.errors && result.errors.forEach(err => {
            console.error(chalk.red.dim('错误：' + err))
        })
        result.warnings && result.warnings.forEach(warn => {
            console.warning(chalk.red.dim('错误：' + warn))
        })
        exit(1)
    }

    if (fs.existsSync(targetDir) && !options.merge) {
        if (options.force) {
            await fs.remove(targetDir)
        } else {
            console.log('======================')
             await clearConsole()
             console.log('-------------------')
            if (inCurrent) {
                const { ok } = await inquirer.prompt([
                    {
                        name: 'ok',
                        type: 'confirm',
                        message: `在当前目录下创建工程？`
                    }
                ])

                if (!ok) {
                    return;
                }
            } else {
                const { action } = await inquirer.prompt([
                    {
                        name: 'action',
                        type: 'list',
                        message: `目标文件${chalk.cyan(targetDir)}已经存在，请选择下个动作：`,
                        choices: [
                            { name: '覆盖(Overwrite)', value: 'overwrite' },
                            { name: '合并(Merge)', value: 'merge' },
                            { name: 'Cancel', value: false }
                        ]
                    }
                ])

                if (!action) {
                    return
                } else if (action === 'overwrite') {
                    console.log(`\n 删除${chalk.cyan(targetDir)}中...`)
                    await fs.remove(targetDir)
                }
            }
        }
    }

    const creator = new Creator(name, targetDir, getPromptModules())
    await creator.create(options)
}

module.exports = (...arg) => {
    return create(...arg).catch(err => {
        process.exit(1)
    })
}
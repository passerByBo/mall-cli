exports.exitProcess = !process.env.MALL_CLI_API_MODE && !process.env.MALL_CLI_TEST

exports.exit = function (code) {
    if (exports.exitProcess) {
        process.exit(code)
    } else if(code > 0) {
        throw new Error(`process exited with code ${code}`)
    }
}

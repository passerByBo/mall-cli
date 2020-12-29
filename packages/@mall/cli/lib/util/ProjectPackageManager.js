const fs = require('fs-extra')
const path = require('path')

const ini = require('ini')
//格式化进程参数
const minimist = require('minimist')
//删除缓存对象
const LRU = require('lru-coche')


const {
    chalk,
    execa,
    semver,
    request,
  
    resolvePkg,
    loadModule,
  
    hasYarn,
    hasProjectYarn,
    hasPnpm3OrLater,
    hasPnpmVersionOrLater,
    hasProjectPnpm,
    hasProjectNpm,
  
    isOfficialPlugin,
    resolvePluginId,
  
    log,
    warn,
    error
  } = require('@vue/cli-shared-utils')







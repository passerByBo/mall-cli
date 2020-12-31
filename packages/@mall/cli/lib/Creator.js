const path = require('path')
const debug = require('debug')
const inquirer = require('inquirer')
const EventEmitter = require('events')
const Generator = require('./Generator')
const cloneDeep = require('lodash.clonedeep')
const sortObject = require('./util/sortObject')
const getVersions = require('./util/getVersions')
const PackageManager = require('./util/ProjectPackageManager')
const { clearConsole } = require('./util/clearConsole')
const PromptModuleAPI = require('./PromptModuleAPI')
const writeFileTree = require('./util/writeFileTree')
const { formatFeatures } = require('./util/features')
const loadLocalPreset = require('./util/loadLocalPreset')
const loadRemotePreset = require('./util/loadRemotePreset')
const generateReadme = require('./util/generateReadme')
const { resolvePkg, isOfficialPlugin } = require('@mall/cli-shared-utils')

const {
    defaults,
    saveOptions,
    loadOptions,
    savePreset,
    validatePreset,
    rcPath
  } = require('./options')

  const {
    chalk,
    execa,
  
    log,
    warn,
    error,
  
    hasGit,
    hasProjectGit,
    hasYarn,
    hasPnpm3OrLater,
    hasPnpmVersionOrLater,
  
    exit,
    loadModule
  } = require('@mall/cli-shared-utils')

  const isManualMode = answers => answers.preset === '__manual__'




const path = require('path')
const debug = require('debug')
const inquirer = require('inquirer')
const  EventEmitter = require('events')
const Generator = require('./Generator')
const cloneDeep = require('lodash.clonedeep')
const getVersions = require('./util/getVersions')


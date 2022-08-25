const chalk = require('chalk')
const COLOR_PRIMARY = '#409eff'
const COLOR_SUCCESS = '#67c23a'
const COLOR_WARNING = '#e6a23c'
const COLOR_DANGER  = '#f56c6c'
const COLOR_INFO    = '#909399'
const _log = console.log

function log (message) {
    this.info(message)
}

log.title = function (title, bgColor = COLOR_SUCCESS) {
    return chalk.bgHex(bgColor)(title)
}

log.info = function (message) {
    _log(
        this.title(' INFO ', COLOR_INFO),
        message
    )
}

log.error = function (message) {
    _log(
        this.title(' ERROR ', COLOR_DANGER),
        message
    )
}

log.success = function (message) {
    _log(
        this.title(' SUCCESS ', COLOR_SUCCESS),
        message
    )
}

log.warn = function (message) {
    _log(
        this.title(' WARNING ', COLOR_WARNING),
        message
    )
}


module.exports = log
'use strict'

const EventEmitter = require('events').EventEmitter
const ec2Info = require('ec2-info')
const thunky = require('thunky')

function plugin (options) {
  return new Processor(options)
}

// TODO (later): should this be the default behavior?
plugin.cached = function () {
  return plugin({ cache: true })
}

const fetch = function (callback) {
  ec2Info(['meta-data/instance-id'], (err, map) => {
    if (err) return callback(err)

    callback(null, map.get('meta-data/instance-id'))
  })
}

const cachedFetch = thunky(fetch)

module.exports = plugin

class Processor extends EventEmitter {
  constructor (options) {
    super()
    this._fetch = (options && options.cache ? cachedFetch : fetch).bind(null)
    this._instanceId = null
  }

  start (callback) {
    this._instanceId = null
    this._fetch((err, value) => {
      if (err) return callback(err)
      if (value) this._instanceId = value
      callback()
    })
  }

  stop (callback) {
    this._instanceId = null
    process.nextTick(callback)
  }

  process (metric) {
    if (this._instanceId !== null) {
      metric.tags.instanceid = this._instanceId
    }

    this.emit('metric', metric)
  }
}

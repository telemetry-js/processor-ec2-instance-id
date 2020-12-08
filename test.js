'use strict'

const test = require('tape')
const proxyquire = require('proxyquire')
const spies = []
const plugin = proxyquire('.', {
  'ec2-info': function (...args) {
    spies.shift()(...args)
  }
})

test('basic', function (t) {
  t.plan(4)

  spies.push((properties, callback) => {
    t.same(properties, ['meta-data/instance-id'])
    process.nextTick(callback, null, new Map([['meta-data/instance-id', 'beep']]))
  })

  const p = plugin()
  const metric = { tags: { existing: '1' } }

  p.start((err) => {
    t.ifError(err, 'no start error')
    t.is(spies.length, 0, 'ec2-info called')

    p.on('metric', (metric) => {
      t.same(metric, {
        tags: {
          existing: '1',
          instanceid: 'beep'
        }
      })
    })

    p.process(metric)
  })
})

test('cached', function (t) {
  t.plan(5)

  spies.push((properties, callback) => {
    t.pass('called only once')
    process.nextTick(callback, null, new Map([['meta-data/instance-id', 'beep']]))
  })

  const p1 = plugin.cached()
  const p2 = plugin.cached()

  for (const p of [p1, p2]) {
    p.start((err) => {
      t.ifError(err, 'no start error')

      p.on('metric', (metric) => {
        t.same(metric, {
          tags: {
            existing: '1',
            instanceid: 'beep'
          }
        })
      })

      p.process({ tags: { existing: '1' } })
    })
  }
})

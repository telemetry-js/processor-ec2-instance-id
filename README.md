# processor-ec2-instance-id

> **Add `instanceid` tag to metrics.**  
> A [`telemetry`](https://github.com/telemetry-js/telemetry) plugin.

[![npm status](http://img.shields.io/npm/v/telemetry-js/processor-ec2-instance-id.svg)](https://www.npmjs.org/package/@telemetry-js/processor-ec2-instance-id)
[![node](https://img.shields.io/node/v/@telemetry-js/processor-ec2-instance-id.svg)](https://www.npmjs.org/package/@telemetry-js/processor-ec2-instance-id)
[![Test](https://github.com/telemetry-js/processor-ec2-instance-id/workflows/Test/badge.svg?branch=main)](https://github.com/telemetry-js/processor-ec2-instance-id/actions)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Table of Contents

<details><summary>Click to expand</summary>

- [Usage](#usage)
- [Options](#options)
- [Cached variant](#cached-variant)
- [Install](#install)
- [Acknowledgements](#acknowledgements)
- [License](#license)

</details>

## Usage

```js
const telemetry = require('@telemetry-js/telemetry')()
const instanceId = require('@telemetry-js/processor-ec2-instance-id')

telemetry.task()
  .process(instanceId)
```

## Options

None.

## Cached variant

By default, each instance of this plugin fetches EC2 instance metadata itself. To only fetch once (with a semiglobal cache) use:

```js
const instanceId = require('@telemetry-js/processor-ec2-instance-id').cached
```

## Install

With [npm](https://npmjs.org) do:

```
npm install @telemetry-js/processor-ec2-instance-id
```

## Acknowledgements

This project is kindly sponsored by [Reason Cybersecurity Inc](https://reasonsecurity.com).

[![reason logo](https://cdn.reasonsecurity.com/github-assets/reason_signature_logo.png)](https://reasonsecurity.com)

## License

[MIT](LICENSE) © Vincent Weevers

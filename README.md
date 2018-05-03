[![Build Status](https://travis-ci.org/dennisjade/robinsons-sales-util.svg?branch=master)](https://travis-ci.org/dennisjade/robinsons-sales-util)
[![Coverage Status](https://coveralls.io/repos/github/dennisjade/robutil/badge.svg?branch=master)](https://coveralls.io/github/dennisjade/robutil?branch=master)
ROBUTIL
===================

A small utility library for my projects

## Installation

  `npm install @dennisjade/robutils`

## Usage

    var robutils = require('@dennisjade/robutils');


## Available methods

    - token  = robutils.token.verify(source, req.headers)
    - logger = robutils.logger.log.<info/error/warn>('you msg')
    - parser = robutils.
    - config = robutils.config.get(owner, environment, configObject)
```sh
      configObject = {
        CONFIG_URL: ''https://localhost:6062,
        HEADER_TOKEN: 'abcdefghijklmnopqrstwxyz'
      }
```

## Tests

  `npm test`

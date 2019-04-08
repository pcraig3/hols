const { h } = require('preact')
const htm = require('htm')

const html = htm.bind(h)

// return a meta tag if a GITHUB_SHA environment variable exists
const metaIfSHA = () =>
  process.env.GITHUB_SHA &&
  `<meta name="keywords" content="GITHUB_SHA=${process.env.GITHUB_SHA}" />`

// define a schema for login field validation: https://express-validator.github.io/docs/schema-validation.html
const loginSchema = {
  name: {
    in: ['body'],
    isEmpty: { errorMessage: 'Name can’t be empty', negated: true },
    isLength: {
      errorMessage: 'Name can’t be 1 character',
      options: { min: 2 },
    },
  },
  number: {
    in: ['body'],
    isEmpty: { errorMessage: 'Number can’t be empty', negated: true },
    isNumeric: { errorMessage: 'Number can’t contain letters' },
    isInt: { errorMessage: 'Number can’t be less than 1', options: { min: 1 } },
  },
}

/*
  original format is an array of error objects: https://express-validator.github.io/docs/validation-result-api.html
  convert that to an object where the key is the parameter name and value is the error object

  ie,

  [
    { param: 'name', msg: 'Name can’t be empty', ... },
    { param: 'number', msg: 'Number can’t be empty', ... }
  ]

  to

  {
    name: { param: 'name', msg: 'Name can’t be empty', ... },
    number: { param: 'number', msg: 'Number can’t be empty', ... }
  }
*/
const errorArray2ErrorObject = (errors = []) => {
  return errors.array({ onlyFirstError: true }).reduce((map, obj) => {
    map[obj.param] = obj
    return map
  }, {})
}

module.exports = {
  html,
  metaIfSHA,
  loginSchema,
  errorArray2ErrorObject,
}

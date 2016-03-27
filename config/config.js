
var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  

module.exports = {
  development: {
    db: 'mongodb://localhost/kms',
    root: rootPath,
    app: {
      name: 'KMS DEV'
    }
  },
  test: {
    db: 'mongodb://localhost/kms_test',
    root: rootPath,
    app: {
      name: 'KMS TEST'
    }
  },  
  production: {
    db: 'mongodb://localhost:kms',
    root: rootPath,
    app: {
      name: 'KMS'
    }    
  }
}

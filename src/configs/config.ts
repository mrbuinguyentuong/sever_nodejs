const env = process.env.NODE_ENV || 'develop'

const local = {
  port: '5000',
  jwt: {
    options: {
      algorithm: 'HS256',
      expirseIn: '24h'
    },
    secretKey: '123@123'
  },
  database: {
    host: ''
  }
}

const production = {
  port: '5005',
  jwt: {
    options: {
      algorithm: 'HS256',
      expirseIn: '24h'
    },
    secretKey: '123@123'
  },
  database: {
    host: ''
  }
}

const config = (): any => (env === 'develop' ? local : production)

export default config()

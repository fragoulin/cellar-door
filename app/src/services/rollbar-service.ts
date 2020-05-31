import Rollbar from 'rollbar'

const rollbar = new Rollbar({
  accessToken: '2a72ff7ec50b42f0b355bc4488ad2cee',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

export { rollbar }

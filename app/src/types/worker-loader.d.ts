declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
      super()
    }
  }

  export default WebpackWorker
}

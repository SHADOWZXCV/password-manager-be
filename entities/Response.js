class Response {
   constructor({status, data, error, useNext}) {
       this.status = status
       this.data = data
       this.error = error
       this.useNext = useNext
   }
}

module.exports = Response

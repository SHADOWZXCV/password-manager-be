class Response {
   constructor({status, data, error, useNext, actions}) {
       this.status = status
       this.data = data
       this.error = error
       this.useNext = useNext
       this.actions = actions
   }
}

module.exports = Response

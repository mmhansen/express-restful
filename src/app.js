const express = require('express')


class Resource {
  constructor() {

  }
}

class Api {
  constructor(app) {
    this.app = app;
    app.listen(3000)
  }
  add_resource(resource, url) {
    const self = this

    const t = Object.getOwnPropertyNames(resource.prototype)
    const allowed = ['get', 'post', 'put', 'delete']
    const methods = t.filter(function (s) {
      return allowed.indexOf(s) > -1
    })
    methods.map(function (method) {
      self.app[method](url, resource.prototype[method])
    })
  }
}



module.exports = {
  Api: Api,
  Resource: Resource
}

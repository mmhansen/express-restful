const express = require('express')


class Resource {
  constructor() {

  }
}


function requestWapper(func) {
  return function (req, res, next) {
    req.next = next
    let code = 200
    let reply = func(req)
    if (Array.isArray(reply)) {
      code = reply[1]
      reply = reply[0]
    }
    res.status(code)
    res.send(reply)
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
      self.app[method](url, requestWapper(resource.prototype[method]))
    })
  }
}



module.exports = {
  Api: Api,
  Resource: Resource
}

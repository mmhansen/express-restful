```
const express = require('express')
const Api = require('./app').Api
const Resource = require('./app').Resource

const app = express()
const api = new Api(app)


class HelloWorld extends Resource {
  get(request) {
    return {'hello': 'world'}
  }
  post(request) {
    return 'Successfully saved password'
  }
}

class TodoList extends Resource {
  get(request) {
    return [
      {'my': 'todolist'},
      201
    ]
  }
}

api.add_resource(HelloWorld, '/')
api.add_resource(TodoList, '/todo')
```

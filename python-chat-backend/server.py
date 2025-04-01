from flask_caching import Cache
import redis
from flask import Flask, jsonify, request, application
from werkzeug.wrappers import Request, Response, ResponseStream
import boto3

class AuthMiddleware:
     
    def __init__(self, app, cache):
        self.app = app
        self.cache = cache

    def __call__(self, environ, start_response):
        request = Request(environ)
        accessToken = request.authorization['x-access-key']

        '''Check cache for valid jwt'''
        authorized = True
        # if userName == self.userName and password == self.password:
        #     environ['user'] = { 'name': 'Tony' }
        #     return self.app(environ, start_response)
        
        res = Response(u'Auth failed', mimetype='text/plain', status=401)
        return res(environ, start_response)
        

class ChatFlaskApp(Flask):
    def __init__(self, name):
        self.name = name
        self = super(name)
        app.wsgi_app = AuthMiddleware(app.wsgi_app)
        app.config['CACHE_TYPE'] = 'redis'
        app.config['CACHE_REDIS_HOST'] = 'localhost'
        app.config['CACHE_REDIS_PORT'] = 6379
        app.config['CACHE_REDIS_DB'] = 0



@application.route('/chats/', methods=['GET'])
@cache.cached(timeout=60, key_prefix='items')
def get_chats():
      # Check if the response is already cached
      cached_response = redis_client.get('chats')
      if cached_response:
          return jsonify(cached_response)

      # Get the items from the database here
      items = Chats.query.all()

      # Serialize the items to JSON
      serialized_items = [item.to_dict() for item in items]

      response = jsonify(serialized_items)

      return response

    #   return jsonify({'message': 'Chats retrieved successfully'})

@application.route('/chats/:sessionId', methods=['POST'])
def add_item():
      # Get the item name from the request body
      item_name = request.json.get('userPrompt')

      # Add the item to the database here
      # ...

      # Delete the cached response to invalidate the cache
      cache.delete('items')

      return jsonify({'message': 'Item added successfully'})


class ChatDB:
    def __init__(self, name='ChatServiceDB',**kwargs):
        self._name = name
        self.dynamodb_client = boto3.client("dynamodb-knowall-chat-service")
        self.paginator = self.dynamodb_client.get_paginator("list_tables")
        self.page_iterator = self.paginator.paginate(Limit=10)

    def createTable(self, table_name):
        pass


class Session:
    def __init__(self, id=0):
        self.id = id




if __name__ =='__main__':
    app = ChatFlaskApp(__name__)
    app.run('127.0.0.1', '8081', debug=True)


    #Temp DB
    Chats = {}

    # Initialize Flask-Caching with Redis
    cache  = Cache(app=app)
    cache.init_app(app)

    
    # Initialize Redis client
    redis_client = redis.Redis(host='localhost', port=6379, db=0)
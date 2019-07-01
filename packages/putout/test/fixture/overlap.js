function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};


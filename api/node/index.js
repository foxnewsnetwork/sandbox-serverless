const fetch = require('node-fetch');

const URL = "http://www.gravizo.com/svg?%20digraph%20G%20{main%20-%3E%20parse%20-%3E%20execute;main%20-%3E%20init;main%20-%3E%20cleanup;execute%20-%3E%20make_string;execute%20-%3E%20printfinit%20-%3E%20make_string;main%20-%3E%20printf;execute%20-%3E%20compare;%20}";

module.exports = (req, res) => {
  fetch(URL)
    .then(response => response.buffer())
    .then(buffer => res.end(buffer))
    .catch(error => {
      res.statusCode = 500;
      res.end(error.toString());
    })
};

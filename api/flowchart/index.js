// https://github.com/adrai/flowchart.js
const FlowChart = require('flowchart');

// https://github.com/neocotic/convert-svg/tree/master/packages/convert-svg-to-png
const ConvertSVGToPNG = require('convert-svg-to-png');

// https://nodejs.org/api/querystring.html
// const querystring = require('querystring');

// https://nodejs.org/api/url.html
const url = require('url');

// In order for this stuff to work properly, I would need
// js dom and, headless chrominum, etc.; all of this is
// *extremely* heavy and so won't work out of the box currently.

// I will need to investigate how to properly setup my
// containers and whatnot on the back-end next
// https://www.npmjs.com/package/jsdom

// Recall that req is https://nodejs.org/api/http.html#http_class_http_clientrequest
// and that res is https://nodejs.org/api/http.html#http_class_http_serverresponse
module.exports = async (req, res) => {
  const uri = URL.parse(req.path, { parseQueryString: true });

  const { x } = uri.query;

  const diagram = FlowChart.parse(decodeURIComponent(x));


};

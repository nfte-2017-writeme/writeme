// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
/**
 * @function fetch
 * @desc sends a "GET" request to target endpoint
 *
 * @param {String} [uri] a DOMString representing the URL target of the the request
 * @returns {XMLHttpRequest} instance
 */
function fetch(uri){
  // a new request
  let request = new XMLHttpRequest()
  request.open('GET', uri, false)
  request.onreadystatechange = () => {
    // exit if not successful
    if (request.readyState != 4 || request.status != 200) return
    // send parsed response dataset to successful routine
    on_success(JSON.parse(request.responseText))
  };
  request.send(null)
  return request
}

/**
 * @function on_success
 * @desc routine that executes when response is complete and successful
 *
 * @param {*} [data] response dataset
 */
function on_success(data) {
  console.log(`Success: ${data}`)
  // do more stuff
}
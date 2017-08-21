class Asks {

    constructor() {
        return this
    }

    run() {
        this.fetch(/* add uri */)
        return this
    }

    /**
     * @method fetch
     * @desc sends a "GET" request to target endpoint
     *
     * @param {String} [uri] a DOMString representing the URL target of the the request
     * @returns {XMLHttpRequest} instance
     */
    fetch( uri ) {
        // a new request
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
        let request = new XMLHttpRequest()
        request.open( 'GET', uri, false )
        request.onreadystatechange = () => {
            if ( request.readyState == 4 || request.status == 200 ) {
                // send parsed response dataset to successful routine
                this.on_success( JSON.parse( request.responseText ) )
            } else {
                // send to error path
                this.on_error( JSON.parse( request.responseText ) );
            }
        }
        request.send( null )
        return request
    }


    /**
     * @method on_success
     * @desc routine that executes when request is complete and successful
     *
     * @param {*} [data] response dataset
     */
    on_success( data ) {
        console.log( `Success: ${data}` )
        // do more stuff
    }

    /**
     * @method on_error
     * @desc routine that executes when request fails
     *
     * @param {*} [data] response dataset
     */
    on_error( data ) {
        console.log( `Error: ${data}` )
        // do more stuff
    }

}

// instantiate view
const view = new Asks()

// invoke the view
view.run()

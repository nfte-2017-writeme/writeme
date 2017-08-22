class Asks {

    constructor() {
        // internal properties
        this.attrs = {
            questions: [],
            _response: {}
        }
        return this
    }

    /**
     * @method set
     * @desc generic setter within the attrs property
     *
     * @param {String} [property] namespace of the desired data model
     * @param {*} [value]
     * @returns {Asks} instance
     */
    set( property = '', value = null ) {
        this.attrs[ property ] = value;
        console.log( `set: ${property}`, this.attrs[ property ] )
        return this;
    }

    /**
     * @method fetch
     * @desc sends a "GET" request to target endpoint
     *
     * @param {String} [uri] a DOMString representing the URL target of the the request
     * @returns {XMLHttpRequest} instance
     */
    fetch( uri = '' ) {
        // a new request
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
        let request = new XMLHttpRequest()
        request.open( 'GET', uri, false )
        request.onreadystatechange = () => {
            if ( request.readyState == 4 || request.status == 200 ) {
                // send parsed response dataset to successful routine
                this._on_success( JSON.parse( request.responseText ) )
            } else {
                // send to error path
                this._on_error( JSON.parse( request.responseText ) )
            }
        }
        request.send( null )
        return request
    }

    /**
     * @private
     * @method _on_success
     * @desc routine that executes when request is complete and successful
     *
     * @param {*} [data] response dataset
     */
    _on_success( data ) {
        console.log( 'Success:', data )
        // internally cache last succesful response
        this.attrs._response = data;

        // store questions safely
        this.set( 'questions', this._extract_questions_from_dataset( data ) )

        return data
    }

    /**
     * @private
     * @method _on_error
     * @desc routine that executes when request fails
     *
     * @param {*} [data] response dataset
     */
    _on_error( data ) {
        console.log( `Error: ${data}` )
        // do more stuff
        return data
    }

    /**
     * @private
     * @method _extract_questions_from_dataset
     * @desc safely get all the questions from the dataset and put them into a simple collection
     *
     * @param {*} [dataset] response dataset
     * @returns {Array}
     */
    _extract_questions_from_dataset( dataset = [] ) {
        return dataset.map( ( value ) => value.question )
    }

}

// instantiate view
const view = new Asks()

// get the data
view.fetch( 'https://nfte-2017-writeme.github.io/writeme/mocks/endpoints/qna/index.json' )

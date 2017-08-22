!function() {

/* =================================
=            AsksModel             =
================================= */

class AsksModel {

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
        this.attrs[ property ] = value
        return this
    }

    /**
     * @method fetch
     * @desc sends a "GET" request to target endpoint
     *
     * @param {String} [uri] a DOMString representing the URL target of the the request
     * @returns {Promise} instance
     */
    async fetch( uri = '' ) {
        return new Promise( ( resolve, reject ) => {
            // a new request
            // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
            let request = new XMLHttpRequest()
            request.open( 'GET', uri, false )
            request.onload = () => {
                if ( request.status >= 200 && request.status < 300 ) {
                    // send parsed response dataset to successful routine
                    resolve( this._on_success( JSON.parse( request.responseText ) ) )
                } else {
                    // send to error path
                    reject( this._on_error( JSON.parse( request.responseText ) ) )
                }
            }
            // send to error path
            request.onerror = () => reject( this._on_error( JSON.parse( request.responseText ) ) )
            request.send( null )
        } )
    }

    /**
     * @private
     * @method _on_success
     * @desc routine that executes when request is complete and successful
     *
     * @param {*} [data] response dataset
     */
    _on_success( data ) {
        // console.log( 'Success:', data )
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
     * @param {*} [data] error response dataset
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
/* =====  End of AsksModel  ====== */

/* =================================
=            Asks View             =
================================= */

class AsksView {
    constructor( selector = 'body', Model = AsksModel ) {
        // view attributes
        this.attrs = {
            question: '' // the current view's question
        }
        // set reference to scoped element
        this.$el = document.querySelectorAll( selector );
        // construct view's data model
        this.model = new Model()

        return this
    }

    /**
     * @method fetch_then_render
     * @desc have model fetch dataset then render questions based on the model
     *
     * @param {String} [uri] a DOMString representing the URL target of the the request
     * @returns {Promise} instance
     */
    async fetch_then_render( uri = '' ) {
        let model = await this.model.fetch( uri )

        // explicit view routines
        this
            .set_current_question()
            .render_question()

        return this
    }

    /**
     * @method render_question
     * @desc set the question within the constructed view's text node
     *
     * @returns {AsksView} instance
     */
    render_question() {
        // set the content in the scoped view's element
        this.$el.forEach( ( el ) => el.textContent = this.attrs.question )
        return this
    }

    /**
     * @method set
     * @desc generic setter within the attrs property
     *
     * @param {String} [property] namespace of the desired data model
     * @param {*} [value]
     * @returns {AsksView} instance
     */
    set( property = '', value = null ) {
        this.attrs[ property ] = value
        return this
    }

    /**
     * @method set_current_question
     * @desc set the question property from a parameterized string or random question
     *
     * @param {String} [question] value to set within the view's current view dataset
     * @returns {AsksView} instance
     */
    set_current_question( question = '' ) {
        // set the current question
        return this.set( 'question', question || this._get_random_question() )
    }

    /**
     * @private
     * @method _get_random_question
     * @desc safely get a random question from
     *
     * @param {Array} [questions] optional parameter of sample dataset defaults to internal saved questions
     * @returns {String}
     */
    _get_random_question( questions = this.model.attrs.questions ) {
        let random_index = Math.floor( Math.random() * questions.length )
        return questions[ random_index ]
    }
}
/* =====  End of Asks View  ======*/

/* ===========================
=            run             =
=========================== */

// instantiation
const view = new AsksView( '.question-item' )

view.fetch_then_render( 'https://nfte-2017-writeme.github.io/writeme/mocks/endpoints/qna/index.json' )
/* =====  End of run  ====== */

}()

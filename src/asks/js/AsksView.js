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

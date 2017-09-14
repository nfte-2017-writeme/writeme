! function () {
    /* ==========================    =
    =========================== */

    // instantiation
    const view = new AsksView( '.question-item' );
    const stack = Swing.Stack();

    // Events
    stack.on( 'dragstart', ( e ) => {
        e.target.classList.add( 'btn-info' );
    } );

    stack.on( 'dragend', ( e ) => {
        e.target.classList.remove( 'btn-info' );
    } );

    stack.on( 'throwoutleft', ( e ) => {
        e.target.classList.add( 'btn-danger' );
        window.setTimeout( () => window.location.reload(), 500 );
    } );

    stack.on( 'throwoutright', ( e ) => {
        e.target.classList.add( 'btn-success' );
        window.setTimeout( () => window.location.assign( '../loading' ), 750 );
    } );

    // get questions
    view.fetch_then_render( 'https://nfte-2017-writeme.github.io/writeme/mocks/endpoints/qna/index.json' );

    // dom mutation
    ( [] ).forEach.call( document.querySelectorAll( '.btn-circle' ), stack.createCard );

    /* =====  End of run  ====== */

}()

! function () {
    /* =====  run  ====== */

    // instantiation
    const view = new AsksView( '.question-item' );
    const stack = Swing.Stack();
    const render_inactive_state = ( list ) => {
        list.remove( 'btn-info' );
        list.add( 'btn-dark' );
    };
    const render_active_state = ( list, state = 'info' ) => {
        list.remove( 'btn-dark' );
        list.remove( 'btn-info' );
        list.add( `btn-${state}` );
    };

    // Events
    stack.on( 'dragstart', ( evt ) => {
        render_active_state( evt.target.classList );
    } );

    stack.on( 'throwin', ( evt ) => {
        render_inactive_state( e.target.classList );
    } );

    stack.on( 'throwoutleft', ( evt ) => {
        render_active_state( evt.target.classList, 'danger' );
        window.setTimeout( () => window.location.reload(), 500 );
    } );

    stack.on( 'throwoutright', ( evt ) => {
        render_active_state( evt.target.classList, 'success' );
        window.setTimeout( () => window.location.assign( '../loading' ), 750 );
    } );

    // get questions
    view.fetch_then_render( 'https://nfte-2017-writeme.github.io/writeme/mocks/endpoints/qna/index.json' );

    // dom mutation
    ( [] ).forEach.call( document.querySelectorAll( '.btn-circle' ), stack.createCard );

    /* =====  End of run  ====== */

}()

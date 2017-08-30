!function() {
/* ==========================    =
=========================== */

// instantiation
const view = new AsksView( '.question-item' )

view.fetch_then_render( 'https://github.com/nfte-2017-writeme/writeme/blob/master/src/Prompts/prompts.json' )
/* =====  End of run  ====== */

}()

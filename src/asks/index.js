!function() {
/* ===========================
=            run             =
=========================== */

// instantiation
const view = new AsksView( '.question-item' )

view.fetch_then_render( 'https://nfte-2017-writeme.github.io/writeme/mocks/endpoints/qna/index.json' )
/* =====  End of run  ====== */

}()

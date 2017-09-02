!function() {
/* ==========================    =
=========================== */

// instantiation
const view = new AsksView( '.question-item' )

view.fetch_then_render( 'https://nfte-2017-writeme.github.io/writeme/mocks/endpoints/qna/index.json' )
/* =====  End of run  ====== */

}()

var element = $('body');

Hammer(element).on("swipeleft", function() {
    location.reload();
}); 

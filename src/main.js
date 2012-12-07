require(['snippets/googlemap', 'snippets/popcorn', 'snippets/text', 'snippets/url'],
  function(GooglemapSnippet, PopcornSnippet, TextSnippet, UrlSnippet){

  var snippets = [
    GooglemapSnippet,
    PopcornSnippet,
    TextSnippet,
    UrlSnippet
  ];

  function start(){
    var urlInput = document.querySelector('.input-container input');

    var masonryWall = new Masonry(wallDiv, {
      isFitWidth: true,
      columnWidth: 275,
      gutterWidth: 10
    });

    urlInput.addEventListener('keypress', function(e){

      if(e.which === 13){
        var urlInputValue = urlInput.value;
        
        urlInput.value = "";

        var snippetOutput = snippets.reduce(function(previous, snippet){
          return previous || snippet(urlInputValue, masonryWall);
        }, null);

        console.log(snippetOutput);
      }

    }, false);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', start, false);
  }
  else {
    start();
  }

});
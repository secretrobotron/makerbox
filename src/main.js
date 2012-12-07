require(['snippets/googlemap', 'snippets/popcorn', 'snippets/text', 'snippets/url'],
  function(GooglemapSnippet, PopcornSnippet, TextSnippet, UrlSnippet){

  var snippets = [
    GooglemapSnippet,
    PopcornSnippet,
    UrlSnippet,
    TextSnippet
  ];

  function start(){
    var urlInput = document.querySelector('.input-container input');

    var wallDiv = document.querySelector('.wall');
    var popcornProject = document.querySelector( ".explode-button" );
    var explodedEls = document.querySelectorAll( ".exploded-item" );
    var miniMenu = document.querySelector( ".mini-menu > a" );
    var miniMenuInner = document.querySelector( ".mini-menu-inner" );

    miniMenu.addEventListener( "click", function() {
      miniMenuInner.classList.toggle( "on" );
    }, false );


    wallDiv.classList.add( "on" );
        
    popcornProject.addEventListener( "click", function addExploded() {
        var item,
            allItems = [];
        console.log( explodedEls );
        for ( var i = 0; i < explodedEls.length; i++ ) {   
            allItems.push( explodedEls[ i ] );
            wallDiv.appendChild( explodedEls[ i ] );
        }
        wall.appended(allItems);
        popcornProject.removeEventListener( "click", addExploded, false );
        popcornProject.style.display =  "none";
    }, false );
        
    document.ondragover = function(e){
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = 'copy';
      return false;
    };

    document.ondrop = function(e){
      e.preventDefault();
      e.stopPropagation();
      console.log(e.dataTransfer.files[0]);
      return false;
    };

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
          return previous || snippet(urlInputValue);
        }, null);

        if(snippetOutput){
          wallDiv.insertBefore(snippetOutput.element, wallDiv.firstChild);
          if(snippetOutput.wait){
            snippetOutput.wait(function(){
              masonryWall.reload();
            });
          }
          else {
            masonryWall.reload();
          }
        }
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
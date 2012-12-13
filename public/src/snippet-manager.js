define([], function(){
  
  function SnippetManager(){

    var _snippets = [];

    this.addSnippet = function(snippet){
      _snippets.push(snippet);
    };

    this.matchSnippet = function(input){
      return _snippets.reduce(function(previous, snippet){
        return previous || snippet(input);
      }, null);
    };

  }

  return {
    SnippetManager: SnippetManager
  };

});
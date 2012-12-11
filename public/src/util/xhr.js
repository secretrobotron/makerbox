define({
  get: function(url, readyCallback, stateChangeCallback){
    stateChangeCallback = stateChangeCallback || function(){};
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function(e){
      if(xhr.readyState === 4){
        readyCallback(xhr.response);
      }
      stateChangeCallback(e);
    };
    xhr.send();
  }
});
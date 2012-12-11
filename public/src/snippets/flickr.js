define(['./snippet', 'util/xhr'], function(snippet, xhrutils){
  var urlRegex = /(http(s)?:\/\/)?www.flickr.com\/photos\/([^$]+)/;

  // Stolen from popcornjs' flickr plugin
  var flickrAPIKey = 'b939e5bd8aa696db965888a31b2f1964';
  var requestPrefix = 'http://api.flickr.com/services/rest/?nojsoncallback=1&format=json&api_key=' + flickrAPIKey + '&';

  return function(input){
    var urlMatch = input.match(urlRegex);
    var div, iframe;
    var explodeItems = [];
    var path, userId, setId, urlType, specificId;
    var requestSuffix;
    var responseKey;

    var flickrAPIs = {
      galleries: function(){
        xhrutils.get(requestPrefix + 'method=flickr.urls.lookupGallery&url=http://www.flickr.com/photos/' + userId + '/galleries/' + specificId,
          function(response){
            getExplodeItems('method=flickr.galleries.getPhotos&page=1&extras=url_m&media=photos&safe_search=1&gallery_id=' + JSON.parse(response).gallery.id, 'photos');
          });
        fillIframe('http://www.flickr.com/slideShow/index.gne?user_id=' + userId);
      },
      sets: function(){
        fillIframe('http://www.flickr.com/slideShow/index.gne?set_id=' + specificId);
        getExplodeItems('method=flickr.photosets.getPhotos&page=1&extras=url_m&media=photos&safe_search=1&photoset_id=' + specificId, 'photoset');
      }
    };

    function getExplodeItems(requestSuffix, responseKey){
      xhrutils.get(requestPrefix + requestSuffix, function(response){
        response = JSON.parse(response);
        if(response.stat === 'ok'){
          explodeItems = response[responseKey].photo.slice(0, 10).map(function(item){
            return item.url_m;
          });
        }
      });
    }

    function fillIframe(url){
      console.log(div);
      div.querySelector('iframe').src = url;
    }

    function getUserId(pseudonym, callback){
      xhrutils.get(requestPrefix + 'method=flickr.people.findByUsername&username=' + pseudonym, function(response){
        callback(JSON.parse(response).user.id);
      });
    }

    function setup(){
      if(flickrAPIs[urlType]){
        flickrAPIs[urlType]();
      }
      else {
        fillIframe('http://www.flickr.com/slideShow/index.gne?user_id=' + userId);
        getExplodeItems('method=flickr.photos.search&page=1&extras=url_m&media=photos&safe_search=1&user_id=' + userId, 'photos');
      }
    }

    if(urlMatch){
      path = urlMatch[3].split('/');

      userId = path[0];
      urlType = path[1];
      specificId = path[2];

      div = snippet.createIframe('flickr');
      div.classList.add('portrait');
      div.classList.add('unit-small');

      if(userId.search(/[0-9]+@N[0-9]+/) === -1){
        getUserId(userId, function(realUserId){
          userId = realUserId;
          setup();
        });
      }
      else{
        setup();
      }

      return {
        element: div,
        explode: function(){
          return explodeItems;
        }
      };
    }
  };

});
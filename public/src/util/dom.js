define({

  fragment: function(inputString, immediateSelector){
    var range = document.createRange(),

        // For particularly speedy loads, 'body' might not exist yet, so try to use 'head'
        container = document.body || document.head,
        fragment,
        child;

    range.selectNode(container);
    fragment = range.createContextualFragment(inputString);

    // If immediateSelector was specified, try to use it to find a child node of the fragment
    // and return it.
    if(immediateSelector){
      child = fragment.querySelector(immediateSelector);

      if (child) {
        // Opera appends children to the <body> in some cases, so the parentNode might not be `fragment` here.
        // So, remove it from whatever its attached to, since it was spawned right here.
        // Note: should be `fragment.removeChild( child );`
        child.parentNode.removeChild(child);
        return child;
      }
    }

    return fragment;
  }

});
(function(a){/**
   * Definition of IGCMS global object
   */a.IGCMS=new function(){var/**
     * Check if collection has element
     * @return {boolean} collection has element
     */a=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]==b)return!0;return!1};return{/**
       * Update existing Config properities by cfg properities
       * @param  {Object} Config updated object
       * @param  {Object} cfg    new object
       */initCfg:function(a,b){if("undefined"!=typeof b)for(var c in b)a.hasOwnProperty(c)&&(a[c]=b[c])},/**
       * Return element ancestor which match given selector or null if ancestor not exits
       * @param  {Node} elm      starting element
       * @param  {String}     selector standard DOM selector
       * @return {Node|null}
       */findParentBySelector:function(b,c){for(var d=document.querySelectorAll(c),e=b;e&&!a(d,e);)// keep going up until you find a match
e=e.parentNode;// go up
return e;// will return null if not found
},/**
       * Append new element style with given css
       * @param {String} css
       */appendStyle:function(a){var b=document.createElement("style");b.setAttribute("type","text/css"),b.styleSheet&&!b.sheet?b.styleSheet.cssText=a:b.appendChild(document.createTextNode(a)),document.getElementsByTagName("head")[0].appendChild(b)},/**
       * Escape string for use in regular expression
       * @param  {String} str       String to escape
       * @return {String}           Escaped string
       */preg_quote:function(a){return(a+"").replace(/[.\\+*?\[\^\]$(){}=!<>|:\-]/g,"\\$&")},/**
       * DOMContentLoaded polyfill
       * @param {function} callback
       */ready:function(a){"loading"===document.readyState?document.addEventListener?document.addEventListener("DOMContentLoaded",a):document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&a()}):a()}}}})(window);

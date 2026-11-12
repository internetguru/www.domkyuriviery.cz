Object.defineProperty&&Object.getOwnPropertyDescriptor&&Object.getOwnPropertyDescriptor(Element.prototype,"textContent")&&!Object.getOwnPropertyDescriptor(Element.prototype,"textContent").get&&function(){var a=Object.getOwnPropertyDescriptor(Element.prototype,"innerText");Object.defineProperty(Element.prototype,"textContent",{// It won't work if you just drop in innerText.get
// and innerText.set or the whole descriptor.
get:function get(){return a.get.call(this)},set:function set(b){return a.set.call(this,b)}})}();

Validate = function(){
  console.log('in');
  var forEach = Array.prototype.forEach;
  var empty = this.empty;
  forEach.call(document.getElementsByTagName('input'), function(input){
    if(input.hasAttribute('required')){
      input.onchange = function(){
        empty(input);
      };
    }
  });
};

Validate.prototype = {

  isEmpty: function(input){
    if(input.value=='' || input.value == null){
      console.log(this);
      //this.addError(input);
    }else{
      this.removeError(input);
    };

  }
, addError: function(input){
    input.className += ' error';
  }
, removeError: function(input){
    input.className = input.className.replace( /(?:^|\s)error(?!\S)/ , '' );
  }
}

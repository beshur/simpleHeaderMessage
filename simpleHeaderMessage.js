function simpleHeaderMessage(options) {
  var $this = this;
  this.options = options;
  this.animation_class = 'slideIn';
  this.object_class = 'header_fixed_message';

  if (localStorage) {
    this.storage = localStorage;
  }


  this.el = document.createElement('div');
  var description = this.el.appendChild(document.createElement('div'));
  description.innerHTML = options.html;
  this.el
    .classList.add(this.object_class, this.object_class + '--' + options.style);
  document.body.append(this.el);

  this.close = function(event) {
    $this.el.classList.remove($this.animation_class);

    if ($this.storage) {
      $this.storage.setItem($this.getStorageId() + ':closed', true);
    }
  };

  this.show = function() {
    $this.el
      .classList.add($this.animation_class);
  }

  this.getStorageId = function() {
    return [this.object_class, this.options.messageId].join('-');
  }

  this.wasClosed = function() {
    if (this.storage) {
      if (this.storage.getItem(this.getStorageId() + ':closed')) {
        return true;
      } else {
        return false;
      }
    }
    return undefined;
  }

  this.defaultAutoShow = function() {
    setTimeout($this.show, 1500);
  }

  // show
  this.autoShow = function() {
    if (!this.wasClosed()) {
      this.defaultAutoShow();
    }
  }

  // close btn
  var close_btn = document.createElement('span');
  close_btn.classList.add(this.object_class + '__close');
  this.el.appendChild(close_btn);
  close_btn.addEventListener('click', this.close);


  this.autoShow();
  return this;
};

/** test use
var n = new simpleHeaderMessage({
  messageId: '1708083_new_site',
  style: 'info',
  html: 'Наш новый сайт! <a href="http://new.svitzdorovya.com/" target="_blank">Нажмите здесь</a>'
});
*/

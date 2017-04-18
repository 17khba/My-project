(function (exports) {
  'use strict';

  var STORAGE_KEY = 'todos';

  exports.todoStorage = {
    fetch: function () {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    },
    save: function (todo) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todo));
    }
  };

})(window);
/*global $, window, document, ich */
if (window.location.hash) {
  window.location.href =
  window.location.protocol + '//' +
  window.location.host +
  (window.location.port ? ':' + window.location.port : '') +
  window.location.pathname;
}

$(document).bind('ready', function() {
  function render(data) {
    var categories, pages = '';

    $.each(data, function(key, val) {
      categories += ich.menu_item_tmpl({category: key}, true);

      var random_five = val.sort(function(){
        return Math.round(Math.random())-0.5;
      }).slice(0, 5);

      var words = [];
      $.each(random_five, function(key2, val2){
        words.push({
          word_key: key2,
          word: val2
        });
      });

      pages += ich.page_tmpl({category: key, words: words}, true);
    });

    $(categories).appendTo('#mainlist');
    $(pages).appendTo('body');
    $('#mainlist').listview('refresh');
  }

  var buzzwords = window.localStorage.getItem('buzzwords');

  if(buzzwords) {
    render(JSON.parse(buzzwords));
  }
  else {
    $.ajax({
      url: 'http://buzzwords.tladesignz.com/data.pl',
      dataType: 'jsonp',
      success: function(data) {
        window.localStorage.setItem('buzzwords', JSON.stringify(data));
        render(data);
      }
    });
  }

  $('input[type="checkbox"]').live('change', function(e){
    if ($('input[data-group=' + $(this).attr('data-group') + ']:checked').length === 5){
      // play sound on bingo - add your sound file 'music.mp3' to document root
      $('#soundContainer').get(0).play();
    }
  });
});

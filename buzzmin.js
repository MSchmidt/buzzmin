if (window.location.hash) {
  window.location.href =
  window.location.protocol +
  window.location.port + '//' +
  window.location.host +
  window.location.pathname;
}

$(document).bind("mobileinit", function(){
	$.ajax({
		url: 'http://buzzwords.tladesignz.com/data.pl',
		dataType: 'jsonp',
		success: function(data) {
			console.log('...');
			
			var items = [];
			
			$.each(data, function(key, val) {
				items.push('<li id="' + key + '"><a href="#detail-' + key + '">' + key + '</a></li>');

				var detail_page = '\
				<div data-role="page" data-theme="b" id="detail-' + key + '">\
      		<div data-role="header">\
      			<h1>' + val + '</h1>\
      		</div>\
      		<div data-role="content">\
      			<div data-role="fieldcontain">\
      			 	<fieldset data-role="controlgroup">';
        			 	$.each(val, function(key2, val2){
                  detail_page += '\
                  <input type="checkbox" name="checkbox-' + key2 +'" id="checkbox-' + key2 + '" />\
        					<label for="checkbox-' + key2 + '" data-theme="c">' + val2 + '</label>';
        				});
      			  detail_page += '</fieldset>\
      			</div>\
      		</div>\
      		<div data-role="footer">\
      			<h4>Page Footer</h4>\
      		</div>\
      	</div>';
      	$(detail_page).appendTo('body');
			});
			$(items.join('')).appendTo('#mainlist');
			$('#mainlist').listview('refresh');
		}
	});
});

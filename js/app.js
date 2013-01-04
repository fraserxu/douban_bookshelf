/********************
* Application
*********************/
App = Em.Application.create();

/********************
* Models
*********************/

App.Book = Em.Object.extend({
  book_avatar: null,
  book_author: null,
  book_title: null,
  book_summary: null,
  book_source: null,
  book_status: null
});

/********************
* Views
*********************/


/********************
* Controllers
*********************/

App.booksController = Em.ArrayController.create({
  content: [],
  loadBooks: function() {
    var me = this;
    var username = 'fraserxv';
    if ( username ) {
      var url = 'https://api.douban.com/v2/book/user/' + username + '/collections';
      $.ajax({
        url: url,
        context: this,
        dataType: 'jsonp',
        success: function(data){
          me.set('content',[]);
          data = data.collections;
          console.log(data);
          $(data).each(function(index,value){
            var t = App.Book.create({
                book_avatar: value.book.images.large,
                book_author: value.book.author[0],
                book_title: value.book.title,
                book_summary: value.comment,
                book_source: value.book.alt,
                book_status: value.status
            });
            me.pushObject(t);
          })
        }
      });
    }
  }
});

App.booksController.loadBooks();

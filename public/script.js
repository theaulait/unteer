// import Indeed from indeed-api-client

$(document).ready(function(){
const pub = 5690837704127357;
const api = 'http://api.indeed.com/ads/apisearch?publisher=';
var intern = 'internship';
var location = 'new york';
const necessary = '&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json';
var  $search = $('.form-control');
var $button = $('#btn-info');

// This is a library that interacts with the indeed api
// Indeed('http://api.indeed.com/ads/apisearch?publisher=', pub)
//       .jobSearch()
//       .query($search.val())
//       .location('New York, NY')
//       .sort('date')
//       .userAgent('Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
//       .done()
//       .then(function(data){
//           console.log(data);
//       })

// var doSearch = function(query){
//     $.ajax({
//       type: 'GET',
//       timeout: 5000,
//       dataType:'jsonp',
//       url: api + pub + '&q=' + query
//                + '&l=' + location + '&jt='
//                + intern + necessary
//     }).done(function(data){
//       console.log(data);
//     });
// }

  // $button.click(function(){
  //   var result = $search.val();
  //   console.log(result);
  //   $.post('/temp', {query : result});
  // });

  // $('#btn-info').click(function(e){
  //   e.preventDefault();
  //   searchData = $search.val();
  //   $.ajax({
  //     type: 'POST',
  //     timeout: 5000,
  //     url: '/search',
  //     data: { query: searchData}
  //   }).done(function(query){
  //     console.log('start here?')
  //     console.log(query);

  //   });

  // });






});

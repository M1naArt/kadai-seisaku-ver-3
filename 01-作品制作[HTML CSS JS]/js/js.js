//同じ数字を入力したら表示されるのが変わる
// 改ページボタンを消えるようにする
var clicknum = 1;
var back_page = $('#back_page');
var next_page = $('#next_page');
let pageCount = 0;
var a = $(".page1");


function  getHotels( pageValue){

  console.log(clicknum);
  var large_cd = 'japan',
      mid_cd = 'kagoshima',
      small_cd = 'kagoshima',
      hits = 10,
      page = 1;
  if( pageValue !== undefined ){
    page = pageValue;
  }
  // データを引っ張る
  $.ajax({
    url: 'https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?format=json&applicationId=1020173082905393111&largeClassCode=' + large_cd + '&middleClassCode=' + mid_cd + '&smallClassCode=' + small_cd + '&page=' + page +'&hits=' + hits , 
    type: 'post',
    dataType:'jsonp'
  })
  
  .done(function(response) {
    pageCount = response.pagingInfo.recordCount;
    let hotels = response.hotels;
    let contents = '';
    let i = 0;
    hotels.length;
    for( i; i<hotels.length; i++){
      let num1  = Math.floor(hotels[i].hotel[0].hotelBasicInfo.reviewAverage);
      let num2  = 5 - num1;
      /*店舗名～住所の表示*/
      contents +=
      '<div class="hotel_box"><ul><div class="aiu"><li><img src="' + hotels[i].hotel[0].hotelBasicInfo. hotelImageUrl + '"></li><div>'+
      '<li>' + hotels[i].hotel[0].hotelBasicInfo.hotelName + '</li>'+
      '<li>' + hotels[i].hotel[0].hotelBasicInfo.hotelKanaName + '</li>'+
      '<li>' + hotels[i].hotel[0].hotelBasicInfo.address2 + '</li><li><ul style="display:inline-flex;"><li>';
      /*レビューの表示*/
      for(let j = 0; j < num1; j++){
         contents +='<img src="../img/star2.png" alt="星（黄）" class="image1 image">';
      } 
      for(let k = 0; k < num2; k++){
        contents +='<img src="../img/star1.png" alt="星（灰）" class="image1 image">';
      }
      /*料金とリンクボタンの表示*/
      contents +=
      '</li></ul></li><li>' + hotels[i].hotel[0].hotelBasicInfo.telephoneNo + '</li></li>'+
      '</div><div class="hotel_child"><li><p>最安料金￥' + hotels[i].hotel[0].hotelBasicInfo.hotelMinCharge + '～</p>'+
      '<li><a href ="' + hotels[i].hotel[0].hotelBasicInfo.hotelInformationUrl + '"> 詳細情報へ</a></div></div></li></ul>';
      $('#list').append(contents);
      /*変数の中身を初期化*/
      contents  = "";
    }
  });
  if(clicknum === 1){
    back_page.toggleClass('display_none');
  }
  else{
    back_page.removeClass('display_none')
  }
};
getHotels();


// 次ページへ
$("#next_page").on('click', function(){ 
  $('.hotel_box').remove();
  back_page.removeClass('display_none');
  clicknum += 1;
  getHotels(clicknum);
  let max_page = Math.floor( pageCount / 10 + 1 );
  if(clicknum === max_page){
    next_page.toggleClass('display_none');
    $('#back_page').click(function() {
      next_page.removeClass('display_none');
    });
  }
});

//前ページへ
$("#back_page").on('click', function(){ 
  $('.hotel_box').remove();
  clicknum -= 1;
  getHotels(clicknum);
});

//--------------
// 番号のページへ
//--------------

function aaaaa(){
  // var page_nam  = $('#page_nam');
  let contents ="";
  let page = Math.floor( pageCount / 10  + 2 );
  
  // ページ数
  for(var i = 1; i < page; i++){
    contents += '<button  class = "page1" value = "' +i+' "> ' +i+'</button>';
    $('#page_nam').append(contents);
    contents  = "";
  }
  
  //ページングの番号を押したとき
  $(".page1").on('click', function(){ 
    clicknum = 2;
    var index = $('button.page1').index(this) + 1;
    clicknum = index;
    getHotels(clicknum);
    console.log(index);
    $('.hotel_box').remove();
    let max_page = Math.floor( pageCount / 10 + 1 );
    if(clicknum === max_page){
      next_page.toggleClass('display_none');
      $('#back_page').click(function() {
        next_page.removeClass('display_none');
      });
    }

  });  
}

//検索機能
$(function () {
  searchWord = function(){
    var searchText = $(this).val(), // 検索ボックスに入力された値
        targetText;

    $('.hotel_box ul').each(function() {
      targetText = $(this).text();

      // 検索対象となるリストに入力された文字列が存在するかどうかを判断
      if (targetText.indexOf(searchText) != -1) {
        $(this).removeClass('hidden');
      } else{
        $(this).addClass('hidden');
      }
    });
  };

  // searchWordの実行
  $('#search-text').on('input', searchWord);
});
/*$(function (){
  searchWord = function(){
    var searchResult,
    searchText =
$(this).val(), //検索ボックスに入力された値
    targetText,
    hitNum;
    //検索結果を格納するための配列を用意
    searchResult = [];
    //検索結果エリアの表示を空にする
    $('#search-result__list').empty();
    $('.search-result__hit-num').empty();

    // 検索ボックスに値が入ってる場合
    if (searchText != '') {
      $('.hotel_box li').each(function() {
        targetText = $(this).text();

        // 検索対象となるリストに入力された文字列が存在するかどうかを判断
        if (targetText.indexOf(searchText) != -1) {
          // 存在する場合はそのリストのテキストを用意した配列に格納
          searchResult.push(targetText);
          
        }
      });

      // 検索結果をページに出力
      for (var i = 0; i < searchResult.length; i ++) {
        $('<span>').text(searchResult[i]).appendTo('#search-result__list');
      }

      // ヒットの件数をページに出力
      hitNum = '<span>検索結果</span>：' + searchResult.length + '件見つかりました。';
      $('.search-result__hit-num').append(hitNum);
    }
  };

  // searchWordの実行
  $('#search-text').on('input', searchWord);
});
*/


// 前ページへを非表示

// if(clicknum === 1){
//   back_page.toggleClass('display_none');
// }



setTimeout("aaaaa()", 2000);






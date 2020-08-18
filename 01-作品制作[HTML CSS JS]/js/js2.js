// 表示させる件数total_hit_countを変える
//市別に表示させるようにする
var clicknum = 1;
var back_page = $('#back_page');
var next_page = $('#next_page');
var a = $(".page1");
let pageCount;
var ajax = new XMLHttpRequest();
ajax.open("get", "https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=a6ca5ebe6caee435e9c312d71da36e3f&pref=PREF46&hit_per_page=100&id");
ajax.responseType = 'json';
ajax.send();


$(function () {
const htmlList = document.querySelector("#list");
ajax.onload = function (e) {
    let array = e.target.response.rest;
    let hit_per_page = e.target.response.hit_per_page;
    let textcontent;
    let total_hit_count = 100;
    // let total_hit_count = e.target.response.total_hit_count;
    console.log(total_hit_count);
    for( let i = 0; i < 9; i++ ){
        textcontent =
        '<div class="hotel_box">' + '<img src ="' + array[i].image_url.shop_image1 + '">'+  
        '<ul><li>' + array[i].name + '</li>' + 
        '<li>' + array[i].name_kana + '</li>' + 
        '<li>' + array[i].address + '</li>' + '</ul>' + 
        '<div class = "hotel_child">' + '<p>予算￥'+array[i].budget +'～</p></div>'
        '<a href ="' + array[i].url + '"> 詳細情報へ</a></div></div>';
        console.log(textcontent)
        htmlList.innerHTML += textcontent;
    };
    
    back_page.toggleClass('display_none');
    let page =  Math.floor(total_hit_count/10 + 1);
    let page2 = Math.floor(total_hit_count/10);
    let contents = "";
        console.log(page);
        for(var i = 1; i < page; i++){
            contents += '<button  class = "page1" value = "' +i+' "> ' +i+'</button>';
            $('#page_nam').append(contents);
            contents  = "";
        }
        // クリックされた番号のページに移動
        $(".page1").on('click', function(){ 
            var index = $('button.page1').index(this) + 1;
            $('.hotel_box').remove();
            console.log(index);
            clicknum = index;
            let a = clicknum * 10;
            console.log(clicknum);
            for( let i = a - 9; i < a; i++ ){
                textcontent =
                '<div class="hotel_box">' + '<img src ="' + array[i].image_url.shop_image1 + '">'+  
                '<ul><li>' + array[i].name + '</li>' + 
                '<li>' + array[i].name_kana + '</li>' + 
                '<li>' + array[i].address + '</li>' + '</ul>' + 
                '<div class = "hotel_child">' + '<p>予算￥'+array[i].budget +'～</p></div>'
                '<a href ="' + array[i].url + '"> 詳細情報へ</a></div></div>';
                console.log(textcontent)
                htmlList.innerHTML += textcontent;
            };
             if(clicknum >= 1 && clicknum <= page2){
                 back_page.removeClass("display_none");
                 next_page.removeClass("display_none");
             }
        }); 
        
        // 次ページへ
        $("#next_page").on('click', function(){ 
            $('.hotel_box').remove();
            // back_page.removeClass('display_none');
            clicknum += 1;
            let a = clicknum * 10;
            console.log(clicknum);
            for( let i = a - 9; i < a; i++ ){
                textcontent =
                '<div class="hotel_box">' + '<img src ="' + array[i].image_url.shop_image1 + '">'+  
                '<ul><li>' + array[i].name + '</li>' + 
                '<li>' + array[i].name_kana + '</li>' + 
                '<li>' + array[i].address + '</li>' + '</ul>' + 
                '<div class = "hotel_child">' + '<p>予算￥'+array[i].budget +'～</p></div>'
                '<a href ="' + array[i].url + '"> 詳細情報へ</a></div></div>';
                console.log(textcontent)
                htmlList.innerHTML += textcontent;
            };
            if(clicknum === page2){
                next_page.toggleClass("display_none");  
            }
        });

        //前ページへ
        $("#back_page").on('click', function(){ 
            $('.hotel_box').remove();
            clicknum -= 1;
            console.log(clicknum);
            let a = clicknum * 10;
            console.log(clicknum);
            for( let i = a - 9; i < a; i++ ){
                textcontent =
                '<div class="hotel_box">' + '<img src ="' + array[i].image_url.shop_image1 + '">'+  
                '<ul><li>' + array[i].name + '</li>' + 
                '<li>' + array[i].name_kana + '</li>' + 
                '<li>' + array[i].address + '</li>' + '</ul>' + 
                '<div class = "hotel_child">' + '<p>予算￥'+array[i].budget +'～</p></div>'
                '<a href ="' + array[i].url + '"> 詳細情報へ</a></div></div>';
                console.log(textcontent)
                htmlList.innerHTML += textcontent;   
            };
            if(clicknum === 1){
                back_page.toggleClass("display_none");  
            }
        });
        $(".page1").eq(0).on('click', function(){
            back_page.addClass("display_none");
        });
        
        $(".page1").eq(-1).on('click', function(){
            next_page.addClass("display_none");
        });


    };
});
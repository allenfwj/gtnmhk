
import '../assets/font/iconfont.css'
import '../css/public.css'
import '../css/style.css'
import '../css/m_style.css'


//swiper
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
var swiper = new Swiper('.service.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.service.swiper-pagination',
        clickable: true,
      },
      navigation: {
        prevEl: '.swiper-left-button',
        nextEl: '.swiper-right-button',
      }
    });

var swiper = new Swiper('.company_news.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: '.company_news.swiper-pagination',
        clickable: true,
      },
      navigation: {
        prevEl: '.index-weblog-swiper-a1',
        nextEl: '.index-weblog-swiper-a2',
      }
    });

var swiper = new Swiper('.company_news-1.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      }
    });


var s="";
s=document.body.clientWidth;
if(s>=700){
	$(".index-wedo-left").find("img").css("opacity","0");
	$(".index-wedo-left").find("img").eq(0).css("opacity","10");
	$(".index-wedo-left-p").eq(0).find("p").css("color","#fe6321");
	$(".index-wedo-left-p").click(function(){
		$(".index-wedo-left").find("img").css("opacity","0");
		$(this).prev().css("opacity","10");
		$(".index-wedo-left-p p").css("color","#a09d9d");
		$(this).find("p").css("color","#fe6321");
	})
}

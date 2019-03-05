import '../css/public.css'
import '../css/style.css'
import '../css/m_style.css'
import '../assets/font/iconfont.css'
import '../css/bootstrap.min.css'
import '../css/j_style.css'
import 'swiper/dist/css/swiper.css';
// app.use(express.static(path.join(__dirname, 'dist')));



//导航下拉
$('.extra').mouseover(function(){
    $(this).addClass("nav-hover");
})
$('.extra').mouseout(function(){
    $(this).removeClass("nav-hover");
})



//给导航添加选中项
const _menuName='data-menuName';
const _dataValueArr = earlPublic.getAllValue(_menuName);//获取data-menuName的值
const htmlName=earlPublic.getHtmlDocName();//获取html名称
if(!htmlName){
    let _thisEle=document.querySelector('['+ _menuName + '='+ _dataValueArr[0] +']');
    _thisEle.classList.add('selected');
}
const ele=document.querySelector('['+ _menuName +']')
for(let i=0; i<_dataValueArr.length; i++){
    if(htmlName==_dataValueArr[i]){
        let _thisEle=document.querySelector('['+ _menuName +'='+ htmlName +']');
        _thisEle.classList.add('selected');
    }
}
// 'product_detail','product_list'
function setOtherMenu(showName,setName){//详情页导航选中状态是父类
    if(htmlName==showName){
        let _thisEle=document.querySelector('['+ _menuName +'='+ setName +']');
        _thisEle.classList.add('selected'); 
    }else{
        return false;
    }
}

setOtherMenu('product_detail','product_list');
setOtherMenu('news_detail','news_list');


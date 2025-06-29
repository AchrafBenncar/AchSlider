const slides = [...document.querySelectorAll(".slide")] ;
const BtnDerections = [...document.querySelectorAll(".direction-btn")] ;
const slideData = {
  locked: false ,
  direction: 0 ,
  slideOutIndex : 0 ,
  slideInIndex : 0 ,
}
BtnDerections.forEach(btn => btn.addEventListener("click" , handleClick)) ;
function handleClick(e){
  if(slideData.locked) return ;
  slideData.locked = true ;
  getDirection(e.target) ;
  slideOut() ;
}
function getDirection(btn){
  slideData.direction = btn.classList.contains("right") ? 1 : -1 ;
  slideData.slideOutIndex = slides.findIndex(slide => slide.classList.contains("active")) ;
  if(slideData.direction + slideData.slideOutIndex < 0){
    slideData.slideInIndex = slides.length - 1 ;
  }else if(slideData.slideOutIndex + slideData.direction > slides.length - 1){
    slideData.slideInIndex = 0 ;
  }else{
    slideData.slideInIndex = slideData.slideOutIndex + slideData.direction ;
  }

}
function slideOut(){
  slideAnimation({
    el : slides[slideData.slideInIndex] ,
    props : {
      display: "flex" ,
      transform : `translateX(${slideData.direction > 0 ? "100%" : "-100%"})` ,
      opacity: 0 ,
    }
  }) ;
  slideAnimation({
    el: slides[slideData.slideOutIndex] ,
    props :{
      transition : "transform 0.4s cubic-bezier(0.74 , -0.34 , 1 , 1.19) , opacity 0.4s ease-out" ,
      transform: `translateX(${slideData.direction > 0 ? "-100%" : "100%"})` ,
      opacity: 0 ,
    }
  }) ;
  slides[slideData.slideOutIndex].addEventListener("transitionend" , slideIn) ;

}
function slideAnimation(obj){
  for(prop in obj.props){
    obj.el.style[prop] = obj.props[prop] ; 
  }
}
function slideIn(){
  slideAnimation({
    el: slides[slideData.slideInIndex] ,
    props : {
      transition : "transform 0.4s ease-out , opacity 0.6s ease-out" ,
      transform: "translateX(0%)",
      opacity: 1 ,
    }
  }) ;
  slides[slideData.slideOutIndex].classList.remove("active") ;
  slides[slideData.slideInIndex].classList.add("active") ;
  setTimeout(() => {
    slideData.locked = false ;
  } , 400)
}

new kursor({
  type: 1,
  color: "rgb(68,72,87)",
  removeDefaultCursor: true,

})
var loader = document.querySelector("#loader")
window.addEventListener("load", function () {
  loader.style.display = "none"
})


var swiper= document.querySelector(".swiper")
var drag =document.querySelector(".drag")
var swiperwrapper = document.querySelector(".swiper-wrapper")


swiper.addEventListener("mousemove",function(dets){
    drag.style.left=dets.x-150+"px";
    drag.style.top=dets.y-150+"px";
})

swiperwrapper.addEventListener("mousemove",function(){
    drag.style.scale=2;
})
swiperwrapper.addEventListener("mouseleave",function(){
    drag.style.scale= 0;
})
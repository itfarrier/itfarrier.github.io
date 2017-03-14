$(window).bind("scroll",function(e){
    myScroll();
});
 
function myScroll(){
    var scrolled = $(window).scrollTop();
    $("header .header").css("box-shadow: 0 0 1rem;");
}
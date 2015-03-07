function oScroll(options){
	this.wrapper=options.wrapper;
	this.scroller=this.wrapper.children[0];
	this.snap=options.snap;
	this.currPage=options.currPage||0;
	this.scrollerHeight=options.scrollerHeight;
	this.speed=options.speed||1000;
	this.ontransitionStart=options.ontransitionStart||function(){};
	this.init();
}
oScroll.prototype={
	constructor:oScroll,
	setWrapper:function(){
		this.wrapper.style.overflow="hidden";
	},
	setScroller:function(){
		this.setScrollHeight();
		var elemTop=this.snap[this.currPage].offsetTop;
		this.scroller.style.cssText="transition: all 0ms; -webkit-transition: transform 0ms; transform-origin: 0px 0px 0px; transform: translate(0px, -"+elemTop+"px) scale(1) translateZ(0px);-webkit-transform: translate(0px, -"+elemTop+"px) scale(1) translateZ(0px);-webkit-backface-visibility: hidden;backface-visibility: hidden;-webkit-perspective: 1000;perspective: 1000;"
	},
	setScrollHeight:function(){
        var wrapper=document.getElementById('wrapper'),
            lis=document.querySelectorAll('#scroller>section');
        if(this.scrollerHeight!==undefined){
            wrapper.style.height=this.scrollerHeight+"px";
            for(var i=0,len=lis.length;i<len;i++){
                lis[i].style.height=this.scrollerHeight+"px";
            }
        }
    },
	changeTransformV:function(num){
		this.scroller.style.transform="translate(0px, "+num+"px) scale(1) translateZ(0px)";
		this.scroller.style.webkitTransform="translate(0px, "+num+"px) scale(1) translateZ(0px)";
	},
	/*滚动到某个元素*/
	scrollToElement:function(index,msecond,direction){
		var elem=this.snap[index];
		var elemTop=elem.offsetTop,
			nowTop=parseInt(this.scroller.style.webkitTransform.match(/\-?[0-9]+/g)[1]),
			stepV=msecond===undefined?(nowTop+elemTop):(nowTop+elemTop)/msecond*10,
			stepTop=nowTop-stepV,
			timerV,
			that=this,
			isSlideUp=-nowTop<elemTop?true:false;
		this.ontransitionStart(this.currPage,this.snap[index+1],direction);
		timerV=setInterval(function(){
			that.changeTransformV(stepTop);
			that.wrapper.style.pointerEvents='none';
			if(-stepTop<=elemTop&&!isSlideUp||-stepTop>=elemTop&&isSlideUp){
				clearInterval(timerV);
				that.wrapper.style.pointerEvents='auto';
				that.changeTransformV(-elemTop);
                that.currPage=index;
			}
			stepTop-=stepV;
		},10);

	},
	/*向下滑切换*/
	slide:function(){
		var startX=0,startY=0,that=this,beforePage;
		this.wrapper.addEventListener('touchstart',function(e){
			var touch=e.targetTouches[0];
			startX=touch.pageX;
			startY=touch.pageY;
		},false);
		this.wrapper.addEventListener('touchmove',function(e){
			e.preventDefault();
		},false);
		this.wrapper.addEventListener('touchend',function(e){
			var touch=e.changedTouches[0];
			if(touch.pageY-startY>10&&that.currPage>0){
				that.scrollToElement(that.currPage-1,that.speed,"up");
			}else if(touch.pageY-startY<-10&&that.currPage<that.snap.length-1){
				that.scrollToElement(that.currPage+1,that.speed,"down");
			}
		},false);
	},
	/*兼容offsetTop*/
	offsetTop:function(elements ){ 
	    var top = elements.offsetTop; 
	    var parent = elements.offsetParent; 
	    while( parent != null ){ 
	      top += parent.offsetTop; 
	      parent = parent.offsetParent; 
	    }; 
	    return top; 
	},
	init:function(){
		this.setWrapper();
		this.setScroller();
		this.slide();
	}
}
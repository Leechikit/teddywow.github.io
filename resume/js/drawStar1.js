(function(){
	var SVG_NS = "http://www.w3.org/2000/svg";  
	var XLINK_NS = "http://www.w3.org/1999/xlink";  
	  
	var ATTR_MAP = {  
	    "className": "class",  
	    "svgHref": "href"  
	};  
	var NS_MAP = {  
	    "svgHref": XLINK_NS  
	}; 
	var w = document.documentElement.clientWidth,
		h = document.documentElement.clientHeight*getPartCount(),
		hh = h >= 300 ? h :300,
		svg = document.getElementById("starSvg"),
		starArr = [];
	function setSvg(){
		svg.style.width=w+"px";
		svg.style.height=hh+"px";
	}
	setSvg();

	for (var i = 0,len=10*getPartCount(); i <len ; i++) {
	    var starObj = {
	        x : Math.floor(svg.offsetWidth*Math.random()),
	        y : Math.floor(svg.offsetHeight*Math.random()),
	        angle : 360*Math.random()
	    }
	    starArr.push(starObj);
	};
	function getPartCount(){
	    var lis=document.querySelectorAll('#scroller>section');
	    return lis.length;
	}
	function makeSVG(tag, attributes){  
	    var elem = document.createElementNS(SVG_NS, tag);  
	    for (var attribute in attributes) {  
	        var name = (attribute in ATTR_MAP ? ATTR_MAP[attribute] : attribute);  
	        var value = attributes[attribute];  
	        if (attribute in NS_MAP)   
	            elem.setAttributeNS(NS_MAP[attribute], name, value);  
	        else   
	            elem.setAttribute(name, value);  
	    }  
	    return elem;  
	}  
	function drawStar(){
		for(var i=0,len=starArr.length;i<len;i++){
			var group=makeSVG("g",{transform:"translate("+starArr[i].x+","+starArr[i].y+") scale(0."+Math.round(Math.random()+3)+")"}),
				starItem=makeSVG("polygon",{points:"9,0 3,17 18,7 0,7 15,17",fill:"#fff"});
			group.appendChild(starItem);
			//group.appendChild(animate);
			svg.appendChild(group);
		}
	}
	svg.innerHTML="";
	drawStar();
})()
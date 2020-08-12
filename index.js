window.onload=function(){
    // 商品标签卡
    var bannerleftli = document.querySelectorAll(".caidanb")
    var bannercenterli = document.querySelectorAll(".bannercenter-list")

    for(let i=0;i<bannerleftli.length;i++){
        bannerleftli[i].onmouseover=function(){
            bannercenterli[i].style.display="block"
        }
        bannerleftli[i].onmouseout=function(){
            bannercenterli[i].style.display="none"
        }
    }

    // 自动轮播
    var win = document.getElementsByClassName("win")[0]
    var lists = document.querySelectorAll(".win li");
    var btnss = document.querySelectorAll(".win-btns li")
    
    num = 0;
    function move(){
        num++;
        if (num > lists.length - 1) {
            num = 0;
        }
        for (var i = 0; i < lists.length; i++) {
            lists[i].style.opacity = 0;
            lists[i].style.zIndex = 0;
        }
        animate(lists[num], {
            opacity: 1
        }, 300, Tween.Linear, function () {
            lists[num].style.zIndex = 1;
        })

        for(var i=0;i<btnss.length;i++){
            btnss[i].style.background="#fff"
        }
        btnss[num].style.background="#555"
    }
    var tt=setInterval(move, 3000);

    // 按钮轮播
    for(let i=0;i<btnss.length;i++){
        btnss[i].onclick=function(){
            num=i
            animate(lists[num],{
                opacity:1
            },300,Tween.Linear,function(){
                lists[num].style.zIndex = 1;
            })
            for(var j=0;j<btnss.length;j++){
            btnss[j].style.background="#fff"
        }
        btnss[num].style.background="#555"

        }
    }

    // 鼠标移入暂停轮播
    win.onmouseover=function(){
        clearInterval(tt);
    }

    win.onmouseout=function(){
        tt=setInterval(move,3000);
    }


    // 天猫超市切换标签卡
    var btns = document.querySelectorAll(".tmcs-item1in-head li")
    var cons = document.querySelectorAll(".tmcs-body-detail a")
    
    for (let i = 0; i < btns.length; i++) {
        btns[i].onmouseover= function () {
            for (var j = 0; j < cons.length; j++) {
                btns[j].style.color = "black";
                btns[j].style.background = "#fff"
                cons[j].style.opacity=0
            }
            btns[i].style.color = "#fff"
            btns[i].style.background = "#00B262"
            cons[i].style.opacity=1
        }
    }

    var index=0
    setInterval(function(){
        for (var i = 0; i < btns.length; i++) {
            
                btns[i].style.color = "black";
                btns[i].style.background = "#fff"
                cons[i].style.opacity=0
            }
            btns[index].style.color = "#fff"
            btns[index].style.background = "#00B262"
            cons[index].style.opacity=1
            if(index == btns.length - 1) {
                index = 0;
            } else {
                index++;
            }
            
    },2500)


	// 左侧活动跳转导航and顶部活动搜索框    


	var search=document.querySelector(".top-search")
	var nav=document.querySelector(".left-nav")
	nav.style.top=(document.documentElement.clientHeight-nav.offsetHeight)/2+"px"

	// 滚动事件
	window.onscroll=function(){
		// 搜索框
		var st=document.documentElement.scrollTop
		if(st>200){
			search.style.top=0
		}else{
			search.style.top="-50px"
		}
		if(st>400){
			nav.style.transform="scale(1,1)"
			nav.style.opacity=1
		}else{
			nav.style.transform="scale(0,0)"
			nav.style.opacity=0
		}

		for(var i=0;i<navList.length;i++){

			if(navList[i].top<st&&navList[i].top+navList[i].height>st){
				for(var j=0;j<navList.length;j++){
					navList[j].style.background="rgba(0,0,0,.8)"
				}
				navList[i].style.background=navList[i].getAttribute("color")
			}
		}

		// 按需加载图片
		for(var i=0;i<navList.length;i++){
                if(navList[i].top-document.documentElement.clientHeight-100<st){
                    if(!navList[i].flag){
                        var imgs = conList[i].querySelectorAll("img")

                        for(var j=0;j<imgs.length;j++){
                            imgs[j].src=imgs[j].getAttribute("attr")
                        }
                        navList[i].flag=true
                    }
                }
            }
	}
		
	
	// 侧边栏点击转到操作

	// 点击的时候滚动条要去的位置
	var navList=document.querySelectorAll(".left-nav li:not(.back-top)")
	var navLast=document.querySelectorAll(".back-top")[0]

	var conList=document.getElementsByName("mao")


	navLast.onclick=function(){
		animate(document.documentElement,{
				scrollTop:0
			},500)
	}

	for(var i=0;i<navList.length;i++){
		// 首先获取每一个楼层所在的位置
		navList[i].top=conList[i].offsetTop
		navList[i].height=conList[i].offsetHeight

		navList[i].onclick=function(){
			animate(document.documentElement,{
				scrollTop:this.top
			},500)
		}

	}
	
}
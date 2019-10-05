

//2016.10.21  1.通过类名获取的兼容函数


function getClass(classname,father){
        father=father||document;
       /*if(father==undefined){
              father=document;
       }else{
              father=father;
       }*/
       //如果father没有传参数时，默认值为document，如果father传参数了，就按你传入发范围去找元素     原理：或运算
	if(father.getElementsByClassName){
       return father.getElementsByClassName(classname)
	}else{
       var all=father.getElementsByTagName("*");
       var newarr=[];
       for(var i=0;i<all.length;i++){
       	if(check(all[i].className,classname)){
       		newarr.push(all[i]);
       	}
       }
       return newarr;
	}
	
}
function check(str,leiming){
       for(var i=0;i<str.length;i++){
              var aa=str.split(" ");
              if(aa[i]==leiming){
                     return true;
              }
       }
       return false;
}



//2016.10.24  2.获取样式的兼容函数
/*obj：获取哪一个对象
  attr:属性，用[]*/

function getStyle(obj,attr){
   if(obj.currentStyle){
       return parseInt(obj.currentStyle[attr]);
   }else{
       return parseInt(getComputedStyle(obj,null)[attr]);
   }
}




//2016.10.24   3.获取元素
//与字符串匹配 /^[a-zA-Z][a-zA-Z1-6]*$/.test(selector)
function $(selector,father){
       father=father||document;
       if(typeof selector=="string"){
              selector=selector.replace(/^\s*|\s*$/,"");//  //用来定界   ^$定开始结束的位置   \s空格   *多个   |中间的字符串
              if(selector.charAt(0)=="."){
              return getClass(selector.substring(1),father);
              }else if(selector.charAt(0)=="#"){
              return document.getElementById(selector.substring(1));
              //id的范围只能是document，不能缩小检测范围
              }else if(/^[a-zA-Z][a-zA-Z1-6]*$/.test(selector)){
              return father.getElementsByTagName(selector);
              }else if(/^<[a-zA-Z][a-zA-Z1-6]*>$/.test(selector)){
                selector=selector.slice(1,-1);
                return document.createElement(selector);}
       }else if(typeof selector=="function"){
              window.onload=function(){
                   selector();
              }
       }
}






//2016.10.25   4.获取所有子节点的兼容函数（只有元素节点）
function getChilds(father){
  var childs=father.childNodes;
  var newarr=[];
  for (var i = 0; i < childs.length; i++) {
    if(childs[i].nodeType==1){
    newarr.push(childs[i]);
    }
  };
  return newarr;
}






//2016.10.25   5.获取第一个子节点

function getFirst(father){
  return getChilds(father)[0];
}




//2016.10.25   6.获取第一个子节点

function getLast(father){
  return getChilds(father)[getChilds(father).length-1];
}



//2016.10.25   7.获取第一个子节点

function getNum(father,num){
  return getChilds(father)[num];
}




//2016.10.25   8.获取下一个兄弟节点
function getNext(nodeObj){
  var next=nodeObj.nextSibling;
  if (next==null){
    return false;
  }//检测是不是不存在
  while(next.nodeType==3||next.nodeType==8){
    next=next.nextSibling;
    if (next==null){
    return false;
  }
  }
  return next;
}



//2016.10.25   9.获取上一个兄弟节点
function getPrevious(nodeObj){
  var previous=nodeObj.previousSibling;
  if (previous==null){
    return false;
  }
  while(previous.nodeType==3||previous.nodeType==8){
    previous=previous.previousSibling;
    if (previous==null){
    return false;
  }
  }
  return previous;
}





//2016.10.25    10.将一个元素插入到另一个元素之后
function insertAfter(father,newobj,nowobj){
  var next=getNext(nowobj);
  // var father=nowobj.parentNode;
  if(next){
    father.insertBefore(newobj,next);
  }else{
    father.appendChild(newobj);
  }
}



//2016.10.27    11.insetBefore
function insertBefore(newobj,nowobj){
  var parent=nowobj.parentNode;
  parent.insertBefore(newobj,nowobj);
}




//2016.11.4     12.添加事件
function addEvent(obj,event,fun){
  if(obj.addEventListener){
    obj.addEventListener(event,fun,false);
  }else{
    obj.attachEvent("on"+event,fun);
  }
}


//2016.11.4    13.移除事件
function removeEvent(obj,event,fun){
  if(obj.removeEventListener){
    obj.removeEventListener(event,fun,false);
  }else{
    obj.detachEvent("on"+event,fun);
  }
}




//2016.11.7     14.鼠标滚轮事件
function mouseScroll(obj,up,down){
    if(obj.addEventListener){
      obj.addEventListener("mousewheel",scroll,false);
      obj.addEventListener("DOMMouseScroll",scroll,false);
    }else{
      obj.attachEvent("onmousewheel",scroll);
    }
    function scroll(e){
      var ev=e||window.event;
      if(ev.preventDefault){
        ev.preventDefault();
      }else{
        ev.returnValue=false;
      }
      var direction=ev.wheelDefault||ev.detail;
      if(direction==120||direction==-3){
        up.call(obj);
      }
      if(direction==-120||direction==3){
        down.call(obj);
      }
    }
}







//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }


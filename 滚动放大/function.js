function getClass(classname,father) {
	father=father||document
	//如果father没有传参时，默认值为document
    //如果father传了参数，就按你传入的范围去找元素。
	if (father.getElementsByClassName) {//alert("现代")		
		return father.getElementsByClassName(classname);
	}else{//alert("ie8")   
        var all=father.getElementsByTagName("*");
        var newarr=[]
        for (var i = 0; i < all.length; i++) {
        	if(checkRep(all[i].className,classname)){
        		newarr.push(all[i])
        	}
        }return newarr;
    }
}
function checkRep(str,classname){
	var aa=str.split(" ")
	for (var i = 0; i < aa.length; i++) {		
		if (aa[i]==classname) {return true
		}
	}return false;
}
function getClass(classname,father){
  father=father||document//如果father没有传参时，默认值为document;如果father
  if(father.getElementsByClassName){
    return father.getElementsByClassName(classname);
  }else{
      var all=father.getElementsByTagName("*");
      var newarr=[]
    for(var i=0;i<all.length;i++){
      if(checkRep(all[i].className,classname)){
       newarr.push(all[i]);
      }
     }
    return newarr;
  }
}
function checkRep(str,classname){
  var arr=str.split(" ")
  for(var i=0;i<arr.length;i++){
    if(arr[i]==classname){
      return true;//多个类名只要有一个是满足，就停止匹配，并返回真
    }
  }
  return false;//多个类都匹配完成后，没有满足的类名时，返回假
}



// 2016.10.24
// 获取样式的函数 
// obj:获取那一个对象
// alert：属性
    function getStyle(obj,attr){
    if(obj.currentStyle){
    return  parseInt(obj.currentStyle[attr]);
    }else{
      return  parseInt(getComputedStyle(obj,null)[attr]);
    }
  }


// **************************************************************************
// 2016.10.24  获取元素

function $(selector,father){
      father=father||document;
      if(typeof selector=="string"){
        selector=selector.replace(/^\s*|\s*$/,"");
        if(selector.charAt(0)=="."){
        return  getClass(selector.slice(1));
        }else if(selector.charAt(0)=="#"){
          return document.getElementById(selector.slice(1));
        }else if(/^[a-zA-Z][a-zA-Z1-6]*$/.test(selector)){
           return father.getElementsByTagName(selector);
      }
    }else if(typeof selector=="function"){
      window.onload=function(){
        selector();
      }
    }
}


// **************************************************************************************************
// 节点个数
function getChilds(father){
  var childs=father.childNodes;
  var newarr=[];
  for(var i=0;i<childs.length;i++){
    if(childs[i].nodeType==1){
      newarr.push(childs[i]);
    }
  }
  return newarr;
}



// ******************************************************************************
// 获取第一个子节点

function getFirst(father){
  return  getChilds(father)[0];
}
// 获取最后一个子节点
function getLast(father){
  return getChilds(father)[getChilds(father).length-1];
}

//获取指定位置的节点
function getNum(father,num){
  return getChilds(father)[num];
}


// ************************************************************
//获取下一个兄弟节点

function getNext(nodeObj){
  var next=nodeObj.nextSibling;
  if(next==null){
     return  false
  }
  while(next.nodeType==3||next.nodeType==8){
      next=next.nextSibling;
      if(next==null){
       return  false
       }
  }
  return   next;
}


//获取上一个兄弟节点
function getup(nodeObj){
  var previous=nodeObj.previousSibling;
  if(previous==null){
     return  false
  }
  while(previous.nodeType==3||previous.nodeType==8){
      previous=previous.previousSibling;
      if(previous==null){
       return  false
       }
  }
  return   previous;
}


//**********************************************
//10 将一个元素插入到另一个元素之后
  function insertAfter(father,newObj,nowObj){
    var next=getNext(nowObj);
    if(next){
   father.insertBefore(newObj,next);
    }else{
      father.appendChild(newObj);
    }
  }
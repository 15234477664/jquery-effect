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
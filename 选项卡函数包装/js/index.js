//选项卡函数包装
window.onload=function(){
  function tab(num){
  var titlebox=getClass("title")[num];
  var title=titlebox.getElementsByTagName("li");
  var sanjiao=titlebox.getElementsByTagName("span");
  var neibox=getClass("neibox")[num];
  var nei=neibox.getElementsByTagName("li");
    for(var i=0;i<title.length;i++){
      title[i].aa=i
      title[i].onmouseover=function(){
      for(var j=0;j<title.length;j++){
          title[j].style.borderBottom="5px solid black";//原始状态
          sanjiao[j].style.display="none";//原始状态
          nei[j].style.display="none";//原始状态
          title[j].style.fontWeight="normal";
      }
      title[this.aa].style.borderBottom="5px solid #e5004f";//移入效果
      sanjiao[this.aa].style.display="block"//移入效果
      nei[this.aa].style.display="block"//移入效果
      title[this.aa].style.fontWeight="bold";
      }
    }
  }
 for (var i = 0; i < 4; i++) {
   tab(i)
 };
}

// popUpdate
function PopUp(obj){
	this.dom = {
		title:"<h3></h3>",
		idDom:"<div class='p_clear'><span class='p_left'>ID：</span><span id='itemid'></span></div>",
		statusDom:"<div class='p_clear'><span class='p_left'>Status：</span><div id='status'><span></span><input type='hidden' name='status' id='statusVal' value=''><ul></ul></div></div>",
		uploadDom:"<div class='p_clear'><span class='p_left'>upload：</span><input type='file' name='mp3' id='m_upload' runat='server' enctype='multipart/form-data' accept='audio/*' style='width:240px;overflow:hidden;'></div>",
		btns:"<div class='popbtns p_clear'><span class='p_left'>&nbsp;</span><input value='确认' id='popYes' class='popYes' type='button' disabled='disabled'><input value='取消' id='popNo' type='button' onclick=popupEdit.clearMask();></div>",
		progress:"<div id='parent'><div id='son'></div></div>",
		setIndex:"<div class='p_clear'><span class='p_left'>side：</span><input type='text' id='m_side' onkeyup=\"this.value=this.value.replace(/[^0-9]/g,'')\" onafterpaste=\"this.value=this.value.replace(/[^0-9]/g,'')\"></div><div class='p_clear'><span class='p_left'>track：</span><input type='text' id='m_track' onkeyup=\"this.value=this.value.replace(/[^0-9]/g,'')\" onafterpaste=\"this.value=this.value.replace(/[^0-9]/g,'')\"></div>"

	};
	this.mask = document.createElement("div");
	this.selectId = document.getElementById(obj.selectId);
	this.selectId1 = obj.selectId;
	this.id = obj.id;
	this.domArray = obj.domArray;
}
PopUp.prototype = {
	init:function(){
		this.popUpShow();
	},
	popUpShow:function(){
		var self = this,html="";
		for(var i=0;i<this.domArray.length;i++){
			for(var k in this.dom){
				if(this.domArray[i]==k){
					html+=this.dom[k];
				}
			}
		}
		this.selectId.innerHTML = html;
		document.getElementById("itemid").innerHTML = this.id;
		$("#"+this.selectId1).addClass('musicEditShow');
		this.mask.className = "maskLayer";
		$(document.body).append(this.mask);
	},
	clearMask:function(){
		$("#"+this.selectId1).removeClass('musicEditShow');
		$(this.mask).remove();
	}
}
// popUpdate end
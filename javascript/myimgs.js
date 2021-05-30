let imgs=[]

let imgc
/*
imgc={id:  ,src:  }
imgs.push(imgc)
*/


let div=document.getElementById('imgs')
for(let i of imgs){
    
    let img = new Image()
	img.onload = function(){
	}
	img.src=i.src
    img.id=i.id
    img.style.display='none'
    div.appendChild(img)
    
    
}
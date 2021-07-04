const canvas=document.getElementById('mycanvas');
const ctx=canvas.getContext('2d');
let ww=1000
let wh=700
mysize()

mx=ww/2
my=wh/2
let fps=100


//全域變數
function init(){
	//event
	window.addEventListener('keydown',keydown)
	window.addEventListener('resize',mysize)
}
function update(){

}
function draw(){
	
	background('black')
	requestAnimationFrame(draw)
}
setInterval(update,1000/fps)
requestAnimationFrame(draw)


//event function
function keydown(e){
	keyid=e.code
	
}
function mysize(){
	if(window.innerHeight/window.innerWidth>=wh/ww){
		canvas.style.width=window.innerWidth+'px'
		canvas.style.height=wh*window.innerWidth/ww+'px'
		canvas.width=window.innerWidth
		canvas.height=wh*window.innerWidth/ww
	}else{
		canvas.style.width=ww*window.innerHeight/wh+'px'
		canvas.style.height=window.innerHeight+'px'
		canvas.width=ww*window.innerHeight/wh
		canvas.height=window.innerHeight
	}
	ctx.restore()
	ctx.save()
	if(window.innerHeight/window.innerWidth>=wh/ww){
		ctx.scale(window.innerWidth/ww,window.innerWidth/ww)
	}else{
		ctx.scale(window.innerHeight/wh,window.innerHeight/wh)
	}
	
}

init()



















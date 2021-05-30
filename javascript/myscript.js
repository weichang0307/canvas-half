const canvas=document.getElementById('mycanvas');
const ctx=canvas.getContext('2d');
ww=window.innerWidth
wh=window.innerHeight
canvas.width=ww
canvas.height=wh
mx=ww/2
my=wh/2
let fps=100


//全域變數
function init(){
	//event
	window.addEventListener('keydown',keydown)
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

init()



















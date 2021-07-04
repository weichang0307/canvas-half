class imgobj{
	constructor(px,py){
		this.position={x:px,y:py}
		this.rotation=0
		this.scale={x:1,y:1}
		this.through=1
		this.visible=true
		this.style=0
		this.styles=[]
		this.group=[]
	}
	draw(){
		if(this.visible){
			ctx.save()
			ctx.translate(this.position.x,this.position.y)
			ctx.rotate(this.rotation)
			ctx.scale(this.scale.x,this.scale.y)
			ctx.globalAlpha=this.through
			ctx.drawImage(this.styles[this.style].img,-this.styles[this.style].middle.x,-this.styles[this.style].middle.y)
			ctx.globalAlpha=1.0
			ctx.restore()
			
		}
	}
	ispointinpath(x,y){
		ctx.save()
		ctx.translate(this.position.x,this.position.y)
		ctx.rotate(this.rotation)
		ctx.scale(this.scale.x,this.scale.y)
		ctx.beginPath()
		for(let i=0;i<this.styles[this.style].path.length;i++){
			if(i===0){
				ctx.moveTo(this.styles[this.style].path[i].x,this.styles[this.style].path[i].y)
			}else{
				ctx.lineTo(this.styles[this.style].path[i].x,this.styles[this.style].path[i].y)
			}
		}
		ctx.closePath()
		ctx.restore()
		return ctx.isPointInPath(x,y)
		
	}
	addstyle(src,middle,path){
		let img=new Image()
		img.src=src 
		this.styles.push({method:'img',img:img,middle:middle,path:path})
	}
}







//格線
function grid(color='black',width=0.2,interval=10){
	let ww=window.innerWidth
	let wh=window.innerHeight
	ctx.lineWidth=width
	ctx.strokeStyle=color
	for (var i=interval;i<ww;i+=interval) {
		ctx.beginPath()
		ctx.moveTo(i,0)
		ctx.lineTo(i,wh)		
		ctx.stroke()
	}
	for (var i=interval;i<ww;i+=interval) {
		ctx.beginPath()
		ctx.moveTo(0,i)
		ctx.lineTo(ww,i)		
		ctx.stroke()
	}
}




//背景
function background(color){
	ctx.save()
	ctx.fillStyle=color
	ctx.fillRect(0,0,ww,wh)
	ctx.restore()
}

//群組
class Group{
	constructor(aa){
		let all_members=[]
		let element={
			position:{x:0,y:0},
			scale:{x:1,y:1},
			deg:0,
			visible:true,
			members_count:0,
			members:all_members
			
		}
		Object.assign(element,aa)
		Object.assign(this,element)
	}
	add(object_){
		this.members.push(object_)
		object_.group.push(this)
		this.members_count+=1
	}
	draw(){
		if(this.visible===false){
			return
		}
		for(let i=0;i<this.members_count;i++){
			ctx.save()
			ctx.translate(this.position.x,this.position.y)
			ctx.rotate(this.deg)
			ctx.scale(this.scale.x,this.scale.y)
			this.members[i].draw()
			ctx.restore()
			
	
		}
	}
	ispointinpath(x,y){
		if(this.visible===false){
			return false
		}
		for(let i=0;i<this.members_count;i++){
			
			if(this.members[i].ispointinpath(x,y)){
				return true
			}
			
		}
		return false

	}
}






























//drawer
function drawer(array,globel_through){
	for (var i=0;i<array.length;i++) {
		if(array[i].type==='rect'){
			ctx.globalAlpha=(100-array[i].through)/100*globel_through
			ctx.save()
			ctx.translate(array[i].translate.x,array[i].translate.y)
			ctx.rotate(array[i].deg)
			ctx.scale(array[i].scale.x,array[i].scale.y)
			if(array[i].stroke.is===true){
				ctx.lineWidth=array[i].stroke.width
				ctx.strokeStyle=array[i].stroke.color
				ctx.strokeRect(array[i].topleft.x,array[i].topleft.y,array[i].rightbottom.x-array[i].topleft.x,array[i].rightbottom.y-array[i].topleft.y)
			}
			if(array[i].fill.is===true){
				ctx.fillStyle=array[i].fill.color
				ctx.fillRect(array[i].topleft.x,array[i].topleft.y,array[i].rightbottom.x-array[i].topleft.x,array[i].rightbottom.y-array[i].topleft.y)
			}
			
			ctx.restore()
			ctx.globalAlpha=1.0
		}else if(array[i].type==='circle'){
			ctx.globalAlpha=(100-array[i].through)/100*globel_through
			ctx.save()
			ctx.translate(array[i].translate.x,array[i].translate.y)
			ctx.rotate(array[i].deg)
			ctx.scale(array[i].scale.x,array[i].scale.y)
			ctx.beginPath()
			ctx.arc(array[i].position.x,array[i].position.y,array[i].rr,array[i].startdeg,array[i].enddeg)
			if(array[i].isclose){
				ctx.closePath()
			}
			if(array[i].isrr){
				ctx.lineTo(array[i].position.x,array[i].position.y)
				ctx.closePath()
			}
			if(array[i].stroke.is===true){
				ctx.lineWidth=array[i].stroke.width
				ctx.strokeStyle=array[i].stroke.color
				ctx.stroke()
			}
			if(array[i].fill.is===true){
				ctx.fillStyle=array[i].fill.color
				ctx.fill()
			}
			
			ctx.restore()
			ctx.globalAlpha=1.0
		}else if(array[i].type==='line'){
			ctx.globalAlpha=(100-array[i].through)/100*globel_through
			ctx.save()
			ctx.translate(array[i].translate.x,array[i].translate.y)
			ctx.rotate(array[i].deg)
			ctx.scale(array[i].scale.x,array[i].scale.y)
			for(let y=0;y<array[i].pointarray.length;y++){
				let px=array[i].pointarray[y][0]
				let py=array[i].pointarray[y][1]
				if(y===0){
					ctx.beginPath()
					ctx.moveTo(px,py)
				}else{
					ctx.lineTo(px,py)
				}
			}
			if(array[i].isclose){
				ctx.closePath()
			}
			if(array[i].stroke.is===true){
				ctx.lineWidth=array[i].stroke.width
				ctx.strokeStyle=array[i].stroke.color
				ctx.stroke()
			}
			if(array[i].fill.is===true){
				ctx.fillStyle=array[i].fill.color
				ctx.fill()
			}
			
			ctx.restore()
			ctx.globalAlpha=1.0
		

		}
	}
}
//get path
function ispointinarraypath(x,y,array){
	let is=false
	for (var i=0;i<array.length;i++) {
		if(array[i].type==='rect'){
			ctx.save()
				ctx.translate(array[i].translate.x,array[i].translate.y)
				ctx.rotate(array[i].deg)
				ctx.scale(array[i].scale.x,array[i].scale.y)
				ctx.beginPath()
				ctx.rect(array[i].topleft.x,array[i].topleft.y,array[i].rightbottom.x-array[i].topleft.x,array[i].rightbottom.y-array[i].topleft.y)			
			ctx.restore()
			if(ctx.isPointInPath(x,y)){
				is=true
			}
			

		}else if(array[i].type==='circle'){
			ctx.save()
				ctx.translate(array[i].translate.x,array[i].translate.y)
				ctx.rotate(array[i].deg)
				ctx.scale(array[i].scale.x,array[i].scale.y)
				ctx.beginPath()
				ctx.arc(array[i].position.x,array[i].position.y,array[i].rr,array[i].startdeg,array[i].enddeg)
				if(array[i].isclose){
					ctx.closePath()
				}
				if(array[i].isrr){
					ctx.lineTo(array[i].position.x,array[i].position.y)
					ctx.closePath()
				}
			ctx.restore()
			if(ctx.isPointInPath(x,y)){
				is=true
			}
		}else if(array[i].type==='line'){
			ctx.save()
				ctx.translate(array[i].translate.x,array[i].translate.y)
				ctx.rotate(array[i].deg)
				ctx.scale(array[i].scale.x,array[i].scale.y)
				for(let y=0;y<array[i].pointarray.length;y++){
					let px=array[i].pointarray[y][0]
					let py=array[i].pointarray[y][1]
					if(y===0){
						ctx.beginPath()
						ctx.moveTo(px,py)
					}else{
						ctx.lineTo(px,py)
					}
				}
				if(array[i].isclose){
					ctx.closePath()
				}
			ctx.restore()
			if(ctx.isPointInPath(x,y)){
				is=true
			}
		}
	}
	ctx.restore()
	return is
}
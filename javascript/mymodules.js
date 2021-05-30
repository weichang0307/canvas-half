function drawexcept(img,x,y,color){
	let currentdata=ctx.getImageData(0,0,img.width,img.height)
	ctx.drawImage(img,0,0)
	let imgdata=ctx.getImageData(0,0,img.width,img.height)
	console.log(imgdata.data)
	for(let i=3;i<imgdata.data.length;i+=4){
		if(color==='rgb('+imgdata.data[i-3]+','+imgdata.data[i-2]+','+imgdata.data[i-1]+')'){
			imgdata.data[i]=0
		}
	}
	ctx.putImageData(currentdata,0,0)
	ctx.putImageData(imgdata,x,y)
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



//背景
function background(color){
	ctx.save()
	ctx.fillStyle=color
	ctx.fillRect(0,0,ww,wh)
	ctx.restore()
}
//矩形
class Rect{
	constructor(aa){
		let element={
			groupId:'none',
			position:{x:0,y:0},
			size:{x:50,y:50},
			deg:0,
			visible:true,
			color:{fill:'red',stroke:'black'},
			fill:true,		
			stroke:false,
			strokewidth:10
			

				
		}
		this.group=[]

		Object.assign(element,aa)
		Object.assign(this,element)
	}
	draw(){
		if(this.visible===false){
			return
		}
		ctx.save()
		ctx.beginPath()
		ctx.translate(this.position.x,this.position.y)
		ctx.rotate(this.deg)
		
		ctx.rect(-this.size.x/2,-this.size.y/2,this.size.x,this.size.y)
		
		if(this.stroke){
			ctx.lineWidth=this.strokewidth
			ctx.strokeStyle=this.color.stroke
			ctx.stroke()
		}
		if(this.fill){
			ctx.fillStyle=this.color.fill
			ctx.fill()
		}
		ctx.restore()
	}
	updatepath(clearpath=true){
		if(clearpath){
			this.path=new Path2D()
		}
		ctx.save()
		for(let i=this.group.length-1;i>=0;i--){
			ctx.translate(this.group[i].position.x,this.group[i].position.y)
			ctx.rotate(this.group[i].deg)
			ctx.scale(this.group[i].scale.x,this.group[i].scale.y)
		}
		ctx.beginPath()
		ctx.translate(this.position.x,this.position.y)
		ctx.rotate(this.deg)

		ctx.rect(-this.size.x/2,-this.size.y/2,this.size.x,this.size.y)		
		ctx.restore()
	}

	ispointinpath(x,y){
		if(this.visible===false){
			return false
		}
		this.updatepath()
		
		return ctx.isPointInPath(x,y)
	}

}
//圓形
class Circle{
	constructor(aa){
		let element={
			groupId:'none',
			position:{x:0,y:0},
			rr:25,
			deg:0,
			visible:true,
			color:{fill:'red',stroke:'black'},
			fill:true,		
			stroke:false,
			strokewidth:10,
						
		}
		this.group=[]
		Object.assign(element,aa)
		Object.assign(this,element)
	}
	draw(){
		if(this.visible===false){
			return
		}

		ctx.save()
		ctx.beginPath()
		ctx.translate(this.position.x,this.position.y)
		ctx.rotate(this.deg)
		
		ctx.arc(0,0,this.rr,0,Math.PI*2)
		ctx.closePath()
		if(this.stroke){
			ctx.lineWidth=this.strokewidth
			ctx.strokeStyle=this.color.stroke
			ctx.stroke()
		}
		if(this.fill){
			ctx.fillStyle=this.color.fill
			ctx.fill()
		}
		ctx.restore()
		
	}
	updatepath(clearpath=true){
		if(clearpath){
			this.path=new Path2D()
		}
		ctx.save()
		for(let i=this.group.length-1;i>=0;i--){
			ctx.translate(this.group[i].position.x,this.group[i].position.y)
			ctx.rotate(this.group[i].deg)
			ctx.scale(this.group[i].scale.x,this.group[i].scale.y)
		}
		ctx.translate(this.position.x,this.position.y)
		ctx.rotate(this.deg)
		ctx.beginPath()
		ctx.arc(0,0,this.rr,0,Math.PI*2)
		ctx.closePath()
		ctx.restore()
	}
	ispointinpath(x,y){
		if(this.visible===false){
			return false
		}
		this.updatepath()
		return ctx.isPointInPath(x,y)
	}
	


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


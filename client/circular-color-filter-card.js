class CircularCard {
    constructor(src,color,w,h) {
        this.src = src
        this.img = document.createElement('img')
        document.body.appendChild(this.img)
        this.w = w
        this.h = h
        this.colorFilter = new ColorFilter(color,w,h,()=>{
            clearInterval(this.interval)
        })
    }
    render() {
        const r = Math.min(this.w,this.h)/3
        this.context.clearRect(0,0,this.w,this.h)
        this.context.fillStyle = 'white'
        this.context.fillRect(0,0,this.w,this.h)
        this.context.save()
        this.context.beginPath()
        this.context.arc(this.w/2,this.h/2,r,0,2*Math.PI)
        this.context.clipPath()
        this.context.drawImage(this.image,0,0,this.w,this.h)
        this.context.restore()
        this.colorFilter.draw(context)
        this.img.src = this.canvas.toDataURL()
    }
    create() {
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.w
        this.canvas.height = this.h
        this.context = this.canvas.getContext('2d')
        this.image = new Image()
        this.img.onmousedown = () =>{
            this.colorFilter.startMoving()
            this.interval = setInterval(()=>{
                this.render()
            },100)
        }
        this.image.onload = ()=>{
            this.render()
        }
    }
    class ColorFilter {
        constructor(color,w,h,animEndCb) {
            this.deg = 0
            this.w = w
            this.h = h
            this.color = color
            this.dir = 0
            this.animEndCb = animEndCb
        }
        draw(context,r) {
            context.save()
            context.translate(this.w/2,this.h/2)
            context.rotate(this.deg*Math.PI/180)
            context.beginPath()
            for(var i = 0;i<=deg;i+=10) {
                const x = r*Math.cos(i*Math.PI/180),y = r*Math.sin(i*Math.PI/180)
                if(i == 0) {
                    context.moveTo(x,y)
                }
                else {
                    context.lineTo(x,y)
                }
            }
            context.fillStyle = this.color
            context.globalAlpha = 0.5
            context.fill()
            context.restore()
        }
        startMoving() {
            if(this.dir == 0) {
                if(this.deg == 0) {
                    this.dir = 1
                }
                else {
                    this.dir = -1
                }
                this.animEndCb()
            }
        }
        update() {
            this.deg += 30*this.dir
            if(this.deg >= 360 || this.deg <= 0) {
                this.dir = 0
            }
        }
    }
}

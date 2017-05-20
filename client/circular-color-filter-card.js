class CircularCard {
    constructor(src,color,w,h) {
        this.src = src
        this.img = document.createElement('img')
        document.body.appendChild(this.img)
        this.w = w
        this.h = h
        this.scale = 0
        this.color = color
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
        this.context.save()
        this.context.translate(this.w/2,this.h/2)
        this.context.scale(this.scale,this.scale)
        this.context.beginPath()
        this.context.arc(0,0,r,0,2*Math.PI)
        this.context.fillStyle = this.color
        this.context.globalAlpha = 0.5
        this.context.fill()
        this.context.restore()
    }
    create() {
        this.canvas = document.createElement('canvas')
        this.canvas.width = this.w
        this.canvas.height = this.h
        this.context = this.canvas.getContext('2d')
        this.image = new Image()
        this.image.onload = ()=>{
            this.render()
        }
    }
}

window.onload = () => {
    const canvas = document.getElementById("draw");
    const color = document.getElementById("color");
    let earasing = false;
    const lwidthSlide = document.getElementById("line-width");
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext("2d");
    let drawing = false;
let prevX = null
let prevY = null

// How thick the lines should be
ctx.lineWidth = 1
lwidthSlide.addEventListener("input", (e) => {
    // alert("change")
    ctx.lineWidth = e.target.value
})
color.addEventListener("input", (e) => {
    // alert("change")
ctx.strokeStyle = e.target.value
})
let clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click", () => {
    if(!confirm("Are you sure you want to clear it?")) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})
let eraseBtn = document.querySelector('.erase');
eraseBtn.addEventListener("click", () => {
earasing = !earasing
})
let saveBtn = document.querySelector(".save")
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("imag/png")
    let a = document.createElement("a")
    a.href = data
    // what ever name you specify here
    // the image will be saved as that name
    a.download = prompt("Name of File?") || `sketch-${new Date().toISOString()}.png`
    a.click()
})
canvas.addEventListener("mousemove", (e) => {
    if(!drawing){
        // Set the previous mouse positions to the current mouse positions
        prevX = e.clientX
        prevY = e.clientY
        return
    } 
    // initially previous mouse positions are null
    // so we can't draw a line
    if(prevX == null || prevY == null){
        // Set the previous mouse positions to the current mouse positions
        prevX = e.clientX
        prevY = e.clientY
        return
    } 
   



    // Current mouse position
    let currentX = e.clientX
    let currentY = e.clientY
if(earasing) {
    let oldColor = ctx.strokeStyle.toString();
 ctx.strokeStyle = "#ffffff";
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()
    ctx.strokeStyle = oldColor;
} else {
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()
}
    // Drawing a line from the previous mouse position to the current mouse position
   
  
    // Update previous mouse position
    prevX = currentX
    prevY = currentY
})
    canvas.onmousedown = (e) => {
        drawing = true;
    }
    canvas.onmouseup = () => {
        drawing = false;
    }
    draw()
}
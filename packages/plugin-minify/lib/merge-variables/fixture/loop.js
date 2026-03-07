let degI = degFloor + degGrowthFactor * i
while(degI > 360) {
    degI -= 360
}

// find the x & y extensions
let theta = (degI * Math.PI) / 180 // convert degrees to radians
let a = lineLength * Math.sin(theta) // this will be the y extension
let b = lineLength * Math.cos(theta) // this will be the x extension

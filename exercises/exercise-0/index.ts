// @ts-ignore
import vertexShaderSource from "./vertex.glsl"
// @ts-ignore
import fragmentShaderSource from "./fragment.glsl"


const context = () => {
    const canvas = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement
    if (canvas) {
        return canvas.getContext("webgl2")
    } else {
        throw new Error("Could not find any \"canvas\" element.")
    }
}


//
const gl = context()

//
gl.clearColor(0, 0, 0, 1)
gl.clear(gl.COLOR_BUFFER_BIT)

//
const program = gl.createProgram()

// VERTEX SHADER
const vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, vertexShaderSource)
gl.compileShader(vertexShader)
gl.attachShader(program, vertexShader)
// FRAGMENT SHADER
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, fragmentShaderSource)
gl.compileShader(fragmentShader)
gl.attachShader(program, fragmentShader)

//
gl.linkProgram(program)
gl.useProgram(program)

//
const position = [
    -1, 0, 0,
    0, 1, 0,
    0, -1, 0,
    1, 0, 0
]

gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);
const attribute = gl.getAttribLocation(program, "position");
gl.enableVertexAttribArray(attribute);
gl.vertexAttribPointer(attribute, 3, gl.FLOAT, false, 0, 0);
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
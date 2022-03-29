import { AttributeLocation, Buffer, Context, ShaderProgram, Shader } from "#core"
import { mat4 } from "gl-matrix"
import UniformLocation from "../../core/UniformLocation"



export function main(): void {
    //- INITIALIZE
    const context = new Context(document)

    const vertex = new Shader(context, context.VERTEX_SHADER, require("./shaders/shader.vert"))
    const fragment = new Shader(context, context.FRAGMENT_SHADER, require("./shaders/shader.frag"))
    const program = new ShaderProgram(context)
        .attachShader(vertex)
        .attachShader(fragment)
        .link()
        .use()

    const position = [
        // Front face
        -1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,
        1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0, -1.0, -1.0,

        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
        1.0,  1.0,  1.0,
        1.0,  1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,

        // Right face
        1.0, -1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0,  1.0,  1.0,
        1.0, -1.0,  1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
    ];

    const faceColors = [
        [1.0,  1.0,  1.0,  1.0],    // Front face: white
        [1.0,  0.0,  0.0,  1.0],    // Back face: red
        [0.0,  1.0,  0.0,  1.0],    // Top face: green
        [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
        [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
        [1.0,  0.0,  1.0,  1.0],    // Left face: purple
    ];

    let colors: number[] = [];
    for (var j = 0; j < faceColors.length; ++j) {
        const c = faceColors[j];
        // Repeat each color four times for the four vertices of the face
        colors = colors.concat(c, c, c, c);
    }


    const positionBuffer = new Buffer(context, position)
    const positionAttribute = new AttributeLocation(context, program, "aVertexPosition", 3)
    const colorBuffer = new Buffer(context, colors)
    const colorAttribute = new AttributeLocation(context, program, "aVertexColor", 4)
    const uProjectionMatrix = new UniformLocation(context, program, "uProjectionMatrix", 2)
    const uModelViewMatrix = new UniformLocation(context, program, "uModelViewMatrix", 2)

    const indexBuffer = context.createBuffer();
    context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.

    const indices = [
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23,   // left
    ];

    // Now send the element array to GL

    context.bufferData(context.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices), context.STATIC_DRAW);


    //- DRAW


    // context.drawArrays(context.TRIANGLE_STRIP, 0, 4);

    let cubeRotation = 0.0;
    let then = 0
    function draw(now: number) {
        now *= 0.001;  // convert to seconds
        const deltaTime = now - then;
        then = now;

        context.clearColor(0, 0, 0, 1)
        context.clearDepth(1)
        context.enable(context.DEPTH_TEST)
        context.depthFunc(context.LEQUAL)
        context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT)

        const fov = (45 + cubeRotation) * Math.PI / 180
        // @ts-ignore
        const aspectRatio = context.canvas.clientWidth / context.canvas.clientHeight
        const zNear = 0.1;
        const zFar = 100.0;
        const projectionMatrix = mat4.create()
        mat4.perspective(projectionMatrix, fov, aspectRatio, zNear, zFar)

        const modelViewMatrix = mat4.create();
        mat4.translate(modelViewMatrix, modelViewMatrix, [ -0.0, 0.0, -6.0 ])
        mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation * .7, [0, 1, 0]);

        context.uniformMatrix4fv(uProjectionMatrix.resource(), false, projectionMatrix);
        context.uniformMatrix4fv(uModelViewMatrix.resource(), false, modelViewMatrix);


        context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indexBuffer);
        context.drawElements(context.TRIANGLES, 36, context.UNSIGNED_SHORT, 0);
        requestAnimationFrame(draw)
        cubeRotation += deltaTime;
    }

    draw(0)
}


declare module "*.frag" {
    type FragmentShader = string
    const shader: FragmentShader
    export = shader
}


declare module "*.vert" {
    type VertexShader = string
    const shader: VertexShader
    export = shader
}
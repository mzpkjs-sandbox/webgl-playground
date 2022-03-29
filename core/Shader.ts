import Context from "./Context"
import Resource from "./Resource"



class Shader implements Resource<WebGLShader> {
    private readonly _context: WebGL2RenderingContext
    private readonly _resource: WebGLShader

    public constructor(context: Context, type: number, source: string) {
        this._context = context
        const shader = this._context.createShader(type)
        if (shader) {
            this._context.shaderSource(shader, source)
            this._context.compileShader(shader)
            if (this._context.getShaderParameter(shader, this._context.COMPILE_STATUS)) {
                this._resource = shader
            } else {
                this._context.deleteShader(shader);
                throw new Error("?")
            }
        } else {
            throw new Error("?")
        }
    }

    public resource(): WebGLShader {
        return this._resource
    }
}



export default Shader
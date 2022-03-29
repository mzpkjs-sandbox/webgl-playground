import AttributeLocation from "./AttributeLocation"
import Context from "./Context"
import Resource from "./Resource"
import Shader from "./Shader"



class ShaderProgram implements Resource<WebGLProgram> {
    private readonly _context: WebGL2RenderingContext
    private readonly _resource: WebGLProgram

    public constructor(context: Context) {
        this._context = context
        const program = this._context.createProgram()
        if (program) {
            this._resource = program
        } else {
            throw new Error("?")
        }
    }

    public attachShader(shader: Shader): ShaderProgram {
        this._context.attachShader(this._resource, shader.resource())
        return this
    }

    public link(): ShaderProgram {
        this._context.linkProgram(this._resource)
        if (this._context.getProgramParameter(this._resource, this._context.LINK_STATUS)) {
            return this
        } else {
            throw new Error("?")
        }
    }

    public use(): ShaderProgram {
        this._context.useProgram(this._resource)
        return this
    }

    public resource(): WebGLProgram {
        return this._resource
    }
}



export default ShaderProgram
import Context from "./Context"
import Resource from "./Resource"



class Buffer implements Resource<WebGLBuffer> {
    private readonly _context: Context
    private readonly _resource: WebGLBuffer

    public constructor(context: Context, data: number[]) {
        this._context = context
        const buffer = this._context.createBuffer()
        if (buffer) {
            this._resource = buffer
            this._context.bindBuffer(this._context.ARRAY_BUFFER, this._resource)
            this._context.bufferData(this._context.ARRAY_BUFFER, new Float32Array(data), this._context.STATIC_DRAW)
        } else {
            throw new Error("?")
        }
    }

    public resource(): WebGLBuffer {
        return this._resource
    }
}



export default Buffer
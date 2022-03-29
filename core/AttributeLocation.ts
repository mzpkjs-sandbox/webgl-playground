import Context from "./Context"
import ShaderProgram from "./ShaderProgram"
import Resource from "./Resource"



class AttributeLocation implements Resource<number> {
    private readonly _context: Context
    private readonly _program: ShaderProgram
    private readonly _symbol: string
    private readonly _resource: number

    public constructor(context: Context, program: ShaderProgram, symbol: string, size: number) {
        this._context = context
        this._program = program
        this._symbol = symbol
        this._resource = this._context.getAttribLocation(this._program.resource(), this._symbol)
        if (this._resource !== -1) {
            this._context.enableVertexAttribArray(this._resource)
            this._context.vertexAttribPointer(this._resource, size, this._context.FLOAT, false, 0, 0)
        } else {
            throw new Error(`Could not locate an attribute variable defined as "${this._symbol}" in a given shader program.`)
        }
    }

    public resource(): number {
        return this._resource
    }

    public get symbol(): string {
        return this._symbol
    }
}



export default AttributeLocation
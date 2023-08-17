//returns def if the value is undefined
export const setDefault = (val: any, def: any) => {
    if (val !== undefined) { return val }
    return def
}
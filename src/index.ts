export const retamabälChabäl = require("./ch'ab'äl.json")
export const retamabälTzibanem = require("./tz'ib'.json")

const rkxnkNklm = {
   glottologue: "gl",
   iso1: "i1",
   iso2: "i2",
   iso3: "i3"
}

export const konojelChabäl: string[] = Object.keys(retamabälChabäl)
export const konojelTzibanem: string[] = Object.keys(retamabälTzibanem)

export function runukChabäl(chabäl: string, runukulem?: string): string | void {
    const rnkNchbl = Object.keys(retamabälChabäl).find(x=>retamabälChabäl[x]["rb'"] === chabäl)
    if (!runukulem) return rnkNchbl

    runukulem = runukulem.toLowerCase()
    const taqrunuk = retamabälChabäl[rnkNchbl].rn
    if (runukulem === 'iso') return [taqrunuk.i1, taqrunuk.i2, taqrunuk.i3].find(x=>x)
    return taqrunuk[rkxnkNklm[runukulem]]
}

export function rubiChabäl(runuk: string, runukulem?: string): string | void {
    runukulem = (runukulem || '').toLowerCase()

    let rtmbl: object
    if (Object.keys(rkxnkNklm).includes(runukulem)) {
        rtmbl = Object.values(retamabälChabäl).find(x => x.rn[rkxnkNklm[runukulem]] === runuk)
    } else if (runukulem === '') {
        rtmbl = retamabälChabäl[runuk]
    } else if (runukulem === 'iso') {
        rtmbl = Object.values(retamabälChabäl).find(x => [x.rn.i1, x.rn.i2, x.rn.i3].some(x => x === runuk))
    }
    return rtmbl ? rtmbl["rb'"] : undefined
}

export function rutzibChabäl(runuk: string): string | void {
    const rtmbl = retamabälChabäl[runuk]
    if (rtmbl) return rtmbl.tz
}

export function rajilanïkChabäl(runuk: string): string | void {
    const rtmbl = retamabälChabäl[runuk]
    if (rtmbl) return rtmbl.aj
}

export function rubiTzibanem(runuk: string): string | void {
    const rtmbl = retamabälTzibanem[runuk]
    if (rtmbl) return rtmbl["rb'"]
}

export function rucholanemTzibanem(runuk: string): string | void {
    const rtmbl = retamabälTzibanem[runuk]
    if (rtmbl) return rtmbl.ch
}

export function rajilanïkTzibanem(runuk: string): string | void {
    const rtmbl = retamabälTzibanem[runuk]
    if (rtmbl) return rtmbl.aj
}
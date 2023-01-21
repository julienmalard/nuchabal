import type { 
    RubanikilEtamabälChabäl,
    RubanikilEtamabälTzibanem,
} from "@/rubanikil.js";
import _retamabälChabäl from "@/retamabäl/ch'ab'äl.json"
import _retamabälTzibanem from "@/retamabäl/tz'ib'.json"

const retamabälChabäl: {
    [ch: string]: RubanikilEtamabälChabäl
} = _retamabälChabäl

const retamabälTzibanem: {
    [tz: string]: RubanikilEtamabälTzibanem
} = _retamabälTzibanem

const rkxnkNklm: { [rnk: string]: string } = {
   glottologue: "gl",
   iso1: "i1",
   iso2: "i2",
   iso3: "i3"
}

export const konojelChabäl: string[] = Object.keys(retamabälChabäl)
export const konojelTzibanem: string[] = Object.keys(retamabälTzibanem)

export function runukChabäl(chabäl: string, runukulem?: string): string | undefined {
    const rnkNchbl = Object.keys(retamabälChabäl).find(x=>retamabälChabäl[x]["rb'"] === chabäl)
    if (!runukulem) return rnkNchbl

    runukulem = runukulem.toLowerCase()
    const taqrunuk = retamabälChabäl[rnkNchbl].rn
    if (runukulem === 'iso') return [taqrunuk.i1, taqrunuk.i2, taqrunuk.i3].find(x=>x)
    return taqrunuk[rkxnkNklm[runukulem] || runukulem]

}

export function rubiChabäl(runuk: string, runukulem?: string): string | undefined {
    runukulem = (runukulem || '').toLowerCase()

    let rtmbl: RubanikilEtamabälChabäl
    if (Object.keys(rkxnkNklm).includes(runukulem)) {
        rtmbl = Object.values(retamabälChabäl).find(x => x.rn[rkxnkNklm[runukulem]] === runuk)
    } else if (runukulem === '') {
        rtmbl = retamabälChabäl[runuk]
    } else if (runukulem === 'iso') {
        rtmbl = Object.values(retamabälChabäl).find(x => [x.rn.i1, x.rn.i2, x.rn.i3].some(x => x === runuk))
    }
    return rtmbl ? rtmbl["rb'"] : undefined
}

export function rutzibChabäl(runuk: string): string | undefined {
    const rtmbl = retamabälChabäl[runuk]
    return rtmbl?.tz
}

export function rajilanïkChabäl(runuk: string): string | undefined {
    const rtmbl = retamabälChabäl[runuk]
    if (rtmbl) return rtmbl.aj
    const tzib = rutzibChabäl(runuk)
    return rajilanïkTzibanem(tzib)
}

export function rubiTzibanem(runuk: string): string | undefined {
    const rtmbl = retamabälTzibanem[runuk]
    return rtmbl ? rtmbl["rb'"] : undefined
}

export function rucholanemTzibanem(runuk: string): string | undefined {
    const rtmbl = retamabälTzibanem[runuk]
    return rtmbl?.ch
}

export function rajilanïkTzibanem(runuk: string): string | undefined {
    const rtmbl = retamabälTzibanem[runuk]
    return rtmbl?.aj
}
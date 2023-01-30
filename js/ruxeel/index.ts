import type ClientConstellation from "@constl/ipa";
import type {
  RubanikilEtamabälChabäl,
  RubanikilEtamabälTzibanem,
} from "@/rubanikil.js";
import type { KelChumilChabäl, KelChumilTzibanem } from "@/kel.js";

import test from "@/retamabäl/தகவல்கள்.json" 
import _retamabälChabäl from "@/retamabäl/ch'ab'äl.json";
import _retamabälTzibanem from "@/retamabäl/tz'ib'.json";
import { tachojmisajKel } from "@/kel.js";

export { version as relesaxïk } from "@/relesaxïk.js";
export {test};
export class Nuchabäl {
  retamabälChabälChumil: {
    [ch: string]: RubanikilEtamabälChabäl;
  };
  retamabälTzibanemChumil: {
    [tz: string]: RubanikilEtamabälTzibanem;
  };
  chumil?: ClientConstellation;
  kelChabäl?: KelChumilChabäl;
  kelTzibanem?: KelChumilTzibanem;

  constructor({ chumil }: { chumil?: ClientConstellation }) {
    this.chumil = chumil;
    this.retamabälChabälChumil = {};
    this.retamabälTzibanemChumil = {};

    if (chumil) {
      const { kelChabäl, kelTzibanem } = tachojmisajKel({
        chumil: this.chumil,
      });
      this.kelChabäl = kelChabäl;
      this.kelTzibanem = kelTzibanem;
    }
  }

  get retamabälChabäl(): {
    [ch: string]: RubanikilEtamabälChabäl;
  } {
    return _retamabälChabäl;
  }

  get retamabälTzibanem(): {
    [tz: string]: RubanikilEtamabälTzibanem;
  } {
    return _retamabälTzibanem;
  }

  get konojelChabäl(): string[] {
    return Object.keys(this.retamabälChabäl);
  }

  get konojelTzibanem(): string[] {
    return Object.keys(this.retamabälTzibanem);
  }

  runukChabäl(chabäl: string, runukulem?: string): string | undefined {
    const rnkNchbl = Object.keys(this.retamabälChabäl).find(
      (x) => this.retamabälChabäl[x]["rb'"] === chabäl
    );
    if (!runukulem) return rnkNchbl;

    runukulem = runukulem.toLowerCase();
    const taqrunuk = this.retamabälChabäl[rnkNchbl].rn;
    if (runukulem === "iso")
      return [taqrunuk.i1, taqrunuk.i2, taqrunuk.i3].find((x) => x);
    return taqrunuk[rkxnkNklm[runukulem] || runukulem];
  }

  rubiChabäl(runuk: string, runukulem?: string): string | undefined {
    runukulem = (runukulem || "").toLowerCase();

    let rtmbl: RubanikilEtamabälChabäl;
    if (Object.keys(rkxnkNklm).includes(runukulem)) {
      rtmbl = Object.values(this.retamabälChabäl).find(
        (x) => x.rn[rkxnkNklm[runukulem]] === runuk
      );
    } else if (runukulem === "") {
      rtmbl = this.retamabälChabäl[runuk];
    } else if (runukulem === "iso") {
      rtmbl = Object.values(this.retamabälChabäl).find((x) =>
        [x.rn.i1, x.rn.i2, x.rn.i3].some((x) => x === runuk)
      );
    }
    return rtmbl ? rtmbl["rb'"] : undefined;
  }

  rutzibChabäl(runuk: string): string | undefined {
    const rtmbl = this.retamabälChabäl[runuk];
    return rtmbl?.tz;
  }

  rajilanïkChabäl(runuk: string): string | undefined {
    const rtmbl = this.retamabälChabäl[runuk];
    if (rtmbl) return rtmbl.aj;
    const tzib = this.rutzibChabäl(runuk);
    return this.rajilanïkTzibanem(tzib);
  }

  rubiTzibanem(runuk: string): string | undefined {
    const rtmbl = this.retamabälTzibanem[runuk];
    return rtmbl ? rtmbl["rb'"] : undefined;
  }

  rucholanemTzibanem(runuk: string): string | undefined {
    const rtmbl = this.retamabälTzibanem[runuk];
    return rtmbl?.ch;
  }

  rajilanïkTzibanem(runuk: string): string | undefined {
    const rtmbl = this.retamabälTzibanem[runuk];
    return rtmbl?.aj;
  }

  // tatzeqelbej() {}

  async tatzapij(): Promise<void> {
    // if (this.tamestajKel) await this.tamestajKel();
  }
}

const rkxnkNklm: { [rnk: string]: string } = {
  glottologue: "gl",
  iso1: "i1",
  iso2: "i2",
  iso3: "i3",
};

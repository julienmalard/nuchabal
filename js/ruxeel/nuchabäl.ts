import type {générerClient} from "@constl/ipa";
import { EventEmitter } from "events";
import merge from "deepmerge";

import type {
  RubanikilEtamabälChabäl,
  RubanikilKetamabälTaqChabäl,
  RubanikilKetamabälTaqTzibanem,
} from "@/rubanikil.js";
import type { KelChumilChabäl, KelChumilTzibanem } from "@/kel.js";
import { tachojmisajKel } from "@/kel.js";
import {
  runukRucheelRubiChabäl,
  runukRucheelRunukChabäl,
  runukRucheelRajilanïkChabäl,
  runukRucheelRutzibanemChabäl,
  runukRucheelRunukGlChabäl,
  runukRucheelRunukI1Chabäl,
  runukRucheelRunukI2Chabäl,
  runukRucheelRunukI3Chabäl,
  runukRucheelRubiTzib,
  runukRucheelRunukTzib,
  runukRucheelRajilanïkTzib,
  runukRucheelRucholanemTzib,
  runukRucheelRutzibTzib,
} from "@/jantape.js";

import _retamabälChabäl from "@/retamabäl/ch'ab'äl.json" assert { type: "json" };
import _retamabälTzibanem from "@/retamabäl/tzib'.json" assert { type: "json" };
import type {
  types
} from "@constl/ipa";

export class Nuchabäl {
  retamabälChabälChumil: RubanikilKetamabälTaqChabäl;
  retamabälTzibanemChumil: RubanikilKetamabälTaqTzibanem;

  événements: EventEmitter;

  chumil?: ReturnType<typeof générerClient>;
  tamestajKel?: types.schémaFonctionOublier;

  constructor({ chumil }: { chumil?: ReturnType<typeof générerClient> }) {
    this.chumil = chumil;
    this.retamabälChabälChumil = {};
    this.retamabälTzibanemChumil = {};

    this.événements = new EventEmitter();
    
    this._tachojmisajKel();
  }

  private async _tachojmisajKel(): Promise<void> {
    if (this.chumil) {
      const { kelChabäl, kelTzibanem } = tachojmisajKel({
        chumil: this.chumil!,
      });
      const tamestajTaqChabäl =
        await kelChabäl.அங்கீகரிக்கப்பட்ட_உறுப்படிகளை_கேள்ளு({
          செ: (retamabälChabäl) => {
            this.retamabälChabälChumil =
              tajalPaRubanikilRetamabalChabäl(retamabälChabäl);
            this.xujalRi();
          },
        });
      const tamestajTaqTzibanem =
        await kelTzibanem.அங்கீகரிக்கப்பட்ட_உறுப்படிகளை_கேள்ளு({
          செ: (retamabälTzibanem) => {
            this.retamabälTzibanemChumil =
              tajalPaRubanikilRetamabalTzibanem(retamabälTzibanem);
            this.xujalRi();
          },
        });
      this.tamestajKel = async () => {
        await Promise.all([tamestajTaqChabäl(), tamestajTaqTzibanem()]);
      };
    }
  }

  xujalRi() {
    this.événements.emit("xujalRi'");
  }

  get retamabälChabäl(): RubanikilKetamabälTaqChabäl {
    return merge(_retamabälChabäl, this.retamabälChabälChumil);
  }

  get retamabälTzibanem(): RubanikilKetamabälTaqTzibanem {
    return merge(_retamabälTzibanem, this.retamabälTzibanemChumil);
  }

  get konojelChabäl(): string[] {
    return Object.keys(this.retamabälChabäl);
  }

  get konojelTzibanem(): string[] {
    return Object.keys(this.retamabälTzibanem);
  }

  runukChabäl({
    chabäl,
    runukulem,
  }: {
    chabäl: string;
    runukulem?: string;
  }): string | undefined {
    const rnkNchbl = Object.keys(this.retamabälChabäl).find(
      (x) => this.retamabälChabäl[x]["rb'"] === chabäl
      );
    if (!runukulem || !rnkNchbl) return rnkNchbl;

    runukulem = runukulem.toLowerCase();
    const taqrunuk = this.retamabälChabäl[rnkNchbl].rn;
    if (runukulem === "iso")
      return [taqrunuk.i1, taqrunuk.i2, taqrunuk.i3].find((x) => x);
    return taqrunuk[rkxnkNklm[runukulem] || runukulem];
  }

  rubiChabäl({
    runuk,
    runukulem,
  }: {
    runuk: string;
    runukulem?: string;
  }): string | undefined {
    const runukulem_kokol = runukulem?.toLowerCase();

    let rtmbl: RubanikilEtamabälChabäl | undefined = undefined;
    if (runukulem_kokol === undefined) {
      rtmbl = this.retamabälChabäl[runuk];
    } else if (runukulem_kokol === "iso") {
      rtmbl = Object.values(this.retamabälChabäl).find((x) =>
      [x.rn.i1, x.rn.i2, x.rn.i3].some((x) => x === runuk)
      );
    } else if (Object.keys(rkxnkNklm).includes(runukulem_kokol)) {
      rtmbl = Object.values(this.retamabälChabäl).find(
        (x) => x.rn[rkxnkNklm[runukulem_kokol]] === runuk
      );
    }
    return rtmbl ? rtmbl["rb'"] : undefined;
  }

  rutzibanemChabäl({ runuk }: { runuk: string }): string | undefined {
    const rtmbl = this.retamabälChabäl[runuk];
    const tzib = rtmbl?.tz;
    
    if (tzib) return tzib;

    for (const tz in this.konojelTzibanem) {
      const rutzibTzibanem = this.rutzibTzibanem({runuk: tz})
      if (rutzibTzibanem && runuk.match(new RegExp(rutzibTzibanem, "g"))) {
        return tz
      }
    }
    return undefined;
  }

  rajilanïkChabäl({ runuk }: { runuk: string }): string | undefined {
    const rtmbl = this.retamabälChabäl[runuk];
    if (rtmbl) return rtmbl.aj;
    const tzib = this.rutzibanemChabäl({ runuk });
    return tzib ? this.rajilanïkTzibanem({runuk: tzib}) : undefined;
  }

  rubiTzibanem({ runuk }: { runuk: string }): string | undefined {
    const rtmbl = this.retamabälTzibanem[runuk];
    return rtmbl ? rtmbl["rb'"] : undefined;
  }

  runukTzibanem({ tzibanem }: { tzibanem: string}): string | undefined {
    return Object.keys(this.retamabälTzibanem).find(
      (x) => this.retamabälChabäl[x]["rb'"] === tzibanem
    );
  }

  rucholanemTzibanem({ runuk }: { runuk: string }): string | undefined {
    const rtmbl = this.retamabälTzibanem[runuk];
    return rtmbl?.ch;
  }

  rutzibTzibanem({ runuk }: { runuk: string }): string | undefined {
    const rtmbl = this.retamabälTzibanem[runuk];
    return rtmbl?.tz;
  }

  rajilanïkTzibanem({ runuk }: { runuk: string }): string | undefined {
    const rtmbl = this.retamabälTzibanem[runuk];
    return rtmbl?.aj;
  }

  tatzeqelbej(sm: () => void): () => void {
    this.événements.on("xujalRi'", sm);
    sm();
    return () => {
      this.événements.off("xujalRi'", sm);
    };
  }

  tatzeqelbejRetamabälChabäl({
    sm,
  }: {
    sm: types.schémaFonctionSuivi<RubanikilKetamabälTaqChabäl>;
  }): () => void {
    return this.tatzeqelbej(() => sm(this.retamabälChabäl));
  }

  tatzeqelbejRetamabälTzibanem({
    sm,
  }: {
    sm: types.schémaFonctionSuivi<RubanikilKetamabälTaqTzibanem>;
  }): () => void {
    return this.tatzeqelbej(() => sm(this.retamabälTzibanem));
  }

  tatzeqelbejKonojelChabäl({
    sm,
  }: {
    sm: types.schémaFonctionSuivi<string[]>;
  }): () => void {
    return this.tatzeqelbej(() => sm(this.konojelChabäl));
  }
  tatzeqelbejKonojelTzibanem({
    sm,
  }: {
    sm: types.schémaFonctionSuivi<string[]>;
  }): () => void {
    return this.tatzeqelbej(() => sm(this.konojelTzibanem));
  }
  tatzeqelbejRunukChabäl({
    sm,
    chabäl,
    runukulem,
  }: {
    chabäl: string;
    runukulem?: string;
    sm: types.schémaFonctionSuivi<string | undefined>;
  }): () => void {
    return this.tatzeqelbej(() => sm(this.runukChabäl({ chabäl, runukulem })));
  }
  tatzeqelbejRubiChabäl({
    sm,
    runuk,
    runukulem,
  }: {
    runuk: string;
    runukulem?: string;
    sm: types.schémaFonctionSuivi<string | undefined>;
  }): () => void {
    return this.tatzeqelbej(() => sm(this.rubiChabäl({ runuk, runukulem })));
  }
  tatzeqelbejRutzibanemChabäl({
    sm,
    runuk,
  }: {
    runuk: string;
    sm: types.schémaFonctionSuivi<string | undefined>;
  }): () => void {
    return this.tatzeqelbej(() => sm(this.rutzibanemChabäl({ runuk })));
  }
  tatzeqelbejRajilanïkChabäl({
    sm,
    runuk,
  }: {
    runuk: string;
    sm: types.schémaFonctionSuivi<string | undefined>;
  }): () => void {
    return this.tatzeqelbej(() => sm(this.rajilanïkChabäl({ runuk })));
  }
  tatzeqelbejRubiTzibanem({
    sm,
    runuk,
  }: {
    runuk: string;
    sm: types.schémaFonctionSuivi<string | undefined>;
  }): () => void {
    return this.tatzeqelbej(() => sm(this.rubiTzibanem({ runuk })));
  }
  tatzeqelbejRunukTzibanem({
    sm,
    tzibanem,
  }: {
    tzibanem: string;
    sm: types.schémaFonctionSuivi<string | undefined>;
  }): () => void {
    return this.tatzeqelbej(() => sm(this.runukTzibanem({ tzibanem })));
  }
  tatzeqelbejRucholanemTzibanem({
    sm,
    runuk,
  }: {
    runuk: string;
    sm: types.schémaFonctionSuivi<string | undefined>;
  }): () => void {
    return this.tatzeqelbej(() => sm(this.rucholanemTzibanem({ runuk })));
  }
  tatzeqelbejRajilanïkTzibanem({
    sm,
    runuk,
  }: {
    runuk: string;
    sm: types.schémaFonctionSuivi<string | undefined>;
  }): () => void {
    return this.tatzeqelbej(() => sm(this.rajilanïkTzibanem({ runuk })));
  }

  async tatzapij(): Promise<void> {
    if (this.tamestajKel) await this.tamestajKel();
  }
}

const rkxnkNklm: { [rnk: string]: string } = {
  glottologue: "gl",
  iso1: "i1",
  iso2: "i2",
  iso3: "i3",
};

const tajalPaRubanikilRetamabalChabäl = (
  relesaxïkRuxeelTzijChabäl: Parameters<
    Parameters<KelChumilChabäl["அங்கீகரிக்கப்பட்ட_உறுப்படிகளை_கேள்ளு"]>[0]["செ"]
  >[0]
): RubanikilKetamabälTaqChabäl => {
  const retamabäl: RubanikilKetamabälTaqChabäl = {};

  for (const r of relesaxïkRuxeelTzijChabäl) {
    retamabäl[r.données[runukRucheelRunukChabäl]] = {
      aj: r.données[runukRucheelRajilanïkChabäl],
      "rb'": r.données[runukRucheelRubiChabäl],
      tz: r.données[runukRucheelRutzibanemChabäl],
      rn: {
        gl: r.données[runukRucheelRunukGlChabäl],
        i1: r.données[runukRucheelRunukI1Chabäl],
        i2: r.données[runukRucheelRunukI2Chabäl],
        i3: r.données[runukRucheelRunukI3Chabäl],
      },
    };
  }

  return retamabäl;
};

const tajalPaRubanikilRetamabalTzibanem = (
  relesaxïkRuxeelTzijTzibanem: Parameters<
    Parameters<
      KelChumilTzibanem["அங்கீகரிக்கப்பட்ட_உறுப்படிகளை_கேள்ளு"]
    >[0]["செ"]
  >[0]
): RubanikilKetamabälTaqTzibanem => {
  const retamabäl: RubanikilKetamabälTaqTzibanem = {};

  for (const r of relesaxïkRuxeelTzijTzibanem) {
    retamabäl[r.données[runukRucheelRunukTzib]] = {
      aj: r.données[runukRucheelRajilanïkTzib],
      "rb'": r.données[runukRucheelRubiTzib],
      ch: r.données[runukRucheelRucholanemTzib],
      tz: r.données[runukRucheelRutzibTzib],
    };
  }

  return retamabäl;
};

import { runukChabäl, konojelChabäl, rubiChabäl, rutzibChabäl, rajilanïkChabäl, retamabälChabäl, rubiTzibanem, rucholanemTzibanem, rajilanïkTzibanem, retamabälTzibanem } from "../src";
import { expect } from "chai";

describe("Retalil etamab'äl ch'ab'äl", (): void => {
    it("Man npet ta jun runuk' ka'i' b'i'aj", (): void => {
        const konojelKinuk: set = new Set(Object.keys(retamabälChabäl));
        expect([...konojelKinuk].length).is.equal(konojelChabäl.length);
    });
    it("Man npet ta jun rub'i' chab'äl ka'i' b'i'aj", (): void => {
        const konojelKibi: string[] = konojelChabäl.map(x => rubiChabäl(x));
        expect([...new Set(konojelKibi)].length).is.equal(konojelKibi.length);
    });
    it("Konojel k'o kinuk'", (): void => {
        const choltzijKinuk = konojelChabäl.map(x => retamabälChabäl[x].rn).filter(x => x);
        expect(choltzijKinuk.length).is.equal(konojelChabäl.length);
    });
});

describe("Rukanoxïk runuk' ch'ab'äl", (): void => {
    it("runuk' rixin runuk'ulem nuch'ab'äl", (): void => {
        const rnk: string = runukChabäl("Kaqchikel");
        expect(rnk).is.equal("kaq");
    });
    it("runuk' rixin Glottologue", (): void => {
        const rnk: string = runukChabäl("Kaqchikel", "glottologue");
        expect(rnk).is.equal("kaqc1270");
    });
    it("runuk' rixin ISO toq xaxe k'o ISO3", (): void => {
        const rnk: string = runukChabäl("Kaqchikel", "ISO");
        expect(rnk).is.equal("cak");
    });
    it("runuk' rixin ISO toq e k'iy runuk' ISO", (): void => {
        const rnk: string = runukChabäl("français", "ISO");
        expect(rnk).is.equal("fr");
    });
    it("runuk' rixin ISO3", (): void => {
        const rnk: string = runukChabäl("français", "ISO3");
        expect(rnk).is.equal("fra");
    });
    it("runuk' rixin ISO1 toq majun ta", (): void => {
        const rnk: string = runukChabäl("Kaqchikel", "ISO1");
        expect(rnk).is.equal(undefined);
    });
});

describe("Rukanoxïk rub'i' ch'ab'äl", (): void => {
    it("nuch'ab'äl", (): void => {
        const rbi: string = rubiChabäl("kaq");
        expect(rbi).is.equal("Kaqchikel");
    });
    it("Glottologue", (): void => {
        const rbi: string = rubiChabäl("kaqc1270", "glottologue");
        expect(rbi).is.equal("Kaqchikel");
    });
    it("ISO", (): void => {
        const rbi: string = rubiChabäl("cak", "ISO");
        expect(rbi).is.equal("Kaqchikel");
    });
    it("ISO1", (): void => {
        const rbi: string = rubiChabäl("fr", "ISO1");
        expect(rbi).is.equal("français");
    });
    it("ISO1 toq e k'iy", (): void => {
        const rbi: string = rubiChabäl("fr", "ISO");
        expect(rbi).is.equal("français");
    });
    it("ISO3 toq e k'iy", (): void => {
        const rbi: string = rubiChabäl("fra", "ISO");
        expect(rbi).is.equal("français");
    });
});

describe("Rukanoxïk rutz'ib'anem ch'ab'äl", (): void => {
    it("Kaqchikel", (): void => {
        const rtzb: string = rutzibChabäl("kaq");
        expect(rtzb).is.equal("ltn");
    });
    it("தமிழ்", (): void => {
        const rtzb: string = rutzibChabäl("த");
        expect(rtzb).is.equal("த");
    });
});

describe("Rukanoxïk rajilanïk ch'ab'äl", (): void => {
    it("Kaqchikel", (): void => {
        const rjln: string = rajilanïkChabäl('kaq');
        expect(rjln).is.equal("Mayab'");
    });
    it("தமிழ்", (): void => {
        const rjln: string = rajilanïkChabäl("த");
        expect(rjln).is.equal("தமிழ்");
    });
});

describe("Kitz'b'anem ch'ab'äl", (): void => {
    it("K'o konjelal tz'ib'anem", (): void => {
        const kinuk_tzib = [...Object.keys(retamabälTzibanem)]
        const kitzib_chabal = [...new Set(Object.keys(retamabälChabäl).map(x=>runukChabäl(x)).filter(x=>x))]
        expect(kitzib_chabal.map(x => kinuk_tzib.includes(x)).every(x=>x)).is.equal(true);
    });
    it("Rub'i' tz'ib'anem", (): void => {
        const rubi: string = rubiTzibanem("த");
        expect(rubi).is.equal("தமிழ்");
    });
    it("Rucholanem tz'ib'anem", (): void => {
        const rubi: string = rucholanemTzibanem("த");
        expect(rubi).is.equal("→↓");
    });
    it("Rajilanik tz'ib'anem", (): void => {
        const rubi: string = rajilanïkTzibanem("த");
        expect(rubi).is.equal("தமிழ்");
    });
});
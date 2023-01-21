import { runukChabäl, konojelChabäl, rubiChabäl, rutzibChabäl, rajilanïkChabäl, retamabälChabäl, rubiTzibanem, rucholanemTzibanem, rajilanïkTzibanem, retamabälTzibanem } from "@/index.js";
import { RubanikilEtamabälChabäl } from "./rubanikil";


describe("Retalil etamab'äl ch'ab'äl", (): void => {
    test("Man npet ta jun runuk' ka'i' b'i'aj", (): void => {
        const konojelKinuk: Set<string> = new Set(Object.keys(retamabälChabäl));
        expect([...konojelKinuk].length).toEqual(konojelChabäl.length);
    });
    test("Man npet ta jun rub'i' chab'äl ka'i' b'i'aj", (): void => {
        const konojelKibi: string[] = konojelChabäl.map(x => rubiChabäl(x));
        expect([...new Set(konojelKibi)].length).toEqual(konojelKibi.length);
    });
    test("Konojel k'o kinuk'", (): void => {
        const choltzijKinuk = konojelChabäl.map(x => retamabälChabäl[x as keyof RubanikilEtamabälChabäl].rn).filter(x => x);
        expect(choltzijKinuk.length).toEqual(konojelChabäl.length);
    });
});

describe("Rukanoxïk runuk' ch'ab'äl", (): void => {
    test("runuk' rixin runuk'ulem nuch'ab'äl", (): void => {
        const rnk: string = runukChabäl("Kaqchikel");
        expect(rnk).toEqual("kaq");
    });
    test("runuk' rixin Glottologue", (): void => {
        const rnk: string = runukChabäl("Kaqchikel", "glottologue");
        expect(rnk).toEqual("kaqc1270");
    });
    test("runuk' rixin ISO toq xaxe k'o ISO3", (): void => {
        const rnk: string = runukChabäl("Kaqchikel", "ISO");
        expect(rnk).toEqual("cak");
    });
    test("runuk' rixin ISO toq e k'iy runuk' ISO", (): void => {
        const rnk: string = runukChabäl("français", "ISO");
        expect(rnk).toEqual("fr");
    });
    test("runuk' rixin ISO3", (): void => {
        const rnk: string = runukChabäl("français", "ISO3");
        expect(rnk).toEqual("fra");
    });
    test("runuk' rixin ISO1 toq majun ta", (): void => {
        const rnk: string = runukChabäl("Kaqchikel", "ISO1");
        expect(rnk).toEqual(undefined);
    });
});

describe("Rukanoxïk rub'i' ch'ab'äl", (): void => {
    test("nuch'ab'äl", (): void => {
        const rbi: string = rubiChabäl("kaq");
        expect(rbi).toEqual("Kaqchikel");
    });
    test("Glottologue", (): void => {
        const rbi: string = rubiChabäl("kaqc1270", "glottologue");
        expect(rbi).toEqual("Kaqchikel");
    });
    test("ISO", (): void => {
        const rbi: string = rubiChabäl("cak", "ISO");
        expect(rbi).toEqual("Kaqchikel");
    });
    test("ISO1", (): void => {
        const rbi: string = rubiChabäl("fr", "ISO1");
        expect(rbi).toEqual("français");
    });
    test("ISO1 toq e k'iy", (): void => {
        const rbi: string = rubiChabäl("fr", "ISO");
        expect(rbi).toEqual("français");
    });
    test("ISO3 toq e k'iy", (): void => {
        const rbi: string = rubiChabäl("fra", "ISO");
        expect(rbi).toEqual("français");
    });
});

describe("Rukanoxïk rutz'ib'anem ch'ab'äl", (): void => {
    test("Kaqchikel", (): void => {
        const rtzb: string = rutzibChabäl("kaq");
        expect(rtzb).toEqual("ltn");
    });
    test("தமிழ்", (): void => {
        const rtzb: string = rutzibChabäl("த");
        expect(rtzb).toEqual("த");
    });
});

describe("Rukanoxïk rajilanïk ch'ab'äl", (): void => {
    test("Kaqchikel", (): void => {
        const rjln: string = rajilanïkChabäl('kaq');
        expect(rjln).toEqual("Mayab'");
    });
    test("தமிழ்", (): void => {
        const rjln: string = rajilanïkChabäl("த");
        expect(rjln).toEqual("தமிழ்");
    });
});

describe("Kitz'b'anem ch'ab'äl", (): void => {
    test("K'o konjelal tz'ib'anem", (): void => {
        const kinuk_tzib = [...Object.keys(retamabälTzibanem)]
        const kitzib_chabal = [...new Set(Object.keys(retamabälChabäl).map(x=>runukChabäl(x)).filter(x=>x))]
        expect(kitzib_chabal.map(x => kinuk_tzib.includes(x)).every(x=>x)).toEqual(true);
    });
    test("Rub'i' tz'ib'anem", (): void => {
        const rubi: string = rubiTzibanem("த");
        expect(rubi).toEqual("தமிழ்");
    });
    test("Rucholanem tz'ib'anem", (): void => {
        const rubi: string = rucholanemTzibanem("த");
        expect(rubi).toEqual("→↓");
    });
    test("Rajilanik tz'ib'anem", (): void => {
        const rubi: string = rajilanïkTzibanem("த");
        expect(rubi).toEqual("தமிழ்");
    });
});
import { RubanikilEtamabälChabäl } from "@/rubanikil.js";
import { relesaxïk } from "@/index.js";
import { Nuchabäl } from "@/index.js";

describe("Retalil etamab'äl ch'ab'äl", (): void => {
  let nuchabäl: Nuchabäl;
  beforeAll(() => {
    nuchabäl = new Nuchabäl({});
    console.log({ relesaxïk });
  });

  test("Man npet ta jun runuk' ka'i' b'i'aj", (): void => {
    const konojelKinuk: Set<string> = new Set(
      Object.keys(nuchabäl.retamabälChabäl)
    );
    expect([...konojelKinuk].length).toEqual(nuchabäl.konojelChabäl.length);
  });
  test("Man npet ta jun rub'i' chab'äl ka'i' b'i'aj", (): void => {
    const konojelKibi: string[] = nuchabäl.konojelChabäl.map((x) =>
      nuchabäl.rubiChabäl({runuk: x})
    );
    expect([...new Set(konojelKibi)].length).toEqual(konojelKibi.length);
  });
  test("Konojel k'o kinuk'", (): void => {
    const choltzijKinuk = nuchabäl.konojelChabäl
      .map(
        (x) => nuchabäl.retamabälChabäl[x as keyof RubanikilEtamabälChabäl].rn
      )
      .filter((x) => x);
    expect(choltzijKinuk.length).toEqual(nuchabäl.konojelChabäl.length);
  });
});

describe("Rukanoxïk runuk' ch'ab'äl", (): void => {
  let nuchabäl: Nuchabäl;
  beforeAll(() => {
    nuchabäl = new Nuchabäl({});
  });

  test("runuk' rixin runuk'ulem nuch'ab'äl", (): void => {
    const rnk: string = nuchabäl.runukChabäl({chabäl: "Kaqchikel"});
    expect(rnk).toEqual("kaq");
  });
  test("runuk' rixin Glottologue", (): void => {
    const rnk: string = nuchabäl.runukChabäl({chabäl: "Kaqchikel", runukulem: "glottologue"});
    expect(rnk).toEqual("kaqc1270");
  });
  test("runuk' rixin ISO toq xaxe k'o ISO3", (): void => {
    const rnk: string = nuchabäl.runukChabäl({chabäl: "Kaqchikel", runukulem: "ISO"});
    expect(rnk).toEqual("cak");
  });
  test("runuk' rixin ISO toq e k'iy runuk' ISO", (): void => {
    const rnk: string = nuchabäl.runukChabäl({chabäl: "français", runukulem: "ISO"});
    expect(rnk).toEqual("fr");
  });
  test("runuk' rixin ISO3", (): void => {
    const rnk: string = nuchabäl.runukChabäl({chabäl: "français", runukulem: "ISO3"});
    expect(rnk).toEqual("fra");
  });
  test("runuk' rixin ISO1 toq majun ta", (): void => {
    const rnk: string = nuchabäl.runukChabäl({chabäl: "Kaqchikel", runukulem: "ISO1"});
    expect(rnk).toEqual(undefined);
  });
});

describe("Rukanoxïk rub'i' ch'ab'äl", (): void => {
  let nuchabäl: Nuchabäl;
  beforeAll(() => {
    nuchabäl = new Nuchabäl({});
  });

  test("nuch'ab'äl", (): void => {
    const rbi: string = nuchabäl.rubiChabäl({runuk: "kaq"});
    expect(rbi).toEqual("Kaqchikel");
  });
  test("Glottologue", (): void => {
    const rbi: string = nuchabäl.rubiChabäl({runuk: "kaqc1270", runukulem: "glottologue"});
    expect(rbi).toEqual("Kaqchikel");
  });
  test("ISO", (): void => {
    const rbi: string = nuchabäl.rubiChabäl({runuk: "cak", runukulem: "ISO"});
    expect(rbi).toEqual("Kaqchikel");
  });
  test("ISO1", (): void => {
    const rbi: string = nuchabäl.rubiChabäl({runuk: "fr", runukulem: "ISO1"});
    expect(rbi).toEqual("français");
  });
  test("ISO1 toq e k'iy", (): void => {
    const rbi: string = nuchabäl.rubiChabäl({runuk: "fr", runukulem: "ISO"});
    expect(rbi).toEqual("français");
  });
  test("ISO3 toq e k'iy", (): void => {
    const rbi: string = nuchabäl.rubiChabäl({runuk: "fra", runukulem: "ISO"});
    expect(rbi).toEqual("français");
  });
});

describe("Rukanoxïk rutz'ib'anem ch'ab'äl", (): void => {
  let nuchabäl: Nuchabäl;
  beforeAll(() => {
    nuchabäl = new Nuchabäl({});
  });

  test("Kaqchikel", (): void => {
    const rtzb: string = nuchabäl.rutzibChabäl({runuk: "kaq"});
    expect(rtzb).toEqual("ltn");
  });
  test("தமிழ்", (): void => {
    const rtzb: string = nuchabäl.rutzibChabäl({runuk: "த"});
    expect(rtzb).toEqual("த");
  });
});

describe("Rukanoxïk rajilanïk ch'ab'äl", (): void => {
  let nuchabäl: Nuchabäl;
  beforeAll(() => {
    nuchabäl = new Nuchabäl({});
  });

  test("Kaqchikel", (): void => {
    const rjln: string = nuchabäl.rajilanïkChabäl({runuk: "kaq"});
    expect(rjln).toEqual("Mayab'");
  });
  test("தமிழ்", (): void => {
    const rjln: string = nuchabäl.rajilanïkChabäl({runuk: "த"});
    expect(rjln).toEqual("தமிழ்");
  });
});

describe("Kitz'b'anem ch'ab'äl", (): void => {
  let nuchabäl: Nuchabäl;
  beforeAll(() => {
    nuchabäl = new Nuchabäl({});
  });

  test("K'o konjelal tz'ib'anem", (): void => {
    const kinuk_tzib = [...Object.keys(nuchabäl.retamabälTzibanem)];
    const kitzib_chabal = [
      ...new Set(
        Object.keys(nuchabäl.retamabälChabäl)
          .map((x) => nuchabäl.runukChabäl({chabäl: x}))
          .filter((x) => x)
      ),
    ];
    expect(
      kitzib_chabal.map((x) => kinuk_tzib.includes(x)).every((x) => x)
    ).toEqual(true);
  });
  test("Rub'i' tz'ib'anem", (): void => {
    const rubi: string = nuchabäl.rubiTzibanem({runuk: "த"});
    expect(rubi).toEqual("தமிழ்");
  });
  test("Rucholanem tz'ib'anem", (): void => {
    const rubi: string = nuchabäl.rucholanemTzibanem({runuk: "த"});
    expect(rubi).toEqual("→↓");
  });
  test("Rajilanik tz'ib'anem", (): void => {
    const rubi: string = nuchabäl.rajilanïkTzibanem({runuk: "த"});
    expect(rubi).toEqual("தமிழ்");
  });
});
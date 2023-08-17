import { bds, type générerClient } from "@constl/ipa/";
import { கிளி } from "@lassi-js/kili";

import {
  jaqbälKikajtzïkChabäl,
  jaqbälKikajtzïkTzibanem,
  runukMolajKel,
  runukRucheelRunukChabäl,
  runukRucheelRajilanïkChabäl,
  runukRucheelRubiChabäl,
  runukRucheelRutzibanemChabäl,
  runukRucheelRunukGlChabäl,
  runukRucheelRunukI1Chabäl,
  runukRucheelRunukI2Chabäl,
  runukRucheelRunukI3Chabäl,
  runukRujalojRunukGlChabäl,
  runukRujalojRunukI1Chabäl,
  runukRujalojRunukI2Chabäl,
  runukRujalojRunukI3Chabäl,
  runukRujalojRunukChabäl,
  runukRujalojRajilanïkChabäl,
  runukRujalojRubiChabäl,
  runukRujalojRutzibanemChabäl,
  runukRucheelRunukTzib,
  runukRucheelRajilanïkTzib,
  runukRucheelRubiTzib,
  runukRucheelRucholanemTzib,
  runukRucheelRutzibTzib,
  runukRujalojRunukTzib,
  runukRujalojRajilanïkTzib,
  runukRujalojRubiTzib,
  runukRujalojRucholanemTzib,
  runukRujalojRutzibTzib,
  retalTzibNuchabäl,
} from "@/jantape.js";

const RubanikilRuxeelTzij: bds.schémaSpécificationBd = {
  licence: "ODbl-1_0",
  motsClefs: [retalTzibNuchabäl],
  tableaux: [
    {
      cols: [
        {
          idColonne: runukRucheelRunukChabäl,
          idVariable: runukRujalojRunukChabäl,
          index: true,
        },
        {
          idColonne: runukRucheelRajilanïkChabäl,
          idVariable: runukRujalojRajilanïkChabäl,
        },
        {
          idColonne: runukRucheelRubiChabäl,
          idVariable: runukRujalojRubiChabäl,
        },
        {
          idColonne: runukRucheelRutzibanemChabäl,
          idVariable: runukRujalojRutzibanemChabäl,
        },
        {
          idColonne: runukRucheelRunukGlChabäl,
          idVariable: runukRujalojRunukGlChabäl,
        },
        {
          idColonne: runukRucheelRunukI1Chabäl,
          idVariable: runukRujalojRunukI1Chabäl,
        },
        {
          idColonne: runukRucheelRunukI2Chabäl,
          idVariable: runukRujalojRunukI2Chabäl,
        },
        {
          idColonne: runukRucheelRunukI3Chabäl,
          idVariable: runukRujalojRunukI3Chabäl,
        },
      ],
      clef: jaqbälKikajtzïkChabäl,
    },
    {
      cols: [
        {
          idColonne: runukRucheelRunukTzib,
          idVariable: runukRujalojRunukTzib,
          index: true,
        },
        {
          idColonne: runukRucheelRajilanïkTzib,
          idVariable: runukRujalojRajilanïkTzib,
        },
        {
          idColonne: runukRucheelRubiTzib,
          idVariable: runukRujalojRubiTzib,
        },
        {
          idColonne: runukRucheelRucholanemTzib,
          idVariable: runukRujalojRucholanemTzib,
        },
        {
          idColonne: runukRucheelRutzibTzib,
          idVariable: runukRujalojRutzibTzib,
        },
      ],
      clef: jaqbälKikajtzïkTzibanem,
    },
  ],
};

export type RucholajEtamabälChabäl = {
  [runukRucheelRunukChabäl]: string;
  [runukRucheelRajilanïkChabäl]: string;
  [runukRucheelRubiChabäl]: string;
  [runukRucheelRutzibanemChabäl]: string;
  [runukRucheelRunukGlChabäl]?: string;
  [runukRucheelRunukI1Chabäl]?: string;
  [runukRucheelRunukI2Chabäl]?: string;
  [runukRucheelRunukI3Chabäl]?: string;
};

export type RucholajEtamabälTzibanem = {
  [runukRucheelRunukTzib]: string;
  [runukRucheelRajilanïkTzib]: string;
  [runukRucheelRubiTzib]: string;
  [runukRucheelRucholanemTzib]: string;
  [runukRucheelRutzibTzib]: string;
};

export type KelChumilChabäl = கிளி<RucholajEtamabälChabäl>;
export type KelChumilTzibanem = கிளி<RucholajEtamabälTzibanem>;

export const tachojmisajKel = ({
  chumil,
}: {
  chumil: ReturnType<typeof générerClient>;
}): {
  kelChabäl: KelChumilChabäl;
  kelTzibanem: KelChumilTzibanem;
} => {
  const kelChabäl = new கிளி<RucholajEtamabälChabäl>({
    விண்மீன்: chumil,
    அட்டவணை_சாபி: jaqbälKikajtzïkChabäl,
    வார்ப்புரு: RubanikilRuxeelTzij,
    குழு_அடையாளம்: runukMolajKel,
  });

  const kelTzibanem = new கிளி<RucholajEtamabälTzibanem>({
    விண்மீன்: chumil,
    அட்டவணை_சாபி: jaqbälKikajtzïkTzibanem,
    வார்ப்புரு: RubanikilRuxeelTzij,
    குழு_அடையாளம்: runukMolajKel,
  });

  return {
    kelChabäl,
    kelTzibanem,
  };
};

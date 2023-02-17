export type RubanikilEtamabälChabäl = {
  "rb'": string;
  tz?: string;
  aj?: string;
  rn: { [x: string]: string };
};

export type RubanikilEtamabälTzibanem = {
  "rb'": string;
  ch: string;
  aj: string;
  tz: string;
};

export type RubanikilKetamabälTaqChabäl = {
  [ch: string]: RubanikilEtamabälChabäl;
};

export type RubanikilKetamabälTaqTzibanem = {
  [tz: string]: RubanikilEtamabälTzibanem;
};

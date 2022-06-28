export interface Project {
  id: string;
  name: string;
  description: string;
  artistName: string;
  invocations: BigInt;
  maxInvocations: BigInt;
  activatedAt: BigInt;
  scriptJSON: string;
  active: boolean;
  paused: boolean;
  complete: boolean;
  tokens: Token[];
  minterConfiguration?: MinterConfiguration;
}

export interface Account {
  id: string;
}
export interface Token {
  id: string;
  tokenId: string;
  invocation: BigInt;
  uri: string;
  createdAt: BigInt;
  owner?: Account;
}

export interface MinterConfiguration {
  basePrice: BigInt;
  startPrice: BigInt;
  priceIsconfigured: boolean;
  currencySymbol: string;
  currencyAddress: string,
  startTime: BigInt,
  endTime: BigInt;
}

export interface Trait {
  trait_type: string;
  value: string;
}

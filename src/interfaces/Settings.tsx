interface DefaultValuesInterface {
  type?: string,
  fontSize?: number,
  bevel?: boolean,
  engine?: string,
  gravity?: number,
  color?: string,
  bg?: string,
  thickness?: number,
  bevelSize?: number,
  brightness?: number,
  typeCount?: number,
  engineCount?: number,
  panel?: boolean
}

interface SettingsInterface {
  setData: (arg0: { payload: boolean | number | string; name: string; }) => void,
  increment?: (arg: { name: string; }) => void,
  decrement?: (arg: { name: string; }) => void;
}

export { DefaultValuesInterface, SettingsInterface }
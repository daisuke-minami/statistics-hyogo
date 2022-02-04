export const convertPrefCodeToString = (prefCode: number): string => {
  return ('0000000000' + prefCode).slice(-2) + '000'
}

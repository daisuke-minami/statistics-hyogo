interface contents {
  list: FieldList[]
}

interface FieldList {
  fieldTitle: string
  fieldId: string
  menu: Menu
}

interface Menu {
  prefecture: Prefecture[]
  city: Prefecture[]
}

interface Prefecture {
  menuTitle: string
  menuId: string
  card: Card[]
}

interface Card {
  cardTitle: string
  cardId: string
}

interface Menu {
  landweather: StatField
  population: StatField
  agriculture: StatField
  miningindustry: StatField
  commercial: StatField
  economy: StatField
  construction: StatField
  tourism: StatField
  educationsports: StatField
  administrativefinancial: StatField
  international: StatField
}

interface StatField {
  prefecture?: MenuItems[]
  city?: MenuItems[]
}

interface MenuItems {
  menuTitle: string
  menuId: string
}

interface RootObject {
  list: List[]
}

interface List {
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

export const filterParamsModule = {
  namespaced: true,
  state: () => ({
    brandsList: [
      { text: 'Macrametr', value: 'macrametr' },
      { text: 'Зефирка', value: 'zefirka' },
      { text: 'Гамма', value: 'gamma' },
      { text: 'Сибшнур', value: 'sibshnur' },
			{ text: 'Yarn Art', value: 'yarnart' },
    ],
    itemTypesList: [
      { text: 'Шпагат, шнуры, веревки', value: 'shpagat' },
      { text: 'Кольца', value: 'kolca' },
      { text: 'Джут', value: 'dzut' },
			{ text: 'Пряжа', value: 'priaja' },
    ],
    itemCompositionsList: [
      { text: 'Хлопок', value: 'cotton' },
      { text: 'Синтетика', value: 'polyester' },
      { text: 'С сердечником', value: 'serdechnik' },
    ],
    itemsWidthList: [
      { text: '3', value: '3' },
      { text: '4', value: '4' },
      { text: '4.5', value: '4.5' },
      { text: '5', value: '5' },
    ]
  }),
  getters: {
    brand: state => state.brandsList,
    type: state => state.itemTypesList,
    composition: state => state.itemCompositionsList,
    width: state => state.itemsWidthList,
  }
}

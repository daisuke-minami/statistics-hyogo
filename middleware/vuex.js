export default async ({ store }) => {
  await store.dispatch('topojson/fetchMaps')
  await store.dispatch('cityList/fetchCities')
  await store.dispatch('prefList/fetchPrefs')
  await store.dispatch('setting/fetchSetting')
}

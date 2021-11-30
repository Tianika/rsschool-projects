import Loader from './loader'

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: 'ccc40a4f31894080b74a4f2df04984da', // получите свой ключ https://newsapi.org/
    })
  }
}

export default AppLoader

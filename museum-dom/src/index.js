import './styles/style.scss'
import { videoSlider } from './modules/video.js'
import { randomImage } from './modules/gallery.js'
import { openForm } from './modules/tickets.js'
import { burgerMenu } from './modules/burger.js'
import { welcomeSlider } from './modules/welcome.js'
import { exploreSlider } from './modules/explore.js'

//videoProgress()
videoSlider()
randomImage()
openForm()
burgerMenu()
welcomeSlider()
exploreSlider()

//map
// mapboxgl.accessToken =
//   'pk.eyJ1IjoidGlhbmlrYSIsImEiOiJja3VnbmcycWUwdHRvMnZxZW9ibjAwM25mIn0.r_lAs0sJV68MyDoZQxd3wg'

// const map = new mapboxgl.Map({
//   container: 'map',
//   style: 'mapbox://styles/mapbox/light-v10',
//   center: [2.3364, , 48.86091],
//   zoom: 10,
// })

// const geojson = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [2.3333, 48.8602],
//       },
//       properties: {
//         title: 'Mapbox',
//         description: 'Greek hall',
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [2.3397, 48.8607],
//       },
//       properties: {
//         title: 'Mapbox',
//         description: 'Royal Palace',
//       },
//     },
//   ],
// }

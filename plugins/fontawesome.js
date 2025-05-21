import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faEyeDropper, 
  faPalette, 
  faDownload, 
  faCopy, 
  faSync, 
  faPlus, 
  faMinus,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

// Add the icons to the library
library.add(
  faEyeDropper, 
  faPalette, 
  faDownload, 
  faCopy, 
  faSync, 
  faPlus, 
  faMinus,
  faTrash,
  faGithub
)

// This is important to avoid SVG CSS being accidentally overwritten
config.autoAddCss = false

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})

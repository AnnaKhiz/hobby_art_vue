import { createStore } from "vuex";
import {linksModule} from "@/store/linksModule"

export default createStore({

  modules: {

    links: linksModule
  }
})




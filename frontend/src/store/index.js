import { createStore } from "vuex";
import { linksModule } from "@/store/linksModule"
import { userModule } from "@/store/userModule"
import {dialogModule} from "@/store/dialogModule";



export default createStore({
  modules: {
    dialog: dialogModule,
    links: linksModule,
    user: userModule
  }
})




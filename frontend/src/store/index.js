import { createStore } from "vuex";
import { linksModule } from "@/store/linksModule"
import { userModule } from "@/store/userModule"

export default createStore({

  modules: {
    links: linksModule,
    user: userModule
  }
})




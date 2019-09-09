// import axios from "axios";
// import { ActionTree } from "vuex";
// import { RootState } from "../types";
// import { ProfileState, User } from "./types";

// export const actions: ActionTree<ProfileState, RootState> = {
//   fetchData({ commit }): any {
//     axios({
//       url: "https://...."
//     }).then(
//       response => {
//         const payload: User = response && response.data;
//         commit("profileLoaded", payload);
//       },
//       error => {
//         console.log(error);
//         commit("profileError");
//       }
//     );
//   }
// };

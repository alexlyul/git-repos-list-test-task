import Vue from 'vue';
import Vuex from 'vuex';
import {
  ACT_FETCH_REPOSITORIES,
  GET_REPOS,
  GET_TOKEN,
  MUT_COMMIT_REPOS,
  MUT_SET_TOKEN,
} from '@/store/storeMethods';
import getRepos from '@/utils/githubApi';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authToken: '',
    repositories: [],
  },
  getters: {
    [GET_REPOS]: (state) => (state.repositories || [])
      .map((i) => ({
        key: i.full_name,
        ...i,
      })),

    [GET_TOKEN]: (state) => state.authToken,
  },

  mutations: {
    [MUT_COMMIT_REPOS](state, repos) {
      state.repositories = repos;
    },

    [MUT_SET_TOKEN]: (state, token) => {
      state.authToken = token;
    },
  },

  actions: {
    async [ACT_FETCH_REPOSITORIES](store, {
      org, type, page, perPage,
    }) {
      const repos = await getRepos({
        token: store.getters[GET_TOKEN],
        org,
        type,
        page,
        perPage,
      });
      store.commit(MUT_COMMIT_REPOS, repos);
    },

  },

});

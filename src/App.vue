<template>
  <div id="app">
    <h1>View Github repos of any organization here!</h1>
    <div class="search-bar">
      <InputSwitch v-model="repositoriesType"
                   :options="typesOptions"
      />
      <InputText v-model.trim="authToken"
                 name="token"
                 @input="v => updateAuthToken(v)"
                 label="Auth token (optional)"
                 placeholder="Auth token (optional)"
      />
      <InputSubmit v-model.trim="organization"
                   placeholder="Organization"
                   button-text="Load!"
                   label="Organization name"
                   :action="debounce(loadRepos, 1000)"
                   :isPreloading="isLoading"
      />
    </div>

    <div class="table" v-if="repos.length">
      <Table :cols="tableCols"
             :is-preloading="isLoading"
             :rows="repos"
             v-selectable
             max-height="700px"/>
    </div>

    <Pagination v-model="pagination" @input="loadRepos()"/>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import { ACT_FETCH_REPOSITORIES, GET_REPOS, MUT_SET_TOKEN } from '@/store/storeMethods';
import awaitFor from '@/utils/awaitFor';
import InputText from '@/components/InputText.vue';
import InputSwitch from '@/components/InputSwitch.vue';
import Table from '@/components/Table.vue';
import debounce from 'lodash.debounce';
import InputSubmit from './components/InputSubmit.vue';
import Pagination from './components/Pagination.vue';

export default {
  name: 'App',
  components: {
    InputSubmit,
    InputSwitch,
    InputText,
    Table,
    Pagination,
  },

  computed: {
    repos() {
      return this.$store.getters[GET_REPOS];
    },

  },

  watch: {
    organization() {
      this.isNewOrganization = true;
    },
    pagination(current, old) {
      if (current.perPage !== old.perPage) {
        this.pagination.page = 1;
      }
    },
  },

  data() {
    return {
      isLoading: false,
      organization: '',
      repositoriesType: 'public',
      typesOptions: [
        { value: 'private', label: 'Private repos' },
        { value: 'public', label: 'Public repos' },
      ],
      authToken: '',
      tableCols: [
        { title: 'Name', prop: 'full_name' },
        { title: 'Description', prop: 'description' },
        { title: 'Forks count', prop: 'forks' },
        { title: 'Link', prop: 'url' },
      ],
      pagination: {
        pages: 1,
        perPage: 30,
        page: 1,
      },
      isNewOrganization: false,
    };
  },

  methods: {
    debounce,
    ...mapMutations([
      MUT_SET_TOKEN,
    ]),

    ...mapActions([
      ACT_FETCH_REPOSITORIES,
    ]),

    updateAuthToken(token) {
      this[MUT_SET_TOKEN](token);
    },

    loadRepos() {
      if (!this.organization) {
        this.toastInfo('Fill in organization name!');
        return;
      }

      if (this.repositoriesType === 'private' && !this.authToken) {
        this.toastInfo('You cannot load private repos without authorization token!');
        return;
      }

      this.isLoading = true;
      this[ACT_FETCH_REPOSITORIES]({
        org: this.organization,
        type: this.repositoriesType,
        perPage: this.pagination.perPage,
        page: this.pagination.page,
      })
        .catch((err) => {
          if (err.status === 404) {
            this.toastError('Organization not found');
            return;
          }
          this.toastError('Unexpected error happened loading repositories');
          throw err;
        })
        .finally(async () => {
          await awaitFor(500);
          this.isLoading = false;
          if (this.isNewOrganization) {
            this.pagination.pages = Math.ceil(this.repos.length / this.pagination.perPage);
          }

          if (this.isNewOrganization) this.isNewOrganization = false;
        });
    },
  },

};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px 50px;
  max-height: 100%;
  max-width: 100%;
  overflow: auto;
  @media screen and (max-width: 1024px) {
    padding: 15px 10px;
  }
}

.search-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  & > * {
    margin: 15px;
  }
}

.mb-10 {
  margin-bottom: 10px;
}

.table {
  margin: 30px 0;
  max-width: 1024px;
}
</style>

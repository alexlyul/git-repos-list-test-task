<template>
  <div v-if="value.pages" class="c-pagination">

    <div class="c-pagination__row">
      <button @click="paginate(value.page - 1, value.perPage)"
              class="c-pagination__btn"><i class="material-icons">arrow_back</i> Prev
      </button>
      <div>Current page: {{ value.page }}</div>
      <button @click="paginate(value.page + 1, value.perPage)"
              class="c-pagination__btn"><i class="material-icons">arrow_forward</i> Next
      </button>
    </div>

    <div class="c-pagination__row">
      <div>Per page:</div>
      <button v-for="option in perPageOptions"
              :disabled="option === value.perPage"
              @click="paginate(value.page, option)"
              class="c-pagination__btn"
              :key="option">{{ option }}
      </button>
    </div>

  </div>
</template>

<script>

export default {
  name: 'pagination',
  props: {
    value: {
      type: Object,
      default: () => ({
        pages: 0,
        page: 1,
        perPage: 30,
      }),
    },
  },

  data() {
    return {
      perPageOptions: [30, 40, 50, 70, 100],
    };
  },

  methods: {
    paginate(page, perPage) {
      this.$emit('input', {
        pages: this.value.pages,
        page: page <= 0 ? 1 : page,
        perPage,
      });
    },
  },

};
</script>

<style lang="scss">
@import "../scss/button";

.c-pagination {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__row {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    margin-top: 20px;
  }

  &__btn {
    @extend .button;
    margin: 0 5px;
    padding: 5px;
    min-width: 2em;

    .material-icons {
      font-size: 14px;
      line-height: 14px;
    }
  }
}
</style>

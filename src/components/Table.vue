<template>
  <PreloaderCover :is-preloading="isPreloading">
    <div :class="$style['c-table__wrapper']" :style="{ maxHeight: maxHeight }">
      <table :class="$style['c-table']">
        <thead>
        <tr v-if="cols.length">
          <th v-for="col in cols"
              scope="col"
              :key="col.prop">{{ col.title }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in rows" :key="row.key">
          <td v-for="col in cols"
              :key="col.prop"
              :title="col.title"
          >{{ row[col.prop] }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </PreloaderCover>
</template>

<script>

import IsPreloading from '@/components/IsPreloading';
import PreloaderCover from '@/components/PreloaderCover.vue';

export default {
  name: 'Table',
  mixins: [IsPreloading],
  components: {
    PreloaderCover,
  },
  props: {
    cols: {
      default: () => [],
      type: Array,
    },
    rows: {
      default: () => [],
      type: Array,
    },
    maxHeight: {
      type: String,
      default: 'none',
    },
  },
};
</script>

<style lang="scss" module>

@import 'node_modules/bootstrap/scss/_functions';
@import 'node_modules/bootstrap/scss/_variables';
@import 'node_modules/bootstrap/scss/_mixins';
@import 'node_modules/bootstrap/scss/_tables';

.c-table__wrapper {
  max-width: 100%;
  overflow: auto;
  position: relative;
}

.c-table {
  @extend .table;
  @extend .table-striped;
  @extend .thead-light;
  @extend .table-bordered;

  thead {
    user-select: none;
  }
}
</style>

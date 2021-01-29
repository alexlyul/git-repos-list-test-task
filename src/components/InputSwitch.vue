<template>
  <ul :class="$style['c-input-switch']">
    <li v-for="option of options"
        :key="option.value"
        @click="$emit('input', option.value)"
        :class="{
          [$style['c-input-switch__item']]: true,
          [$style['c-input-switch__item--active']]: option.value === passedModel
        }"
    >{{ option.label }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'InputSwitch',
  model: {
    prop: 'passedModel',
    event: 'input',
  },
  props: {
    passedModel: { default: '' },
    options: { type: Array },
  },
};
</script>

<style lang="scss" module>
@import "../scss/colors";

$borderRadius: 10px;

.c-input-switch {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  &__item {
    user-select: none;
    cursor: pointer;
    padding: 10px 20px;
    background: white;
    outline: none;
    border: 2px solid $input-border-color;
    border-radius: 0;
    transition: $transition;
    border-right: 0;

    &:hover {
      background-color: $focus-color;
      color: white;
    }

    &:first-of-type {
      border-bottom-left-radius: $borderRadius;
      border-top-left-radius: $borderRadius;
    }

    &:last-of-type {
      border-bottom-right-radius: $borderRadius;
      border-top-right-radius: $borderRadius;
      border-right: 2px solid $input-border-color;
    }

    &--active {
      background-color: #aabaec;
      color: white;
    }
  }
}
</style>

<template>
  <button v-bind="$attrs"
          v-on="$listeners"
          :class="$style['c-btn']"
  >
    <img v-show="isPreloading"
         src="../assets/circles-loader.svg"
         :class="$style['c-btn__preloader']"
         alt="null">
    <slot></slot>
  </button>
</template>

<script>
import IsPreloading from '@/components/IsPreloading';

export default {
  name: 'Btn',
  mixins: [IsPreloading],
  props: {
    isPreloading: {
      default: false,
    },
    compact: {
      default: false,
    },
  },
};
</script>

<style lang="scss" module>
@import "../scss/button";
@import "../scss/colors";
@import "../scss/animations";

.c-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
  transition: $transition;
  outline: none;
  border: 2px solid $input-border-color;
  color: #99A3BA;
  cursor: pointer;
  user-select: none;

  &:focus {
    background-color: $focus-color;
    color: white;
    outline: none;
    border-color: $focus-color;
  }

  &:disabled {
    filter: grayscale(1);
    opacity: 0.85;
    cursor: not-allowed;
  }
}

.c-btn__preloader {
  animation: rotating 2s linear infinite;
  width: 1em;
  height: auto;
  margin-right: .5em;
}
</style>

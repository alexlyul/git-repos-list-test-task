<template>
  <div :class="$style['c-preloader-wrapper']" ref="wrapper">
    <div :class="{ [$style['inner-component']]: isPreloading }">
      <slot>{{ placeholder ? placeholder : 'No component...' }}</slot>
    </div>
    <transition name="opacity">
      <div v-show="isPreloading"
           :class="$style['c-preloader-wrapper__cover']"
           @click.self.prevent
      >
        <img src="../assets/circles-loader.svg"
             :class="$style['c-preloader-circle']"
             alt="null">
      </div>
    </transition>
  </div>
</template>

<script>
import IsPreloading from '@/components/IsPreloading';

export default {
  name: 'preloader-cover',
  mixins: [IsPreloading],
  props: {
    placeholder: {
      type: String,
    },
  },
};
</script>

<style lang="scss" module>
@import "../scss/animations";

.c-preloader-circle {
  animation: rotating 2s linear infinite;
}

.c-preloader-wrapper {
  position: relative;
  height: available;

  &__cover {
    user-select: none;
    background: rgba(#222, 0.2);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.inner-component {
  z-index: 1;
  min-height: 40px;
}
</style>

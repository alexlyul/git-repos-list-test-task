<template>
  <div :class="$style['c-input-text']">
    <label :for="id" hidden>{{ label }}</label>
    <input
      :id="id"
      :value="value"
      ref="input"
      :name="name"
      @keypress.enter="action && action($event.target.value)"
      @input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
      :class="$style['c-input-text__field']"
    >
  </div>
</template>

<script>
import InputMixin from '@/components/InputMixin';

export default {
  name: 'InputText',
  mixins: [InputMixin],
};
</script>

<style lang="scss" module>
.c-input-text {
  @import "../scss/colors";
  $borderRadius: 10px;

  &__field {
    padding: 10px 20px;
    background: white;
    outline: none;
    border: 2px solid $input-border-color;
    border-radius: $borderRadius;
    transition: $transition;
    &:focus {
      border-color: $focus-color;
    }
  }
}

</style>

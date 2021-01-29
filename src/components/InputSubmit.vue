<template>
  <div :class="$style['c-input-submit']" class="c-input-submit">
    <InputText :label="label"
               name="organization"
               @input="v => $emit('input', v)"
               :placeholder="placeholder"
               :action="() => submit()"
    />

    <Btn @click="submit()"
         :is-preloading="isPreloading"
         :disabled="disabled"
         :class="$style['c-input-submit__button']"
    >{{ buttonText }}</Btn>
  </div>
</template>

<script>
import InputText from '@/components/InputText.vue';
import InputMixin from '@/components/InputMixin';
import Btn from '@/components/Btn.vue';

export default {
  name: 'InputSubmit',
  components: {
    InputText,
    Btn,
  },

  mixins: [InputMixin],

  props: {
    isPreloading: {
      default: false,
    },
    buttonText: {
      default: 'Submit',
    },
    disabled: {
      default: false,
    },
  },

  data() {
    return {
    };
  },

  methods: {
    submit() {
      if (this.action) {
        this.action(this.value);
      }
    },

  },
};
</script>

<style lang="scss" module>
@import "../scss/colors";
@import "../scss/button";

$borderRadius: 10px;

.c-input-submit {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  &__button {
    @extend .button;
    border-radius: $borderRadius;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

<style lang="scss">
.c-input-submit {
  .c-input-text > .c-input-text__field {
    margin-right: 10px;
  }
}
</style>

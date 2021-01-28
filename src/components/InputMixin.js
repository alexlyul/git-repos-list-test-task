import getId from '@/utils/getId';

export default {
  name: 'InputMixin',
  props: {
    label: {
      default: '',
    },
    placeholder: {
      default: '',
    },
    action: {
      type: Function,
      // eslint-disable-next-line no-unused-vars
      default: (value) => { /** do something */ },
    },
    value: {
      default: '',
    },
    name: {
      default: null,
    },
  },

  data() {
    return {
      id: getId('inputSubmit'),
    };
  },
};

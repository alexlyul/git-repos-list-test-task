import Vue from 'vue';
import {
  toastError,
  toastInfo,
  toastSuccess,
  toastWarn,
} from './Notification';

const VueToast = {
  // eslint-disable-next-line no-shadow
  install(Vue) {
    Object.assign(Vue.prototype, {
      toastInfo,
      toastError,
      toastSuccess,
      toastWarn,
    });
  },
};

Vue.use(VueToast);

export default VueToast;

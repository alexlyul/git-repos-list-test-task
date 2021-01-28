import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './scss/global.scss';
import '@/components/Notifications/VueNotification';

Vue.config.productionTip = false;

export default new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

// and few directives
{
  function selectText(event) {
    const el = event.target;
    if (document.body.createTextRange) {
      const range = document.body.createTextRange();
      range.moveToElementText(el);
      range.select();
    } else if (window.getSelection) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(el);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      // eslint-disable-next-line no-console
      console.warn('Could not select text in node: Unsupported browser.');
    }
  }

  /**
   * Select text inside element on single click
   */
  Vue.directive('selectable', {
    bind(el) {
      el.addEventListener('click', selectText);
    },

    unbind(el) {
      el.removeEventListener('click', selectText);
    },
  });

  let mouseDownTarget;
  const handleMouseDown = (evt) => {
    mouseDownTarget = evt.target;
  };

  /**
   * Click outside handler
   */
  Vue.directive('clickoutside', {

    bind(el, binding, vnode) {
      // eslint-disable-next-line no-param-reassign
      el['@clickoutside'] = (e) => {
        const mouseUpTarget = e.target;
        const popupElm = vnode && vnode.context && vnode.context.popupElm;
        if (
          mouseDownTarget
          && mouseUpTarget
          && !el.contains(mouseUpTarget)
          && !el.contains(mouseDownTarget)
          && !(
            popupElm
            && (popupElm.contains(mouseDownTarget)
              || popupElm.contains(mouseUpTarget))
          )
          && binding.expression
          && vnode.context[binding.expression]
        ) {
          binding.value();
        }
      };

      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', el['@clickoutside']);
    },

    unbind(el) {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', el['@clickoutside']);
    },

  });
}

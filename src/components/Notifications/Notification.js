// eslint-disable-next-line max-classes-per-file
import './notification.scss';
import awaitFor from '@/utils/awaitFor';
import whenDocumentIsReady from '@/utils/whenDocumentIsReady';

/**
 * @description generate html node
 * @param {string}tagName
 * @param {string}className
 * @param {string|number|boolean?}text
 * @returns {HTMLElement}
 */
function generateElement(tagName, className, text = '') {
  const el = document.createElement(tagName);
  if (className) el.className = className;
  if (text) el.innerText = text;
  return el;
}

const notificationTypes = {
  success: { class: 'notification__success', icon: 'check_circle' },
  error: { class: 'notification__error', icon: 'error_outline' },
  info: { class: 'notification__info', icon: 'info' },
  warning: { class: 'notification__warning', icon: 'warning' },
};

class Notification {
  /**
   * @description Generates self destructed block
   * @param {string}text
   * @param {"error"|"info"|"warning"|"success"}type
   * @param {number?}seconds number of seconds
   * @param {string}prefix
   */
  constructor(text, type, seconds, prefix = '') {
    /**
     * @type {HTMLElement}
     */
    this.node = generateElement('div', `notification ${notificationTypes[type].class}`);
    this.node.appendChild(generateElement('i', 'material-icons', notificationTypes[type].icon));
    this.node.appendChild(generateElement('span', '', (prefix ? (`${prefix} ${text}`) : text)));
    const closeIcon = generateElement('i', 'material-icons close-btn', 'close');
    closeIcon.addEventListener('click', () => this.fadeOut());
    this.node.appendChild(closeIcon);
    this.isHovered = false;
    this.node.addEventListener('mouseover', () => {
      this.isHovered = true;
    });
    this.node.addEventListener('mouseleave', () => {
      this.isHovered = false;
    });

    this.lifeTime = seconds * 1000;
  }

  async fadeIn() {
    this.node.style.transform = 'translateX(200%) scaleY(0)';
    await awaitFor(100);
    this.node.style.transform = 'translateX(0) scaleY(1)';
    await awaitFor(this.lifeTime);
    await this.runCountdown();
  }

  async runCountdown() {
    if (!this.isHovered) {
      this.fadeOut();
    } else {
      await awaitFor(1500);
      this.runCountdown();
    }
  }

  async fadeOut() {
    this.node.style.transform = 'translateX(200%) scaleY(0)';
    await awaitFor(200);
    this.node.style.display = 'none';
    await awaitFor(100);
    this.node.remove();
  }
}

const Notifications = new class Notifications {
  constructor() {
    /**
     * @type {HTMLElement|null}
     */
    this.notificationsBar = null;
    this.notificationsBar = generateElement('div', 'notification-bar');
    whenDocumentIsReady.then(() => document.body.appendChild(this.notificationsBar));
  }

  /**
   * @description Generates self destructed block
   * @param {string}text
   * @param {"error"|"info"|"warning"|"success"}type
   * @param {number?}seconds number of seconds
   * @param {string?}prefix
   */
  async notify(text, type, seconds = 3, prefix = '') {
    await whenDocumentIsReady;
    if (this.notificationsBar) {
      const notification = new Notification(text, type, seconds, prefix);
      this.notificationsBar.prepend(notification.node);
      await notification.fadeIn();
    } else {
      // eslint-disable-next-line prefer-rest-params
      setTimeout(() => this.notify(...arguments), 500);
    }
  }
}();

export const toastInfo = (msg, seconds = 4) => Notifications.notify(msg, 'info', seconds);
export const toastError = (msg, seconds = 7) => Notifications.notify(msg, 'error', seconds);
export const toastSuccess = (msg, seconds = 5) => Notifications.notify(msg, 'success', seconds);
export const toastWarn = (msg, seconds = 4) => Notifications.notify(msg, 'warning', seconds);

export default Notifications;

import Notifications, { NotificationType } from "./Notifications";
import { createElWithClasses } from "./getNotificationElement";

import styles from "./styles.module.scss";

let prevTime = 0;
function loop(time: number) {
  const dt = (time - prevTime) / 1000;
  prevTime = time;

  if(notifications) {
    notifications.update(dt);
  }

  requestAnimationFrame(loop);
}

let notifications: Notifications;

function init() {
  const container = createElWithClasses<HTMLDivElement>("div", styles.notifications);
  document.body.appendChild(container);

  notifications = new Notifications(container);

  requestAnimationFrame(loop);
}

function pushNotification(type: NotificationType, message: string): number {
  if(!notifications) {
    console.error("init() has not been executed");
    return -1;
  }

  return notifications.push(type, message);
}

function success(message: string): number {
  return pushNotification(NotificationType.Success, message);
}

function error(message: string): number {
  return pushNotification(NotificationType.Error, message);
}

function loading(message: string): number {
  return pushNotification(NotificationType.Loading, message);
}

function remove(id: number): boolean {
  if(!notifications)
    return false;

  return notifications.remove(id);
}

export default {
  init,
  success,
  error,
  loading,
  remove,
};

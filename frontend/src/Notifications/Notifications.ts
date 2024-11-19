import { SUCCESS_ICON, ERROR_ICON } from "./notificationIcons";

import getNotificationElement from "./getNotificationElement";

import styles from "./styles.module.scss";

type Container = HTMLDivElement;

export enum NotificationType {
  Success,
  Error,
  Loading,
}

type NotificationData = {
  id: number;
  type: NotificationType;
  message: string;
};

function lerp(start: number, end: number, time: number): number {
  return start + (end - start) * time;
}

function smoothStep(time: number): number {
  return (Math.sin(Math.PI * time - Math.PI * 0.5) + 1) * 0.5;
}

enum NotificationState {
  FadingIn,
  Waiting,
  FadingOut,
}

class Notification {
  public id: number;
  private parent: Notifications;
  private type: NotificationType;
  private messsage: string;
  private el: HTMLDivElement;

  private time = 0;
  private translateAmount = 100;

  private state = NotificationState.FadingIn;

  constructor(parent: Notifications, data: NotificationData) {
    this.parent = parent;
    this.id = data.id;
    this.type = data.type;
    this.messsage = data.message;

    this.el = getNotificationElement({
      ...this.getElementProps(),
      message: this.messsage,
      closeNotification: () => {
        this.removeSelf();
      },
      hideCloseButton: this.type === NotificationType.Loading,
    });
  }

  private setState(state: NotificationState): void {
    this.state = state;
    this.time = 0;
  }

  private getElementProps(): { typeClass: string, icon: string } {
    switch(this.type) {
      case NotificationType.Success: {
        return {
          typeClass: styles.success,
          icon: SUCCESS_ICON
        };
      };
      case NotificationType.Error: {
        return {
          typeClass: styles.error,
          icon: ERROR_ICON
        };
      };
      case NotificationType.Loading: {
        return {
          typeClass: styles.loading,
          icon: `<span class="${styles.spinner}"></span>`,
        };
      };
      default: {
        throw new Error("UNREACHABLE");
      };
    }
  }

  getHTMLEl(): HTMLDivElement {
    return this.el;
  }

  getHeight(): number {
    return this.el.clientHeight;
  }

  update(dt: number): void {
    this.time += dt;

    switch(this.state) {
      case NotificationState.FadingIn: {
        if(this.time / 0.3 >= 1) {
          this.setState(NotificationState.Waiting);
          this.el.style.transform = "translateX(0)";
        } else {
          this.translateAmount = lerp(100, 0, smoothStep(this.time / 0.3));
          this.el.style.transform = `translateX(${this.translateAmount}%)`;
        }
      } break;
      case NotificationState.Waiting: {
        if(this.type === NotificationType.Loading) return;

        if(this.time > 5) {
          this.setState(NotificationState.FadingOut);
        }
      } break;
      case NotificationState.FadingOut: {
        if(this.time / 0.3 >= 1) {
          this.el.style.transform = "translateX(-100%)";
          this.parent.remove(this.id);
        } else {
          this.translateAmount = lerp(0, 100, smoothStep(this.time / 0.3));
          this.el.style.transform = `translateX(${this.translateAmount}%)`;
        }
      } break;
    }
  }

  removeSelf() {
    this.setState(NotificationState.FadingOut);
  }
}

class Notifications {
  private container: Container;
  private idCount = 0;

  notifications: Notification[] = [];

  constructor(container: Container) {
    this.container = container;
  }

  push(type: NotificationType, message: string): number {
    const id = ++this.idCount;
    const notification = new Notification(this, { id, type, message });

    this.notifications.push(notification);
    this.container.appendChild(notification.getHTMLEl());

    return id;
  }

  remove(id: number): boolean {
    const notification = this.notifications.find(n => n.id === id);

    if(!notification)
      return false;

    this.container.removeChild(notification.getHTMLEl());
    this.notifications = this.notifications.filter(n => n.id !== id);

    return true;
  }

  update(dt: number): void {
    for(const notification of this.notifications) {
      notification.update(dt);
    }
  }

  getById(id: number): Notification | null {
    return this.notifications.find(n => n.id === id) || null;
  }
}

export default Notifications;

// TODO: when a notification is removed all the notifications above it
// move down without any animation, that's something that needs to be fixed

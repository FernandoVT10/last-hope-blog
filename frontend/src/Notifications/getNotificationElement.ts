import styles from "./styles.module.scss";

import { CLOSE_ICON } from "./notificationIcons";

type TagName = keyof HTMLElementTagNameMap;

export function createElWithClasses<T extends HTMLElement>(tag: TagName, ...classes: string[]): T {
  const el = document.createElement(tag) as T;

  for(const cls of classes) {
    el.classList.add(cls);
  }

  return el;
}

function getCloseButton(closeNotification: Function): HTMLButtonElement {
  const closeButton = createElWithClasses<HTMLButtonElement>("button", styles.closeButton);
  closeButton.innerHTML = CLOSE_ICON;
  closeButton.addEventListener("click", () => closeNotification());
  return closeButton;
}

function getMessage(message: string): HTMLDivElement {
  const msgEl = document.createElement("p");
  msgEl.innerText = message;

  const bodyEl = createElWithClasses<HTMLDivElement>("div", styles.body);
  bodyEl.appendChild(msgEl);

  return bodyEl;
}

function getIcon(iconSvg: string): HTMLDivElement {
  const icon = createElWithClasses("span", styles.icon);
  icon.innerHTML = iconSvg;

  const iconContainer = createElWithClasses<HTMLDivElement>("div", styles.iconContainer);
  iconContainer.append(icon);

  return iconContainer;
}

type Props = {
  typeClass: string;
  message: string;
  icon: string;
  closeNotification: Function;
  hideCloseButton: boolean;
};

function getNotificationElement(props: Props): HTMLDivElement {
  const notification = createElWithClasses<HTMLDivElement>(
    "div", styles.notification, props.typeClass
  );
  notification.append(
    getIcon(props.icon),
    getMessage(props.message),
  );

  if(!props.hideCloseButton)
    notification.appendChild(getCloseButton(props.closeNotification));

  return notification;
}

export default getNotificationElement;

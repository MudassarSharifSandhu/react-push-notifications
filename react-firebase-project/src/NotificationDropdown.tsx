import React from "react";

interface Props {
  notifications: string[];
  markAsRead: (index: number) => void;
}

const NotificationDropdown: React.FC<Props> = ({
  notifications,
  markAsRead,
}) => {
  return (
    <div>
      <ul>
        {notifications.map((notification, index) => (
          <div>
            <p key={index} onClick={() => markAsRead(index)}>
              {notification}
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default NotificationDropdown;

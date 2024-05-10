import React from "react";

interface Props {
  unreadCount: number;
}

const BellIcon: React.FC<Props> = ({ unreadCount }) => {
  return (
    <div>
      <span>{unreadCount}</span>
      <img
        style={{ width: "10%" }}
        src="https://static.vecteezy.com/system/resources/previews/010/366/210/original/bell-icon-transparent-notification-free-png.png"
        alt="Bell Icon"
      />
    </div>
  );
};

export default BellIcon;

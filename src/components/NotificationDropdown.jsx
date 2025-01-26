import React, { useEffect, useState, useContext } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Typography,
  Divider,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getNotifications, markNotificationAsRead, clearAllNotifications } from '../services/api';
import AppContext from '../context/AppContext';

const NotificationDropdown = () => {
  const { state } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications(state.user.id);
        setNotifications(response.data.notifications);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };
    fetchNotifications();
  }, [state.user.id]);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await Promise.all(
        notifications.filter((notif) => !notif.read).map((notif) => markNotificationAsRead(notif.id))
      );
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true }))
      );
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const handleClearAll = async () => {
    try {
      await clearAllNotifications(state.user.id);
      setNotifications([]);
    } catch (err) {
      console.error('Error clearing notifications:', err);
    }
  };

  const unreadNotifications = notifications.filter((notif) => !notif.read);
  const readNotifications = notifications.filter((notif) => notif.read);

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={unreadNotifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: { width: '400px', maxHeight: '400px' },
        }}
      >
        <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Notifications</Typography>
          {notifications.length > 0 && (
            <>
              <Button onClick={handleMarkAllAsRead} size="small" color="primary">
                Mark All as Read
              </Button>
              <Button onClick={handleClearAll} size="small" color="secondary">
                Clear All
              </Button>
            </>
          )}
        </Box>
        <Divider />
        {notifications.length === 0 && (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body1">No Notifications</Typography>
          </Box>
        )}
        <List dense>
          {unreadNotifications.length > 0 && (
            <>
              <Typography variant="subtitle1" sx={{ px: 2, pt: 2 }}>
                Unread
              </Typography>
              {unreadNotifications.map((notif) => (
                <ListItem
                  button
                  key={notif.id}
                  onClick={() => {
                    handleMarkAsRead(notif.id);
                    handleClose();
                  }}
                >
                  <ListItemText
                    primary={notif.message}
                    secondary={new Date(notif.timestamp).toLocaleString()}
                  />
                  <ListItemSecondaryAction>
                    <Button size="small" onClick={() => handleMarkAsRead(notif.id)}>
                      Mark as Read
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </>
          )}
          {readNotifications.length > 0 && (
            <>
              <Typography variant="subtitle1" sx={{ px: 2, pt: 2 }}>
                Read
              </Typography>
              {readNotifications.map((notif) => (
                <ListItem key={notif.id}>
                  <ListItemText
                    primary={notif.message}
                    secondary={new Date(notif.timestamp).toLocaleString()}
                  />
                </ListItem>
              ))}
            </>
          )}
        </List>
      </Menu>
    </>
  );
};

export default NotificationDropdown;

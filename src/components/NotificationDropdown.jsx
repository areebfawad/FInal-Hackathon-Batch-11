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
  Tabs,
  Tab,
  TextField,
  CircularProgress,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { getNotifications, markNotificationAsRead, clearAllNotifications } from '../services/api';
import AppContext from '../context/AppContext';

const NotificationDropdown = () => {
  const { state } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(0); // 0 = Unread, 1 = Read
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications(state.user.id);
        setNotifications(response.data.notifications);
        setFilteredNotifications(response.data.notifications);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [state.user.id]);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
    setSearchQuery('');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = notifications.filter((notif) =>
      notif.message.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredNotifications(filtered);
  };

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
      const unread = notifications.filter((notif) => !notif.read);
      await Promise.all(unread.map((notif) => markNotificationAsRead(notif.id)));
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

  const unreadNotifications = filteredNotifications.filter((notif) => !notif.read);
  const readNotifications = filteredNotifications.filter((notif) => notif.read);

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
          style: { width: '400px', maxHeight: '500px' },
        }}
      >
        {/* Header with Search and Actions */}
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="h6">Notifications</Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            }}
            sx={{ mt: 1 }}
          />
        </Box>
        <Divider />

        {/* Tabs for Unread/Read */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label={`Unread (${unreadNotifications.length})`} />
          <Tab label={`Read (${readNotifications.length})`} />
        </Tabs>
        <Divider />

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Notifications List */}
        {!loading && (
          <List dense>
            {(activeTab === 0 ? unreadNotifications : readNotifications).map((notif) => (
              <ListItem
                key={notif.id}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)',
                  },
                }}
              >
                <ListItemText
                  primary={notif.message}
                  secondary={new Date(notif.timestamp).toLocaleString()}
                />
                {activeTab === 0 && (
                  <ListItemSecondaryAction>
                    <Button
                      size="small"
                      startIcon={<MarkEmailReadIcon />}
                      onClick={() => handleMarkAsRead(notif.id)}
                    >
                      Mark as Read
                    </Button>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
            {/* Empty State */}
            {(activeTab === 0 ? unreadNotifications : readNotifications).length === 0 && (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body1" color="textSecondary">
                  No {activeTab === 0 ? 'Unread' : 'Read'} Notifications
                </Typography>
              </Box>
            )}
          </List>
        )}

        {/* Footer Actions */}
        <Divider />
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            size="small"
            color="primary"
            onClick={handleMarkAllAsRead}
            disabled={unreadNotifications.length === 0}
          >
            Mark All as Read
          </Button>
          <Button
            size="small"
            color="error"
            onClick={handleClearAll}
            disabled={notifications.length === 0}
            startIcon={<DeleteIcon />}
          >
            Clear All
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default NotificationDropdown;

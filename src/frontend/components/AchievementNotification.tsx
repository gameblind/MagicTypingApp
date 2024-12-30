import React, { useState, useEffect } from 'react';
import {
  Snackbar,
  Alert,
  Box,
  Typography,
} from '@mui/material';
import { Achievement } from '../types/user';
import { ACHIEVEMENTS } from '../constants/achievements';

interface AchievementNotificationProps {
  achievementId: number | null;
  onClose: () => void;
}

const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  achievementId,
  onClose,
}) => {
  const [open, setOpen] = useState(false);
  const achievement = achievementId ? ACHIEVEMENTS.find(a => a.id === achievementId) : null;

  useEffect(() => {
    if (achievementId) {
      setOpen(true);
    }
  }, [achievementId]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  if (!achievement) {
    return null;
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        sx={{
          width: '100%',
          backgroundColor: 'rgba(20, 20, 28, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '2px solid #ffd700',
          color: '#ffd700',
          '& .MuiAlert-icon': {
            color: '#ffd700',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4" component="span">
            {achievement.icon}
          </Typography>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#ffd700' }}>
              解锁成就：{achievement.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {achievement.description}
            </Typography>
          </Box>
        </Box>
      </Alert>
    </Snackbar>
  );
};

export default AchievementNotification; 
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import AchievementNotification from '../../../src/frontend/components/AchievementNotification';

jest.useFakeTimers();

describe('AchievementNotification Component', () => {
  const mockOnClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('renders achievement notification when achievementId is provided', () => {
    render(
      <AchievementNotification
        achievementId={1}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('解锁成就：初次施法')).toBeInTheDocument();
    expect(screen.getByText('完成第一次打字练习')).toBeInTheDocument();
  });

  test('does not render when achievementId is null', () => {
    render(
      <AchievementNotification
        achievementId={null}
        onClose={mockOnClose}
      />
    );

    expect(screen.queryByText(/解锁成就/)).not.toBeInTheDocument();
  });

  test('closes after autoHideDuration', () => {
    render(
      <AchievementNotification
        achievementId={1}
        onClose={mockOnClose}
      />
    );

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('closes when close button is clicked', () => {
    render(
      <AchievementNotification
        achievementId={1}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('displays achievement icon', () => {
    render(
      <AchievementNotification
        achievementId={1}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('🎯')).toBeInTheDocument();
  });

  test('updates when new achievement is received', () => {
    const { rerender } = render(
      <AchievementNotification
        achievementId={1}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('解锁成就：初次施法')).toBeInTheDocument();

    rerender(
      <AchievementNotification
        achievementId={2}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('解锁成就：速度之星')).toBeInTheDocument();
  });
}); 
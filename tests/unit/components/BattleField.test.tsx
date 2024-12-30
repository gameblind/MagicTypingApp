import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BattleField from '../../../src/frontend/components/BattleField';
import { Character, Spell } from '../../../src/frontend/types/battle';
import { SPELLS } from '../../../src/frontend/utils/spells';

const mockPlayer: Character = {
  name: '测试玩家',
  image: '/test/player.png',
  maxHp: 100,
  hp: 80,
  maxMp: 100,
  mp: 60,
};

const mockEnemy: Character = {
  name: '测试敌人',
  image: '/test/enemy.png',
  maxHp: 100,
  hp: 70,
  maxMp: 100,
  mp: 50,
};

const renderBattleField = (props: {
  player?: Character;
  enemy?: Character;
  isGameOver?: boolean;
  isPlayerTurn?: boolean;
  onSpellCast?: (spell: Spell) => void;
}) => {
  const defaultProps = {
    player: mockPlayer,
    enemy: mockEnemy,
    isGameOver: false,
    isPlayerTurn: true,
    onSpellCast: jest.fn(),
  };

  return render(
    <BrowserRouter>
      <BattleField {...defaultProps} {...props} />
    </BrowserRouter>
  );
};

describe('BattleField Component', () => {
  it('should display player and enemy status correctly', () => {
    renderBattleField({});

    // 检查玩家状态
    expect(screen.getByText(mockPlayer.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockPlayer.hp}/${mockPlayer.maxHp}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockPlayer.mp}/${mockPlayer.maxMp}`)).toBeInTheDocument();

    // 检查敌人状态
    expect(screen.getByText(mockEnemy.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockEnemy.hp}/${mockEnemy.maxHp}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockEnemy.mp}/${mockEnemy.maxMp}`)).toBeInTheDocument();
  });

  it('should display turn status correctly', () => {
    const { rerender } = renderBattleField({});

    // 玩家回合
    expect(screen.getByText('你的回合！')).toBeInTheDocument();

    // 敌人回合
    rerender(
      <BrowserRouter>
        <BattleField
          player={mockPlayer}
          enemy={mockEnemy}
          isGameOver={false}
          isPlayerTurn={false}
          onSpellCast={jest.fn()}
        />
      </BrowserRouter>
    );
    expect(screen.getByText('敌人回合！')).toBeInTheDocument();
  });

  it('should handle spell casting through input', () => {
    const onSpellCast = jest.fn();
    renderBattleField({ onSpellCast });

    const input = screen.getByPlaceholderText('输入咒语...');
    fireEvent.change(input, { target: { value: 'Stupefy' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

    expect(onSpellCast).toHaveBeenCalledWith(SPELLS.stupefy);
    expect(input).toHaveValue('');
  });

  it('should handle spell casting through click', () => {
    const onSpellCast = jest.fn();
    renderBattleField({ onSpellCast });

    const spellButton = screen.getByText('昏昏倒地');
    fireEvent.click(spellButton);

    expect(onSpellCast).toHaveBeenCalledWith(SPELLS.Stupefy);
  });

  it('should disable input during enemy turn', () => {
    renderBattleField({ isPlayerTurn: false });

    const input = screen.getByPlaceholderText('输入咒语...') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('should disable spell buttons during enemy turn', () => {
    renderBattleField({ isPlayerTurn: false });

    const spellButtons = screen.getAllByRole('button');
    spellButtons.forEach(button => {
      expect(button).toHaveStyle({ cursor: 'not-allowed' });
    });
  });

  it('should show game over message when game ends', () => {
    // 玩家胜利
    renderBattleField({
      isGameOver: true,
      enemy: { ...mockEnemy, hp: 0 },
    });
    expect(screen.getByText('胜利！')).toBeInTheDocument();

    // 玩家失败
    const { rerender } = renderBattleField({
      isGameOver: true,
      player: { ...mockPlayer, hp: 0 },
    });
    expect(screen.getByText('失败！')).toBeInTheDocument();
  });

  it('should disable all interactions when game is over', () => {
    renderBattleField({ isGameOver: true });

    const input = screen.getByPlaceholderText('输入咒语...') as HTMLInputElement;
    expect(input.disabled).toBe(true);

    const spellButtons = screen.getAllByRole('button');
    spellButtons.forEach(button => {
      expect(button).toHaveStyle({ cursor: 'not-allowed' });
    });
  });

  it('should show MP cost for each spell', () => {
    renderBattleField({});

    Object.entries(SPELLS).forEach(([_, spell]) => {
      expect(screen.getByText(`MP:${spell.mpCost}`)).toBeInTheDocument();
    });
  });

  it('should disable spells when MP is insufficient', () => {
    renderBattleField({
      player: { ...mockPlayer, mp: 0 },
    });

    const spellButtons = screen.getAllByRole('button');
    spellButtons.forEach(button => {
      expect(button).toHaveStyle({ cursor: 'not-allowed' });
    });
  });
}); 
import { playSpellSound, SPELL_SOUNDS } from '../../../src/frontend/constants/spellSounds';

describe('Spell Sounds', () => {
  let mockAudio: any;
  let mockPlay: jest.Mock;

  beforeEach(() => {
    mockPlay = jest.fn().mockResolvedValue(undefined);
    mockAudio = {
      play: mockPlay
    };
    // @ts-ignore
    global.Audio = jest.fn().mockImplementation(() => mockAudio);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('playSpellSound should create and play audio for valid spell', () => {
    playSpellSound('Wingardium Leviosa');
    
    expect(global.Audio).toHaveBeenCalledWith(SPELL_SOUNDS['Wingardium Leviosa']);
    expect(mockPlay).toHaveBeenCalled();
  });

  test('playSpellSound should not throw for invalid spell', () => {
    expect(() => {
      playSpellSound('Invalid Spell');
    }).not.toThrow();
    
    expect(global.Audio).not.toHaveBeenCalled();
    expect(mockPlay).not.toHaveBeenCalled();
  });

  test('playSpellSound should handle play failure gracefully', () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
    mockPlay.mockRejectedValue(new Error('Play failed'));

    playSpellSound('Wingardium Leviosa');
    
    expect(consoleWarn).toHaveBeenCalledWith(
      '播放咒语音频失败:',
      expect.any(Error)
    );
  });
});
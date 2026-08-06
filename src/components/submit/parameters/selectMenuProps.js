/** 기준값 / 주 파라미터 Select 공통 드롭다운 Paper 스타일 */
export const SELECT_MENU_PROPS = {
  PaperProps: {
    className: 'preset-select-menu',
    sx: {
      maxHeight: 320,
      mt: 0.75,
      borderRadius: '12px',
      border: '1px solid #e8ecf1',
      boxShadow: '0 12px 40px rgba(15, 23, 42, 0.1)',
      py: 0.75,
      '& .MuiMenuItem-root': {
        borderRadius: '8px',
        mx: 0.75,
        my: 0.125,
        py: 1.125,
        px: 1.25,
        alignItems: 'flex-start',
        fontSize: '0.875rem',
        '&:hover': {
          backgroundColor: 'rgba(0, 148, 255, 0.06)',
        },
        '&.Mui-selected': {
          backgroundColor: 'rgba(0, 148, 255, 0.1)',
        },
        '&.Mui-selected:hover': {
          backgroundColor: 'rgba(0, 148, 255, 0.14)',
        },
      },
      '& .preset-menu-title': {
        fontWeight: 600,
        letterSpacing: '-0.02em',
        color: '#0f172a',
        lineHeight: 1.35,
      },
      '& .preset-menu-meta': {
        display: 'block',
        mt: 0.35,
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        fontSize: '0.72rem',
        letterSpacing: '0.02em',
        color: '#64748b',
      },
    },
  },
};

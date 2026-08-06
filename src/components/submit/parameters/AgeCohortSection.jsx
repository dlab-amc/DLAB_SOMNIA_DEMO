import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from '@mui/material';
import {
  AGE_COHORT_OPTIONS,
  PEDIATRIC_BAND_OPTIONS,
  PEDIATRIC_AGE_RANGE_LABEL_KO,
  PEDIATRIC_AGE_RANGE_LABEL_EN,
  PEDIATRIC_BAND_SELECTION_TOOLTIP_KO,
  PEDIATRIC_BAND_SELECTION_TOOLTIP_EN,
  isPediatricBandSelectable,
  pediatricBandShortLabel,
} from '../../../assets/data/ageCohort';

const AgeCohortSection = ({
  tf,
  ageCohort,
  isAdultCohort,
  pediatricBandRange,
  pediatricBandCounts,
  onAgeCohortChange,
  onPediatricBandClick,
  isGuideHover,
  onGuideEnter,
  onGuideLeave,
}) => (
  <Card elevation={0} className='parameters-section-card age-cohort-card' sx={{ mt: 3 }}>
    <CardContent className='card-contents'>
      <div className='section-heading'>
        <span className='section-num' aria-hidden='true'>
          1
        </span>
        <Typography
          variant='h6'
          gutterBottom={false}
          component='div'
          className='section-heading-title'
        >
          {tf('연령군 선택', 'Select Age Group')}
        </Typography>
        <span
          className='guide-wrap'
          data-guide='ageCohort'
          onMouseEnter={onGuideEnter}
          onMouseLeave={onGuideLeave}
        >
          <span className='guide'>?</span>
          {isGuideHover.ageCohort && (
            <span className='guide-tip' role='tooltip'>
              {tf(
                '샘플 수·서브그룹 설정 전에 분석 대상 연령군을 선택합니다.',
                'Select the target age group before sample size and subgroup settings.'
              )}
            </span>
          )}
        </span>
      </div>
      <Box className='sampling-mode-toggle age-cohort-toggle' role='group'>
        {AGE_COHORT_OPTIONS.map((opt) => (
          <Button
            key={opt.id}
            variant={ageCohort === opt.id ? 'contained' : 'outlined'}
            onClick={() => onAgeCohortChange(opt.id)}
            sx={{ textTransform: 'none' }}
          >
            <span className='age-cohort-btn-text'>
              <span className='age-cohort-btn-title'>
                {tf(opt.label, opt.label_eng)}
              </span>
              <span className='age-cohort-btn-sub'>
                ({tf(opt.sublabel, opt.sublabel_eng)})
              </span>
            </span>
          </Button>
        ))}
      </Box>
      {!isAdultCohort && (
        <Box className='pediatric-band-block'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5 }}>
            <Typography variant='body2' color='text.secondary'>
              {tf(PEDIATRIC_AGE_RANGE_LABEL_KO, PEDIATRIC_AGE_RANGE_LABEL_EN)}
            </Typography>
            <span
              className='guide-wrap'
              data-guide='pediatricBand'
              onMouseEnter={onGuideEnter}
              onMouseLeave={onGuideLeave}
            >
              <span className='guide'>?</span>
              {isGuideHover.pediatricBand && (
                <span className='guide-tip' role='tooltip'>
                  {tf(
                    PEDIATRIC_BAND_SELECTION_TOOLTIP_KO,
                    PEDIATRIC_BAND_SELECTION_TOOLTIP_EN
                  )}
                </span>
              )}
            </span>
          </Box>
          <Box
            className='pediatric-band-row'
            role='group'
            aria-label={tf('소아 연령 구간', 'Pediatric age range')}
          >
            {PEDIATRIC_BAND_OPTIONS.map((band, idx) => {
              const unavailable = !isPediatricBandSelectable(
                pediatricBandCounts,
                band.id
              );
              const [rangeStart, rangeEnd] = pediatricBandRange;
              const selected =
                !unavailable && idx >= rangeStart && idx <= rangeEnd;
              return (
                <button
                  key={band.id}
                  type='button'
                  className={`pediatric-band-chip${
                    selected ? ' is-selected' : ''
                  }${unavailable ? ' is-disabled' : ''}`}
                  disabled={unavailable}
                  onClick={() => onPediatricBandClick(idx)}
                  aria-pressed={selected}
                >
                  <span className='pediatric-band-chip-label'>
                    {pediatricBandShortLabel(band.id, tf)}
                  </span>
                </button>
              );
            })}
          </Box>
        </Box>
      )}
    </CardContent>
  </Card>
);

export default AgeCohortSection;

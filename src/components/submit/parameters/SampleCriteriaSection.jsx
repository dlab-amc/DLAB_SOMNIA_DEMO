import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Box,
  Button,
  Collapse,
} from '@mui/material';
import predefinedParamSets from '../../../assets/data/noninferiorityParams';
import { getOutputParameterLabel } from '../../../assets/data/paramLabels';
import {
  formatSampleSizeAdjustmentTooltipKo,
  formatSampleSizeAdjustmentTooltipEn,
} from '../../../assets/data/ageCohort';
import { SELECT_MENU_PROPS } from './selectMenuProps';

const SampleCriteriaSection = ({
  tf,
  samplingMode,
  setSamplingMode,
  manualSampleSize,
  setManualSampleSize,
  selectedPreset,
  handlePresetChange,
  primaryParameter,
  alpha,
  power,
  sigma,
  delta,
  availableParams,
  handleParamChange,
  isGuideOpen,
  setIsGuideOpen,
  isGuideHover,
  onGuideEnter,
  onGuideLeave,
}) => (
  <Card elevation={0} className='parameters-section-card sample-criteria-card'>
    <CardContent className='card-contents'>
      <div className='sample-criteria-heading section-heading'>
        <span className='section-num' aria-hidden='true'>
          2
        </span>
        <Typography
          className='title-desc section-heading-title'
          variant='h6'
          component='div'
        >
          {tf('샘플 수 계산 기준', 'Sample Size Criteria')}
        </Typography>

        <span
          className='guide-wrap'
          data-guide='sampling'
          onMouseEnter={onGuideEnter}
          onMouseLeave={onGuideLeave}
        >
          <span className='guide'>?</span>
          {isGuideHover.sampling && (
            <span className='guide-tip' role='tooltip'>
              {tf(
                formatSampleSizeAdjustmentTooltipKo(),
                formatSampleSizeAdjustmentTooltipEn()
              )}
            </span>
          )}
        </span>
      </div>

      <Box
        className='sampling-mode-toggle sampling-mode-toggle--fixed-height'
        role='group'
        aria-label={tf('샘플링 방식', 'Sampling mode')}
      >
        <Button
          variant={samplingMode === 'auto' ? 'contained' : 'outlined'}
          onClick={() => setSamplingMode('auto')}
          sx={{ textTransform: 'none' }}
        >
          {tf('비열등성 기반 자동 샘플링', 'Auto (non-inferiority based)')}
        </Button>
        <Button
          variant={samplingMode === 'manual' ? 'contained' : 'outlined'}
          onClick={() => setSamplingMode('manual')}
          sx={{ textTransform: 'none' }}
        >
          {tf('직접 샘플 수 입력', 'Manual sample size')}
        </Button>
      </Box>

      {samplingMode === 'manual' && (
        <Box className='manual-sample-field' sx={{ mb: 3 }}>
          <TextField
            required
            fullWidth
            type='text'
            label={tf('원하는 샘플 수', 'Desired sample size')}
            value={manualSampleSize}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '');
              if (!e.nativeEvent.isComposing) setManualSampleSize(v);
            }}
            onCompositionEnd={(e) => {
              const v = e.target.value.replace(/\D/g, '');
              setManualSampleSize(v);
            }}
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              maxLength: 9,
            }}
          />
        </Box>
      )}

      {samplingMode === 'auto' && (
        <>
          <FormControl
            fullWidth
            required
            sx={{ mb: 2 }}
            className='preset-form-control'
          >
            <InputLabel>* {tf('기준값 선택', 'Select Preset')}</InputLabel>
            <Select
              className='preset-select'
              value={selectedPreset}
              onChange={handlePresetChange}
              renderValue={(value) => {
                if (value && predefinedParamSets[value]) {
                  const val = predefinedParamSets[value];
                  return `${tf(val.label, val.label_eng)} (α=${val.alpha}, β=${val.power}, σ=${val.sigma}, Δ=${val.delta})`;
                }
                if (value === 'custom') return tf('직접 입력', 'Custom input');
                return `-- ${tf('기준값 선택', 'Select Preset')} --`;
              }}
              MenuProps={SELECT_MENU_PROPS}
            >
              {Object.entries(predefinedParamSets).map(([key, val]) => (
                <MenuItem key={key} value={key} className='preset-menu-item'>
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      variant='subtitle2'
                      className='preset-menu-title'
                    >
                      {tf(val.label, val.label_eng)}
                    </Typography>
                    <Typography
                      variant='caption'
                      color='text.secondary'
                      className='preset-menu-meta'
                    >
                      α={val.alpha}, β={val.power}, σ={val.sigma}, Δ={val.delta}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
              <MenuItem value='custom'>
                {tf('직접 입력', 'Custom input')}
              </MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={2} className='param-fields-grid'>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required className='preset-form-control'>
                <InputLabel shrink>
                  {tf('* 주 파라미터', '* Primary Parameter')}
                </InputLabel>
                <Select
                  className='preset-select'
                  name='primaryParameter'
                  value={primaryParameter}
                  onChange={handleParamChange}
                  displayEmpty
                  notched
                  renderValue={(value) => {
                    if (!value) return tf('-- 선택 --', '-- Select --');
                    const label = getOutputParameterLabel(value);
                    return label && label !== value ? `${label}` : value;
                  }}
                  MenuProps={SELECT_MENU_PROPS}
                >
                  <MenuItem value=''>
                    <Typography
                      variant='subtitle2'
                      className='preset-menu-title'
                    >
                      {tf('-- 선택 --', '-- Select --')}
                    </Typography>
                  </MenuItem>
                  {availableParams.map((param) => {
                    const label = getOutputParameterLabel(param);
                    const showMeta = label && label !== param;
                    return (
                      <MenuItem
                        key={param}
                        value={param}
                        className='preset-menu-item'
                      >
                        <Box sx={{ width: '100%' }}>
                          <Typography
                            variant='subtitle2'
                            className='preset-menu-title'
                          >
                            {showMeta ? label : param}
                          </Typography>
                          {showMeta && (
                            <Typography
                              variant='caption'
                              color='text.secondary'
                              className='preset-menu-meta'
                            >
                              {param}
                            </Typography>
                          )}
                        </Box>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            {[
              {
                label: tf(
                  '허용 오차 비율 (α)',
                  'Error tolerance ratio (α)'
                ),
                name: 'alpha',
              },
              {
                label: tf(
                  '평가 신뢰 수준 (1 - β)',
                  'Confidence level (1 - β)'
                ),
                name: 'power',
              },
              {
                label: tf('오차 표준편차 (σ)', 'Error standard deviation (σ)'),
                name: 'sigma',
              },
              {
                label: tf(
                  '허용 가능한 최대 오차 (Δ)',
                  'Maximum allowable error (Δ)'
                ),
                name: 'delta',
              },
            ].map(({ label, name }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  required
                  fullWidth
                  name={name}
                  label={`* ${label}`}
                  type='number'
                  value={{ alpha, power, sigma, delta }[name]}
                  onChange={handleParamChange}
                  disabled={
                    selectedPreset !== 'custom' && selectedPreset !== ''
                  }
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Box className='noninferiority-guide-section'>
        <Collapse in={isGuideOpen}>
          <Box className='noninferiority-guide-panel' component='section'>
            <h4 className='noninferiority-guide-title'>
              {tf('파라미터 안내', 'Parameter guide')}
            </h4>
            <dl className='noninferiority-guide-list'>
              <div className='noninferiority-guide-item'>
                <dt>{tf('주 파라미터', 'Primary Parameter')}</dt>
                <dd>
                  {tf(
                    '유의수준·검정력·σ·Δ를 정하는 기준이 되는 수면 분석 파라미터입니다.',
                    'The sleep analysis parameter that sets the basis for alpha, power, sigma, and delta.'
                  )}
                </dd>
              </div>
              <div className='noninferiority-guide-item'>
                <dt>{tf('유의수준 (α)', 'Alpha (Significance Level)')}</dt>
                <dd>
                  {tf(
                    '정답과의 차이가 우연인지 판단하는 기준으로, 값이 작을수록 더 엄격합니다.',
                    'Threshold for chance vs real difference from ground truth; smaller is stricter.'
                  )}
                </dd>
              </div>
              <div className='noninferiority-guide-item'>
                <dt>{tf('검정력 (1-β)', 'Power')}</dt>
                <dd>
                  {tf(
                    '성능이 기준 이상일 때 이를 놓치지 않고 발견할 확률입니다. 높을수록 샘플 수가 늘어납니다.',
                    'Chance of detecting true above-threshold performance; higher power needs more samples.'
                  )}
                </dd>
              </div>
              <div className='noninferiority-guide-item'>
                <dt>{tf('오차 표준편차 (σ)', 'Sigma')}</dt>
                <dd>
                  {tf(
                    '예측과 정답 간 차이의 표준편차로, 값이 클수록 필요한 샘플 수가 늘어납니다.',
                    'Standard deviation of prediction error; larger values require more samples.'
                  )}
                </dd>
              </div>
              <div className='noninferiority-guide-item'>
                <dt>{tf('비열등성 마진 (Δ)', 'Delta')}</dt>
                <dd>
                  {tf(
                    '임상적으로 허용 가능한 최대 차이이며, 주 파라미터와 같은 단위를 사용합니다.',
                    'Maximum clinically acceptable difference; uses the same unit as the primary parameter.'
                  )}
                </dd>
              </div>
            </dl>
            <div className='noninferiority-guide-footer'>
              <a
                className='noninferiority-guide-link'
                href='/submit/guide'
                target='_blank'
                rel='noopener noreferrer'
              >
                {tf(
                  '제출 가이드에서 자세히 보기',
                  'Read more in the submission guide'
                )}
                <span
                  className='noninferiority-guide-link-arrow'
                  aria-hidden='true'
                >
                  →
                </span>
              </a>
            </div>
          </Box>
        </Collapse>
        <Button
          className='submit-guide-toggle'
          onClick={() => setIsGuideOpen(!isGuideOpen)}
          size='small'
        >
          {isGuideOpen
            ? tf('설명 닫기', 'Hide description')
            : tf(
                '비열등성 검정 설명 보기',
                'Show non-inferiority description'
              )}
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default SampleCriteriaSection;

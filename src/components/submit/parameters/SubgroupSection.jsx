import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from '@mui/material';
import {
  ADULT_SUBGROUP_OPTIONS,
  PEDIATRIC_SUBGROUP_OPTIONS,
  NO_SUBGROUP_LABEL_KO,
  NO_SUBGROUP_LABEL_EN,
  RACE_SUBGROUP_LIST_EN,
} from '../../../assets/data/ageCohort';

const SubgroupSection = ({
  tf,
  isAdultCohort,
  selectedSubgroups,
  onNoSubgroupSelect,
  onSubgroupToggle,
}) => {
  const options = isAdultCohort
    ? ADULT_SUBGROUP_OPTIONS
    : PEDIATRIC_SUBGROUP_OPTIONS;

  const adultTooltipMap = {
    BMI: 'Obese, Non-obese',
    Severity: 'Normal, Mild, Moderate, Severe',
    Race: RACE_SUBGROUP_LIST_EN,
  };

  return (
    <Card elevation={0} className='parameters-section-card subgroup-card'>
      <CardContent className='card-contents'>
        <div className='section-heading'>
          <span className='section-num' aria-hidden='true'>
            3
          </span>
          <Typography
            variant='h6'
            gutterBottom={false}
            component='div'
            className='subgroup-section-title section-heading-title'
          >
            {tf('서브그룹 분석 기준 선택', 'Select Subgroup Criteria')}
          </Typography>
        </div>
        <FormGroup className='subgroup-row' row>
          <FormControlLabel
            key='none'
            control={
              <Checkbox
                checked={selectedSubgroups.length === 0}
                onChange={onNoSubgroupSelect}
              />
            }
            label={
              <Box className='subgroup-option-label'>
                <Typography
                  component='span'
                  className='subgroup-option-title'
                >
                  {tf(NO_SUBGROUP_LABEL_KO, NO_SUBGROUP_LABEL_EN)}
                </Typography>
              </Box>
            }
          />
          {options.map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={selectedSubgroups.includes(item)}
                  onChange={() => onSubgroupToggle(item)}
                />
              }
              label={
                <Box className='subgroup-option-label'>
                  <Typography
                    component='span'
                    className='subgroup-option-title'
                  >
                    {!isAdultCohort && item === 'Severity'
                      ? tf('OSA Severity', 'OSA Severity')
                      : item}
                  </Typography>
                  <Typography
                    component='span'
                    variant='caption'
                    className='subgroup-option-desc'
                  >
                    {isAdultCohort
                      ? adultTooltipMap[item]
                      : 'Normal, Mild, Moderate, Severe'}
                  </Typography>
                </Box>
              }
            />
          ))}
        </FormGroup>
      </CardContent>
    </Card>
  );
};

export default SubgroupSection;

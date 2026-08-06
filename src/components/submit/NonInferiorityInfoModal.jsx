import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import predefinedParamSets from '../../assets/data/noninferiorityParams';

const NonInferiorityInfoModal = ({ open, onClose, onSelectPreset }) => {
  return (
    <Dialog
      className='noninferiority-modal'
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
    >
      <DialogTitle className='modal-title'>
        비열등성 검정 파라미터 기본값 안내
      </DialogTitle>
      <DialogContent>
        <DialogContentText component='div'>
          <Typography className='modal-desc' variant='body1' gutterBottom>
            <strong className='line-wrap'>
              아래 기본값은 FDA 승인 수면 측정 기기 또는 학술 논문의 검증
              데이터를 기반으로 설정된 <strong className='point'>권장값</strong>
              입니다.
            </strong>
          </Typography>

          <TableContainer className='table' component={Paper}>
            <Table size='small'>
              <TableHead>
                <TableRow className='table-header-row'>
                  <TableCell>
                    <strong>기준명 (클릭하여 선택)</strong>
                  </TableCell>
                  <TableCell align='center'>
                    <strong>Alpha</strong>
                  </TableCell>
                  <TableCell align='center'>
                    <strong>Power</strong>
                  </TableCell>
                  <TableCell align='center'>
                    <strong>Sigma</strong>
                  </TableCell>
                  <TableCell align='center'>
                    <strong>Delta</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(predefinedParamSets).map(([key, item]) => (
                  <TableRow
                    className='data-row'
                    key={key}
                    onClick={() => {
                      onSelectPreset(key);
                      onClose();
                    }}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <TableCell className='data-cell'>{item.label}</TableCell>
                    <TableCell className='data-cell' align='center'>
                      {item.alpha}
                    </TableCell>
                    <TableCell className='data-cell' align='center'>
                      {item.power}
                    </TableCell>
                    <TableCell className='data-cell' align='center'>
                      {item.sigma}
                    </TableCell>
                    <TableCell className='data-cell' align='center'>
                      {item.delta}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography className='table-desc' variant='body1' gutterBottom>
            이 기준은 다음과 같은 검증 문서를 기반으로 구성되었습니다:
          </Typography>

          <ul
            className='table-desc-list'
            style={{ marginLeft: '1em', marginBottom: '1em' }}
          >
            <li>
              <a
                href='https://cdn.clinicaltrials.gov/large-docs/18/NCT03188718/Prot_SAP_000.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                WatchPAT (K183559)
              </a>{' '}
              — AHI 기준 ±5로 비열등성 검정 수행
            </li>
            <li>
              <a
                href='https://clinicaltrials.gov/study/NCT03997916?cond=Belun%20Ring&rank=1&tab=table'
                target='_blank'
                rel='noopener noreferrer'
              >
                Belun Ring (K193482)
              </a>{' '}
              — SE, TST 등 다양한 수면 지표에 대한 기준 제시
            </li>
            <li>
              <a
                href='https://www.atsjournals.org/doi/full/10.1164/rccm.201011-1770OC'
                target='_blank'
                rel='noopener noreferrer'
              >
                Noninferiority of Functional Outcome in Ambulatory Management of
                Obstructive Sleep Apnea
              </a>{' '}
              — FOSQ 점수 기준 비열등성 검정 수행 (Δ = ±1.5, α = 0.025, power =
              80%)
            </li>
            <li>
              <a
                href='https://www.fda.gov/media/78504/download'
                target='_blank'
                rel='noopener noreferrer'
              >
                FDA 비열등성 검정 가이드라인 (2016)
              </a>{' '}
              — "Non-Inferiority Clinical Trials to Establish Effectiveness"
            </li>
          </ul>

          <Typography variant='body2'>
            위의 링크는 실제 수면기기 기반 사례 및 학술 연구이며, FDA
            가이드라인은 비열등성 검정 설계에 대한 일반적인 통계 기준과 방법론을
            설명합니다.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions className='button-wrap'>
        <Button onClick={onClose} variant='contained'>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NonInferiorityInfoModal;

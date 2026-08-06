/**
 * 제출 가이드「실행 환경」문구. 배포 시 .env에 설정해 덮어쓸 수 있음.
 * REACT_APP_SUBMIT_GUIDE_PYTHON_VERSION=3.10
 * REACT_APP_SUBMIT_GUIDE_CUDA_VERSION=11.8  (미설정 시 아래 기본값과 동일: 호스트/컨테이너 CUDA 11.8 기준)
 */
export const getSubmitRuntimeInfo = () => ({
  pythonVersion:
    (typeof process !== 'undefined' &&
      process.env &&
      process.env.REACT_APP_SUBMIT_GUIDE_PYTHON_VERSION) ||
    '3.10',
  cudaVersion:
    (typeof process !== 'undefined' &&
      process.env &&
      process.env.REACT_APP_SUBMIT_GUIDE_CUDA_VERSION) ||
    '11.8',
});

export const getSubmitGuideLinks = (tf) => [
  {
    title: tf('1. 정보 입력 및 파일 업로드', '1. Enter Info & Upload Files'),
    url: '#step1',
    id: 'step1',
  },
  {
    title: tf('2. 분석 진행 상태 확인', '2. Check Analysis Progress'),
    url: '#step2',
    id: 'step2',
  },
  {
    title: tf('3. 성능 분석 리포트 확인', '3. View Performance Report'),
    url: '#step3',
    id: 'step3',
  },
];

/** 제출 가이드 좌측 목차 (Notion-style sidebar). 롤백: SubmitGuideSidebar 제거 후 FloatingNav 복원 */
export const getSubmitGuideToc = (tf) => [
  {
    id: 'step1',
    title: tf('1. 정보 입력 및 파일 업로드', '1. Enter Info & Upload Files'),
    children: [
      {
        id: 'step1-1',
        title: tf('(1) 기본 정보 입력', '(1) Enter Basic Info'),
      },
      {
        id: 'step1-2',
        title: tf('(2) 파일 업로드', '(2) Upload Files'),
        children: [
          { id: 'step1-2-main-py', title: 'main.py' },
          { id: 'step1-2-requirements', title: 'requirements.txt' },
          {
            id: 'step1-2-other',
            title: tf('기타 파일', 'Other Files'),
          },
          {
            id: 'step1-2-runtime',
            title: tf('제출 코드 실행 환경', 'Runtime Environment'),
          },
        ],
      },
      {
        id: 'step1-3',
        title: tf('(3) 평가 기준 설정', '(3) Set Evaluation Criteria'),
        children: [
          {
            id: 'step1-3-protocol',
            title: tf(
              '테스트 데이터 샘플링 및 서브그룹 분석 프로토콜',
              'Test Data Sampling and Subgroup Analysis Protocol'
            ),
          },
          {
            id: 'step1-3-sample-size',
            title: tf(
              '테스트 데이터 샘플 수 산정 방법',
              'Test Data Sample Size Calculation Method'
            ),
          },
        ],
      },
    ],
  },
  {
    id: 'step2',
    title: tf('2. 분석 진행 상태 확인', '2. Monitor Analysis Progress'),
  },
  {
    id: 'step3',
    title: tf('3. 성능 분석 리포트 확인', '3. View Performance Report'),
  },
];

export const flattenSubmitGuideToc = (items) => {
  const ids = [];
  const walk = (nodes) => {
    nodes.forEach((node) => {
      if (node.id) ids.push(node.id);
      if (node.children?.length) walk(node.children);
    });
  };
  walk(items);
  return ids;
};

export const CODE_1 = `
import os
file_path = os.path.join(os.path.dirname(__file__), 'other_file.txt')
with open(file_path, 'r') as file:
    data = file.read()
`;

export const CODE_2 = `
def main(eeg_c3, eeg_c4, eeg_m1):
    # User model logic
    s1 = ...
    s2 = ...
    s3 = ...
    return [s1, s2, s3]

if __name__ == "__main__":
    import sys
    import json
    import numpy as np

    file_path = sys.argv[1]
    data = np.load(file_path, allow_pickle=True)
    if isinstance(data, np.ndarray) and data.dtype != object:
        result = main(data)
    else:
        result = main(*data)

    result = [
        "INVALID" if value is None or (isinstance(value, (float, int)) and (np.isnan(value) or np.isinf(value)))
        else value
        for value in result
    ]

    print(f"RESULT_START{json.dumps(result)}RESULT_END")
`;

export const CODE_3 = `
pandas==2.0.3
numpy
scikit-learn==1.3.0
tensorflow==2.14.0
`;

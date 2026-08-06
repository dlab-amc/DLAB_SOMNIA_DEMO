const predefinedParamSets = {
    accuracy: {
      label: "수면 단계 분류 (Accuracy)",
      label_eng: "Sleep Stage Classification (Accuracy)",
      alpha: 0.025,
      power: 0.8,
      sigma: 6.4,
      delta: 5,
    },
    ahi: {
      label: "AHI 기반 OSA 탐지",
      label_eng: "OSA Detection Based on AHI",
      alpha: 0.025,
      power: 0.9,
      sigma: 7,
      delta: 5,
    },
    tst: {
      label: "총 수면 시간 (TST)",
      label_eng: "Total Sleep Time (TST)",
      alpha: 0.025,
      power: 0.8,
      sigma: 20,
      delta: 15,
    },
    se: {
      label: "수면 효율 (SE)",
      label_eng: "Sleep Efficiency (SE)",
      alpha: 0.025,
      power: 0.8,
      sigma: 6,
      delta: 5,
    },
  };
  
  export default predefinedParamSets;
  
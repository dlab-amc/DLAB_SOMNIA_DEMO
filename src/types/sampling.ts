export interface SamplingRequest {
  alpha: number;
  power: number;
  sigma: number;
  delta: number;
  selected_subgroups: string[];
  target_sample_size: number;
  docs: any[];
}

export interface SamplingResponse {
  sample_size: number;
  sampled_data: any[];
  selected_subgroups: string[];
  target_sample_size: number;
}

export interface SampledData {
  id: string;
  age?: number;
  bmi?: number;
  race?: string;
  sex?: string;
  severity?: string;
}

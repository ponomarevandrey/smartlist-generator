export type TrackMeta = {
  artists: string[];
  duration: number;
  genres: string[];
  genreIds: number[];
  title: string;
  trackId: number;
  year: number;
  filePath: string;
};

//
// Forms
//

export type OptionsList<Value = number> = { label: string; value: Value };
export interface FilterFormValues {
  name: string;
  operator: { label: string; value: string };
  filters: {
    name: { label: string; value: string };
    condition: { label: string; value: string } | null;
    value: OptionsList<number> | OptionsList<number>[] | null;
  }[];
}
export interface SavedFilterFormValues {
  filterId: OptionsList<string>;
}
export type LibPathInput = { libPath: string };

//
// API
//

export type APIResponseSuccess<T> = { results: T };
export type APIResponseError = {
  status: number;
  message: string;
  moreInfo: string;
};
export type Stats = {
  years: { name: string; count: number }[];
  genres: { id?: number; name: string; count: number }[];
};
export type SearchQuery = {
  operator: string;
  filters: {
    name: string;
    condition?: string;
    value: number | (number | undefined)[] | undefined;
  }[];
  excludeTracks: number[];
};

// SSE

type ValidationStats = {
  names: (string | number)[];
  count: number;
};
export type TrackValidatorError = {
  filePath: string;
  id3TagName: string | number;
  id3TagValue?: string | string[] | number;
  err: string;
};
export type ValidationResult = {
  errors: TrackValidatorError[];
  artists: ValidationStats;
  years: ValidationStats;
  genres: ValidationStats;
};
export type ProcessStatus = "pending" | "success" | "failure" | null;
export type ProcessResult = ValidationResult | null;
export type ProcessName = "validation" | "seeding";
export type Process = {
  name: ProcessName;
  createdAt?: number;
  updatedAt?: number;
  status: ProcessStatus;
  result: ProcessResult;
};
export type ValidationQuery = { libPath: string };

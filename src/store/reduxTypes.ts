export interface SpeciesSelected {
  id: number;
  preferred_common_name: string;
  name: string;
  wikipedia_url: string;
  wikipediaURL?: string | undefined;
  photos?: {
    id: number;
    url: string;
  }[];
  observedDateTime: string;
  observationURL: string;
  observedLocation: string;
  locationIsObscured: boolean;
  coordinates: string;
  title: string;
  spottedBy: string;
  spottedByURL: string;
}

export interface ReducerState {
  locationSelected: null | Object;
  speciesSelected: null | SpeciesSelected;
  userCoordinates: null | Array<number>;
  error: null | string;
  pageNumber: null | number;
}

export type UpdateSpeciesSelectedAction = {
  type: 'UPDATE_SPECIES_SELECTED';
  speciesSelected: SpeciesSelected;
};

export type UpdateLocationSelectedAction = {
  type: 'UPDATE_LOCATION_SELECTED';
  locationSelected: Object;
};

export type UpdateUserCoordinatesAction = {
  type: 'UPDATE_USER_COORDINATES';
  userCoordinates: Array<number>;
};

export type UpdateErrorAction = {
  type: 'UPDATE_ERROR';
  error: string;
};

export type UpdatePageNumberAction = {
  type: 'UPDATE_PAGE_NUMBER';
  pageNumber: number;
};

export type Actions =
  | UpdateSpeciesSelectedAction
  | UpdateLocationSelectedAction
  | UpdateUserCoordinatesAction
  | UpdateErrorAction
  | UpdatePageNumberAction;

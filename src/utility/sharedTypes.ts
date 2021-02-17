export interface ReducerState {
  locationSelected: null | LocationSelected;
  speciesSelected: null | iNaturalistSpeciesAutocompleteResult;
  userCoordinates: null | Array<number>;
  error: null | string;
  pageNumber: null | number;
}

export type UpdateSpeciesSelectedAction = {
  type: 'UPDATE_SPECIES_SELECTED';
  speciesSelected: iNaturalistSpeciesAutocompleteResult;
};

export type UpdateLocationSelectedAction = {
  type: 'UPDATE_LOCATION_SELECTED';
  locationSelected: LocationSelected;
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

export interface StateProps {
  locationSelected: LocationSelected[];
  speciesSelected: iNaturalistSpeciesAutocompleteResult;
  userCoordinates: number[];
  pageNumber: number;
}

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

export interface iNaturalistSpeciesAutocompleteResult {
  observations_count: number;
  taxon_schemes_count: number;
  ancestry: string;
  is_active: boolean;
  flag_counts: {
    unresolved: number;
    resolved: number;
  };
  wikipedia_url: string;
  current_synonymous_taxon_ids: null | number;
  iconic_taxon_id: number;
  rank_level: number;
  taxon_changes_count: number;
  atlas_id: null;
  complete_species_count: number;
  parent_id: number;
  complete_rank: string;
  name: string;
  rank: string;
  extinct: boolean;
  id: number;
  default_photo: {
    square_url: string;
    attribution: string;
    flags: string[];
    medium_url: string;
    id: number;
    license_code: string | null;
    original_dimensions: {
      width: number;
      height: number;
    };
    url: string;
  };
  ancestor_ids: number[];
  matched_term: string;
  iconic_taxon_name: string;
  preferred_common_name: string;
}

export interface LocationSelected {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  formatted_address: string;
  geometry: {
    bounds: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
    location: {
      lat: number;
      lng: number;
    };
    location_type: string;
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  place_id: string;
  types: string[];
}
[];

export interface GoogleMapsAutocompletePrediction {
  description: string;
  matched_substrings: {
    length: number;
    offset: number;
  }[];
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: {
      length: number;
      offset: number;
    }[];
    secondary_text: string;
  };
  place_id: string;
  reference: string;
  terms: {
    offset: number;
    value: string;
  }[];
  types: string[];
}

export interface ObservationResult {
  annotations: [];
  cached_votes_total: number;
  captive: boolean;
  comments: {
    id: number;
    created_at: string;
    created_at_details: {
      date: string;
      day: number;
      hour: number;
      month: number;
      week: number;
      year: number;
    };
    user: {
      id: number;
      icon_content_type: string;
      icon_file_name: string;
      icon_url: string;
      login: string;
      name: string;
    };
  }[];
  comments_count: number;
  community_taxon_id: number;
  created_at: string;
  created_at_details: {
    date: string;
    week: number;
    month: number;
    hour: number;
    year: number;
  };
  created_time_zone: string;
  description: string;
  faves: [];
  faves_count: number;
  flags: [];
  geojson: { coordinates: number[]; type: string };
  geoprivacy: null | string;
  id: string;
  ident_taxon_ids: number[];
  identifications: {
    body: null | string;
    category: string;
    created_at: string;
    created_at_details: {
      date: string;
      day: number;
      month: number;
      year: number;
      hour: number;
      week: number;
    };
    current: boolean;
    disagreement: null | boolean;
    flags: string[];
    hidden: boolean;
    id: number;
    moderator_actions: [];
    own_observation: boolean;
    previous_observation_taxon: {
      photos_locked: boolean;
      taxon_schemes_count: number;
      ancestry: string;
      min_species_ancestry: string;
      wikipedia_url: string;
    };
    previous_observation_taxon_id: number;
    spam: boolean;
    taxon: {
      ancestor_ids: number[];
      ancestry: string;
      atlas_id: null | number;
      complete_rank: string;
      complete_species_count: null | number;
      created_at: string;
      current_synonymous_taxon_ids: null | number;
      default_photo: {
        attribution: string;
        flags: [];
        id: number;
        license_code: null | string;
        medium_url: string;
        original_dimensions: { width: number; height: number };
        square_url: string;
        url: string;
      };
      endemic: boolean;
      extinct: boolean;
      flag_counts: { unresolved: number; resolved: number };
      iconic_taxon_id: number;
      iconic_taxon_name: string;
      id: number;
      introduced: boolean;
      is_active: boolean;
      min_species_ancestry: string;
      min_species_taxon_id: number;
      name: string;
      native: boolean;
      observations_count: number;
      parent_id: number;
      photos_locked: boolean;
      preferred_common_name: string;
      rank: string;
      rank_level: number;
      taxon_changes_count: number;
      taxon_schemes_count: number;
      threatened: boolean;
      universal_search_rank: number;
      wikipedia_url: string;
    };
    taxon_change: null;
    taxon_id: number;
    user: {
      id: number;
      login: string;
      spam: boolean;
      suspended: boolean;
      created_at: string;
    };
    uuid: string;
    vision: boolean;
  }[];
  identifications_count: number;
  identifications_most_agree: boolean;
  identifications_most_disagree: boolean;
  identifications_some_agree: boolean;
  license_code: null;
  location: string;
  map_scale: null;
  mappable: boolean;
  non_owner_ids: {
    id: number;
    body: string;
    created_at: string;
    created_at_details: {
      date: string;
      day: number;
      hour: number;
      month: number;
      week: number;
      year: number;
    };
    user: {
      id: number;
      icon_content_type: string;
      icon_file_name: string;
      icon_url: string;
      login: string;
      name: string;
    };
  }[];
  num_identification_agreements: number;
  num_identification_disagreements: number;
  oauth_application_id: number;
  obscured: boolean;
  observation_photos: {
    id: number;
    photo: {
      id: number;
      license_code: null;
      url: string;
      attribution: string;
      original_dimensions: { width: number; height: number };
    };
    position: number;
    uuid: string;
  }[];
  observed_on: string;
  observed_on_details: {
    date: string;
    week: number;
    month: number;
    hour: number;
    year: number;
  };
  observed_on_string: string;
  observed_time_zone: string;
  ofvs: {
    name: string;
    value: string;
  }[];
  outlinks: [];
  owners_identification_from_vision: boolean;
  photos: {
    id: number;
    attribution: string;
    license_code: string;
    url: string;
  }[];
  place_guess: string;
  place_ids: number[];
  positional_accuracy: null;
  preferences: { prefers_community_taxon: null };
  project_ids: [];
  project_ids_with_curator_id: [];
  project_ids_without_curator_id: [];
  project_observations: [];
  public_positional_accuracy: null;
  quality_grade: string;
  quality_metrics: [];
  reviewed_by: number[];
  site_id: number;
  sounds: { id: number; attribution: string; license_code: string }[];
  spam: boolean;
  species_guess: string;
  tags: string[];
  taxon: {
    ancestor_ids: number[];
    ancestry: string;
    atlas_id: null | number;
    complete_rank: string;
    complete_species_count: null | number;
    created_at: string;
    current_synonymous_taxon_ids: null | number;
    default_photo: {
      attribution: string;
      flags: [];
      id: number;
      license_code: null | string;
      medium_url: string;
      original_dimensions: { width: number; height: number };
      square_url: string;
      url: string;
    };
    endemic: boolean;
    extinct: boolean;
    flag_counts: { unresolved: number; resolved: number };
    iconic_taxon_id: number;
    iconic_taxon_name: string;
    id: number;
    introduced: boolean;
    is_active: boolean;
    min_species_ancestry: string;
    min_species_taxon_id: number;
    name: string;
    native: boolean;
    observations_count: number;
    parent_id: number;
    photos_locked: boolean;
    preferred_common_name: string;
    rank: string;
    rank_level: number;
    taxon_changes_count: number;
    taxon_schemes_count: number;
    threatened: boolean;
    universal_search_rank: number;
    wikipedia_url: string;
  };
  taxon_geoprivacy: string;
  time_observed_at: string;
  time_zone_offset: string;
  updated_at: string;
  uri: string;
  user: {
    site_id: number;
    created_at: string;
    id: number;
    login: string;
    spam: boolean;
    activity_count: number;
    icon: string;
    icon_url: string;
    identifications_count: number;
    journal_posts_count: number;
    login_autocomplete: string;
    login_exact: string;
    name: string;
    name_autocomplete: string;
    observations_count: number;
    orcid: null | number;
    preferences: {};
    roles: [];
    species_count: number;
    suspended: boolean;
    universal_search_rank: number;
  };
  uuid: string;
  votes: [];
}

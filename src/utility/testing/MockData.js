export const speciesSelectedMockData = {
  observations_count: 27130,
  taxon_schemes_count: 1,
  ancestry: '48460/1/2/355675/40151/848317/848320/848324/41573',
  is_active: true,
  flag_counts: {
    unresolved: 0,
    resolved: 0,
  },
  wikipedia_url: 'http://en.wikipedia.org/wiki/Bear',
  current_synonymous_taxon_ids: null,
  iconic_taxon_id: 40151,
  rank_level: 30,
  taxon_changes_count: 0,
  atlas_id: null,
  complete_species_count: 8,
  parent_id: 41573,
  complete_rank: 'species',
  name: 'Ursidae',
  rank: 'family',
  extinct: false,
  id: 41636,
  default_photo: {
    square_url:
      'https://static.inaturalist.org/photos/9547647/square.jpg?1501959689',
    attribution: '(c) TroyEcol, all rights reserved, uploaded by Declan Troy',
    flags: [],
    medium_url:
      'https://static.inaturalist.org/photos/9547647/medium.jpg?1501959689',
    id: 9547647,
    license_code: null,
    original_dimensions: {
      width: 1024,
      height: 683,
    },
    url: 'https://static.inaturalist.org/photos/9547647/square.jpg?1501959689',
  },
  ancestor_ids: [
    48460,
    1,
    2,
    355675,
    40151,
    848317,
    848320,
    848324,
    41573,
    41636,
  ],
  matched_term: 'Bears',
  iconic_taxon_name: 'Mammalia',
  preferred_common_name: 'Bears',
};

export const mockLocationSelectedData = {
  0: {
    address_components: [
      {
        long_name: 'Manhattan',
        short_name: 'Manhattan',
        types: ['political', 'sublocality', 'sublocality_level_1'],
      },
      {
        long_name: 'New York',
        short_name: 'New York',
        types: ['locality', 'political'],
      },
      {
        long_name: 'New York County',
        short_name: 'New York County',
        types: ['administrative_area_level_2', 'political'],
      },
      {
        long_name: 'New York',
        short_name: 'NY',
        types: ['administrative_area_level_1', 'political'],
      },
      {
        long_name: 'United States',
        short_name: 'US',
        types: ['country', 'political'],
      },
    ],
    formatted_address: 'Manhattan, New York, NY, USA',
    geometry: {
      bounds: {
        northeast: {
          lat: 40.882214,
          lng: -73.907,
        },
        southwest: {
          lat: 40.6803955,
          lng: -74.047285,
        },
      },
      location: {
        lat: 40.7830603,
        lng: -73.9712488,
      },
      location_type: 'APPROXIMATE',
      viewport: {
        northeast: {
          lat: 40.820045,
          lng: -73.90331300000001,
        },
        southwest: {
          lat: 40.698078,
          lng: -74.03514899999999,
        },
      },
    },
    place_id: 'ChIJYeZuBI9YwokRjMDs_IEyCwo',
    types: ['political', 'sublocality', 'sublocality_level_1'],
  },
};

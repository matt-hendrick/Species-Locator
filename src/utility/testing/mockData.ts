export const mockspeciesSelectedData = {
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

export const mockLocationSelected = {
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

export const mockUserCoordinates = [40.7812, -73.9665];

export const mockObservationData = {
  data: {
    results: [
      {
        annotations: [],
        cached_votes_total: 0,
        captive: false,
        comments: [],
        comments_count: 0,
        community_taxon_id: 41638,
        created_at: '2021-02-14T17:30:19-10:00',
        created_at_details: {
          date: '2021-02-14',
          week: 6,
          month: 2,
          hour: 17,
          year: 2021,
        },
        created_time_zone: 'Pacific/Honolulu',
        description: '',
        faves: [],
        faves_count: 0,
        flags: [],
        geojson: { coordinates: [1, 3], type: 'Point' },
        geoprivacy: null,
        id: 69599884,
        identifications: [
          {
            body: null,
            category: 'improving',
            created_at: '2021-02-15T03:30:19+00:00',
            created_at_details: {
              date: '2021-02-15',
              day: 15,
              month: 2,
              year: 2021,
              hour: 3,
            },
            current: true,
            disagreement: null,
            flags: [],
            hidden: false,
            id: 154973273,
            moderator_actions: [],
            own_observation: true,
            previous_observation_taxon: {
              photos_locked: false,
              taxon_schemes_count: 6,
              ancestry:
                '48460/1/2/355675/40151/848317/848320/848324/41573/41636/846255/41637',
              min_species_ancestry:
                '48460,1,2,355675,40151,848317,848320,848324,41573,41636,846255,41637,41638',
              wikipedia_url: 'http://en.wikipedia.org/wiki/American_black_bear',
            },
            previous_observation_taxon_id: 41638,
            spam: false,
            taxon: {
              photos_locked: false,
              taxon_schemes_count: 6,
              ancestry:
                '48460/1/2/355675/40151/848317/848320/848324/41573/41636/846255/41637',
              min_species_ancestry:
                '48460,1,2,355675,40151,848317,848320,848324,41573,41636,846255,41637,41638',
              wikipedia_url: 'http://en.wikipedia.org/wiki/American_black_bear',
            },
            taxon_change: null,
            taxon_id: 41638,
            user: {
              id: 2213371,
              login: 'gilbertocarranza',
              spam: false,
              suspended: false,
              created_at: '2019-09-04T19:12:53+00:00',
            },
            uuid: '76845100-b875-42de-a923-0be2f4f6b9f8',
            vision: false,
          },
        ],
        identifications_count: 1,
        location: '25.2439659816,-100.8167008654',
        non_owner_ids: [{ id: 2 }],
        num_identification_agreements: 1,
        num_identification_disagreements: 0,
        oauth_application_id: 3,
        obscured: true,
        observation_photos: [
          {
            id: 105396597,
            photo: {
              id: 112966383,
              license_code: 'cc-by-nc',
              url:
                'https://static.inaturalist.org/photos/112966383/square.jpg?1613359825',
              attribution:
                '(c) gilbertocarranza, some rights reserved (CC BY-NC)',
            },
            position: 0,
            uuid: '11058e15-27ad-452f-9161-1125a3832a2c',
          },
        ],
        observed_on: '2021-02-13',
        observed_on_details: {
          date: '2021-02-13',
          week: 6,
          month: 2,
          hour: 15,
          year: 2021,
        },
        observed_on_string: 'Sat Feb 13 2021 15:28:12 GMT-0600 (CST)',
        photos: [
          {
            attribution:
              '(c) gilbertocarranza, some rights reserved (CC BY-NC)',
            flags: [],
            id: 112966383,
            license_code: 'cc-by-nc',
            original_dimensions: { width: 750, height: 1000 },
            url: 'https://static.inaturalist.org/photos/112',
          },
        ],
        place_guess: 'Coahuila, MX',
        quality_grade: 'research',
        quality_metrics: [],
        reviewed_by: [45712, 2213371],
        site_id: 2,
        sounds: [],
        spam: false,
        species_guess: 'Oso negro americano',
      },
    ],
  },
};

export const TEAM_SLUGS = ['martin', 'jose', 'mario', 'oscar'] as const;
export const BOARD_SLUGS = ['ricardo', 'joseLuis', 'erick', 'mike'] as const;

export const teamPhotos: Record<string, string> = {
  martin: '/team/martin.webp',
  jose: '/team/jose.webp',
  mario: '/team/mario.webp',
  oscar: '/team/oscar.webp',
};

export const boardPhotos: Record<string, string> = {
  ricardo: '/team/ricardo.webp',
  joseLuis: '/team/joseLuis.webp',
  erick: '/team/erick.webp',
  mike: '/team/mike.jpeg',
};

export const teamPhotoPositions: Record<string, string> = {
  oscar: 'center 10%',
  jose: 'center 15%',
  martin: 'center 15%',
  ricardo: 'center 18%',
  joseLuis: 'center 12%',
  erick: 'center 18%',
  // Full-body source — bias up so the zoomed portrait keeps the face framed.
  mike: 'center 18%',
};

/** Extra object-cover zoom for photos that need a tighter headshot crop. */
export const teamPhotoScales: Record<string, number> = {
  mike: 2.55,
};

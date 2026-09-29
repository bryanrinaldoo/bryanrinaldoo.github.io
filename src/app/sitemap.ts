import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/utils/Helpers';

// Required for static export
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: getBaseUrl(), lastModified: new Date() }];
}

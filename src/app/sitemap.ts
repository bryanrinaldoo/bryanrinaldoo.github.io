import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/utils/Helpers';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: getBaseUrl(), lastModified: new Date() }];
}

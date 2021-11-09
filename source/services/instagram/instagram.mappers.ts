import { formatISO9075, secondsToMilliseconds } from 'date-fns';
import { Instagram, InstagramPosts } from './instagram.models';
import { User } from 'user-instagram';

export class InstagramMappers {

    public static posts(data: User): Instagram {
        return {
            username: data.getUsername(),
            fullname: data.getFullName(),
            posts: data.getMedias().map<InstagramPosts>(m => {
                const msTimestamp = secondsToMilliseconds(m.getTimestamp());
                return {
                    shortcode: m.getShortcode(),
                    dimensions: m.getDimensions(),
                    thumbnailSrc: m.getDisplayUrl(),
                    isVideo: m.isVideo(),
                    createdAt: formatISO9075(msTimestamp),
                };
            }),
        };
    }

}

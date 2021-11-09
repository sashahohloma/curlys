import { Dimensions } from 'user-instagram';

export const INSTAGRAM_KEY = 'instagram';

export interface InstagramPosts {
    shortcode: string;
    dimensions: Dimensions;
    thumbnailSrc: string;
    isVideo: boolean;
    createdAt: string;
}

export interface Instagram {
    username: string;
    fullname: string;
    posts: InstagramPosts[];
}

export interface InstagramFields extends Pick<InstagramPosts, 'shortcode' | 'createdAt'> {
    photoURL: string;
}

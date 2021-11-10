import { IDesserts } from '../services/desserts/desserts.models';
import { InstagramEntity } from '../database/entities/instagram.entity';

export interface IMainPage {
    desserts: IDesserts[];
    reviews: unknown[];
    instagram: {
        username: string;
        posts: InstagramEntity[];
    };
}

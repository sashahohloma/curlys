import { InstagramEntity } from '../database/entities/instagram.entity';
import { IDesserts } from '../services/desserts/desserts.models';

export interface IMainPage {
    desserts: IDesserts[];
    instagram: {
        username: string;
        posts: InstagramEntity[];
    }
}

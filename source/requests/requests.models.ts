import { IDesserts } from '../services/desserts/desserts.models';
import { InstagramEntity } from '../database/entities/instagram.entity';

export interface ICommonPage {
    reviews: unknown[];
    instagram: {
        username: string;
        posts: InstagramEntity[];
    };
}

export interface IMainPage extends ICommonPage {
    desserts: IDesserts[];
}

export interface IProductPage extends ICommonPage {
    dessert: IDesserts;
    related: IDesserts[];
}

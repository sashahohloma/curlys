import { DessertsEntity } from '../database/entities/desserts.entity';
import { InstagramEntity } from '../database/entities/instagram.entity';

export interface ICommonPage {
    reviews: unknown[];
    instagram: {
        username: string;
        posts: InstagramEntity[];
    };
}

export interface IMainPage extends ICommonPage {
    desserts: DessertsEntity[];
}

export interface IProductPage extends ICommonPage {
    dessert: DessertsEntity;
    related: DessertsEntity[];
}

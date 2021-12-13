import { DessertsEntity } from '../database/entities/desserts.entity';
import { InstagramEntity } from '../database/entities/instagram.entity';
import { ReviewsEntity } from '../database/entities/reviews.entity';

export interface ICommonPage {
    instagram: {
        username: string;
        posts: InstagramEntity[];
    };
}

export interface IMainPage extends ICommonPage {
    desserts: DessertsEntity[];
    reviews: ReviewsEntity[];
}

export interface IProductPage extends ICommonPage {
    dessert: DessertsEntity;
    related: DessertsEntity[];
    reviews: ReviewsEntity[];
}

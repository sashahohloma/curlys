import { stringOr } from '@sashahohloma/utilities';
import ky, { Options } from 'ky';
import { Instagram } from './models';

document.addEventListener('DOMContentLoaded', async() => {

    const server = stringOr(process.env.SERVER_BASE, null);
    if (server !== null) {

        const url = server + '/api/v1/instagram';
        const options: Options = {
            method: 'get',
            searchParams: { name: 'vi.konfi' },
        };
        const response = await ky(url, options).json<Instagram>();
        const posts = response.graphql.user.edge_owner_to_timeline_media.edges;

        const elements = document.querySelectorAll<HTMLAnchorElement>('.personal__post');
        const button = document.querySelector<HTMLAnchorElement>('.personal__more');

        elements.forEach((element: HTMLAnchorElement, index: number) => {
            element.style.backgroundImage = 'url(' + posts[index].node.thumbnail_src + ')';
            element.href = 'https://www.instagram.com/p/' + posts[index].node.shortcode;
        });

        if (button !== null) {
            button.href = 'https://www.instagram.com/' + response.graphql.user.username;
            button.text = '@' + response.graphql.user.username;
            button.target = '_blank';
            button.classList.remove('personal__more_disabled');
        }
    }

});

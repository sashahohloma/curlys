export interface InstagramEdges {
    node: {
        shortcode: string;
        dimensions: {
            width: number;
            height: number;
        };
        thumbnail_src: string;
        is_video: boolean;
    };
}

export interface Instagram {
    graphql: {
        user: {
            username: string;
            edge_owner_to_timeline_media: {
                edges: InstagramEdges[];
            };
        };
    };
}

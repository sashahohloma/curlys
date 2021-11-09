declare module 'user-instagram' {

    export enum MediaTypes {
        picture = 'picture',
        video = 'video',
        multiple_picture = 'multiple_picture',
    }

    export class MediaType {
        getValue(): MediaTypes;
    }

    export class Dimensions {
        getHeight(): number;
        getWidth(): number;
    }

    export class Media {
        getType(): MediaType;
        getId(): string;
        getShortcode(): string;
        getCaption(): string;
        getDimensions(): Dimensions;
        getDisplayUrl(): string;
        // getTaggedUsers(): TaggedUser;
        isVideo(): boolean;
        getAccessibilityCaption(): string;
        areCommentsDisabled(): boolean;
        getCommentsCount(): number;
        getLikesCount(): number;
        getTimestamp(): number;
        // getLocation(): Location;
        // getChildren(): ChildPicture;
        hasAudio(): boolean;
        getViewsCount(): number;
        getVideoUrl(): string;
    }

    export class Post {
        getId(): string;
        getType(): MediaType;
        getShortcode(): string;
        getDimensions(): Dimensions;
        getDisplayUrl(): string;
        getVariants(): string[];
        getAccessibilityCaption(): string;
        isVideo(): boolean;
        // getTaggedUsers(): TaggedUser[];
        getCaption(): string;
        areLikesAndViewsCountDisabled(): boolean;
        getCommentsCount(): number;
        // getComments(): Comment[];
        areCommentsDisabled(): boolean;
        getDate(): Date;
        getLikesCount(): number;
        isPaidPartnership(): boolean;
        // getLocation(): Location;
        // getOwner(): Owner;
        isAd(): boolean;
        // getChildren(): ChildMedia[];
        hasAudio(): boolean;
        getVideoViewsCount(): number;
        getVideoPlaysCount(): number ;
    }

    export class User {
        getUsername(): string;
        getBiography(): string;
        getPublicationsCount(): number;
        getFollowersCount(): number;
        getExternalUrl(): string;
        getFollowingCount(): number;
        getFullName(): string;
        hasArEffect(): boolean;
        hasClips(): boolean;
        hasGuides(): boolean;
        hasChannel(): boolean;
        getHighlightsReelsCount(): number;
        isHidingLikesAndViewsCount(): number;
        getId(): string;
        isBusinessAccount(): boolean;
        isProfessionalAccount(): boolean;
        hasJoinedRecently(): boolean;
        getBusinessAddressJson(): string;
        getBusinessContactMethod(): string;
        getBusinessEmail(): string;
        getBusinessPhoneNumber(): string;
        getBusinessCategoryName(): string;
        getOverallCategoryName(): string;
        getCategoryEnum(): string;
        getCategoryName(): string;
        isPrivate(): boolean;
        isVerified(): boolean;
        getProfilePicture(): string;
        getHdProfilePicture(): string;
        getPronouns(): string[];
        getMedias(): Media[];
    }

    function getUserData(username: string): Promise<User>;
    function getPostData(shortcode: string): Promise<Post>;
    function authenticate(username: string, password: string): Promise<void>;
}

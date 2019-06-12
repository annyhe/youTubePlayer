import { LightningElement, api } from 'lwc';

export default class BasicYouTubePlayer extends LightningElement {
    @api youTubeId;

    get youTubeUrl() {
        return 'https://www.youtube.com/embed/' + this.youTubeId;
    }
}
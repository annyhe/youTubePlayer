import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import youTubePath from '@salesforce/resourceUrl/Archive';

export default class BasicYouTubePlayer extends LightningElement {
    @api youTubeId;

    youTubePathInitialized = false;
    get youTubeUrl () {
        return 'https://www.youtube.com/embed/' + this.youTubeId + '?enablejsapi=1&origin=https://salesforce.com';
    }
    renderedCallback() {
        if (this.youTubePathInitialized) {
            return;
        }

        window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this);
        window.onPlayerReady = function(e) {
            e.target.playVideo();
        }

        window.onPlayerStateChange = function(e) {
            console.log('in onPlayerStateChange' + e.target);
        }
        Promise.all([
            loadScript(this, youTubePath + '/iframe_api.js'),
            loadScript(this, youTubePath + '/widget_api.js'),
        ]) 
        .then(() => {
            console.log('YouTube scripts finished loading');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    onYouTubeIframeAPIReady() {
        let player = new YT.Player(this.template.querySelector('.player'), {
            events: {
              'onReady': window.onPlayerReady,
              'onStateChange': window.onPlayerStateChange
            }
        });        

        console.log('in onYouTubeIframeAPIReady:');
        console.log(player);
    }
}
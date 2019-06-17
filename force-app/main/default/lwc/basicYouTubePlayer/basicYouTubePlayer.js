import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript } from 'lightning/platformResourceLoader';
import youTubePath from '@salesforce/resourceUrl/YouTubeJS';

export default class BasicYouTubePlayer extends LightningElement {
    @api youTubeId;

    youTubePathInitialized = false;

    renderedCallback() {
        if (this.youTubePathInitialized) {
            return;
        }
        this.youTubePathInitialized = true;

        Promise.all([
            loadScript(this, youTubePath + '/YouTubeJS/iframe_api.js'),
            loadScript(this, youTubePath + '/YouTubeJS/widget_api.js'),
        ])
        .then(() => {
            console.log('Initialized');
            console.log(YT);
            this.onYouTubeIframeAPIReady();
        })
        .catch(error => {
            console.log(error);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading YouTube',
                    message: error? error.message : 'no message found on error',
                    variant: 'error',
                }),
            );
        });
    }
    onPlayerReady() {
        console.log('YouTube player is ready');
    }
    onErrorFunc(e) {
        let explanation = '';
        if (e.data === 2) {
            explanation = 'invalid YouTube ID';
        } else if (e.data === 5) {
            explanation = 'The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.';
        } else if (e.data === 100) {
            explanation = 'The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.';
        } else if (e.data === 101 || e.data === 150) {
            explanation = 'The owner of the requested video does not allow it to be played in embedded players.';
        }
        
        console.log('explanation is: ' + explanation);
        //   document.getElementById('explanation').innerHTML = explaination;
    }                
    onYouTubeIframeAPIReady() {
        console.log(this.template.querySelector('div.player'));
        console.log(this.youTubeId);
        const player = new YT.Player(this.template.querySelector('div.player'), {
            height: '390',
            width: '390',
            videoId: this.youTubeId,
            events: {
                'onReady': this.onPlayerReady,
                'onError': this.onErrorFunc,
            }
        });
        console.log(player);
    }
}
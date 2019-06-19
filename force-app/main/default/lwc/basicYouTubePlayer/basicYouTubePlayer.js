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
        if (this.youTubePathInitialized || !this.youTubeId) {
            return;
        }

        window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this);
        window.onPlayerReady = function(e) {
            console.log('on Player ready');
            e.target.playVideo();
        }

        window.onErrorFunc = function(e) {
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
            height: '390',
            width: '100%',
            videoId: this.youTubeId,            
            events: {
              'onReady': window.onPlayerReady,
              'onStateChange': window.onPlayerStateChange
            }
        });        

        console.log('in onYouTubeIframeAPIReady:');
        console.log(player);
    }
}
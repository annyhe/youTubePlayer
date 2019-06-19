import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import youTubePath from '@salesforce/resourceUrl/Archive';

export default class BasicYouTubePlayer extends LightningElement {
    @api youTubeId;
    player;

    youTubePathInitialized = false;
    get youTubeUrl () {
        return 'https://www.youtube.com/embed/' + this.youTubeId + '?enablejsapi=1&origin=https://salesforce.com';
    }
    renderedCallback() {
        if (this.youTubePathInitialized || !this.youTubeId) {
            return;
        }

        window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this);
        window.onPlayerReady = function() {
            console.log('on Player ready');
        }

        window.onPlayerError = this.onPlayerError.bind(this);

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

    onPlayerError(e) {
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
        this.showErrorToast(explanation);
    }    

    showErrorToast(explanation) {
        const evt = new ShowToastEvent({
            title: 'Error loading YouTube player',
            message: explanation,
            variant: 'error',
        });
        this.dispatchEvent(evt);
    }

    onYouTubeIframeAPIReady() {
        // if this is called repeatedly it will add divs repeatedly. check if the playerElem exists before creating new elements
        let playerElem = this.template.querySelector('.player');
        if (!playerElem) {
            const containerElem = this.template.querySelector('.wrapper');
            playerElem = document.createElement("DIV");   
            playerElem.className = 'player';
            containerElem.appendChild(playerElem);
        }

        this.player = new YT.Player(playerElem, {
            height: '390',
            width: '100%',
            videoId: this.youTubeId,            
            events: {
              'onReady': window.onPlayerReady,
              'onError': window.onPlayerError
            }
        });        

        console.log('in onYouTubeIframeAPIReady:');
    }
}
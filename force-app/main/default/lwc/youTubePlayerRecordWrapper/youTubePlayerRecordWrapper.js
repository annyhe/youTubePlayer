import { LightningElement, api, track, wire } from 'lwc';
import getFieldValueFromRecordIdFieldName from '@salesforce/apex/YouTubeController.getFieldValueFromRecordIdFieldName';

export default class YouTubePlayerRecordWrapper extends LightningElement {
    @api fieldName;
    @api recordId;
    @track youTubeId;
    @track error;

    @wire(getFieldValueFromRecordIdFieldName, { recordId: '$recordId', fieldName: '$fieldName' })
    wiredFieldValue({ error, data }) {
        if (data) {
            this.youTubeId = data;
        } else if (error) {
            this.error = error;
        } 
    }
}
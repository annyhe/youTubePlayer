import { LightningElement, api, wire } from 'lwc';
import getFieldValueFromRecordIdFieldName from '@salesforce/apex/YouTubeController.getFieldValueFromRecordIdFieldName';

export default class YouTubePlayerRecordWrapper extends LightningElement {
    @api fieldName;
    @api recordId;

    @wire(getFieldValueFromRecordIdFieldName, { recordId: '$recordId', fieldName: '$fieldName' })
    youTubeId;
}
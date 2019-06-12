import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

export default class YouTubePlayerRecordWrapper extends LightningElement {
    @api fieldName;
    @api objectName;
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: '$fieldNames' })
    record;

    get youTubeId() {
        return this.record.data.fields[this.fieldName].value;
    }

    get fieldNames() {
        return [this.objectName + '.' + this.fieldName];
    }
}
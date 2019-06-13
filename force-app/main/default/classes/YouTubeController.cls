public with sharing class YouTubeController {
    @AuraEnabled(cacheable=True)
    public static String getFieldValueFromRecordIdFieldName(Id recordId, String fieldName) {
        String objfieldName = fieldName;
        String sObjName = recordId.getSObjectType().getDescribe().getName();
        SObjectType sObjType = Schema.getGlobalDescribe().get(sObjName);
        String theQuery = 'SELECT ' + objfieldName + ' FROM ' + sObjType + ' WHERE Id = :recordId' + ' LIMIT 1 ';
            
        SObject record = Database.Query(theQuery);
        String fieldValue = (String) record.get(fieldName);
        
        return fieldValue;
    }
}

export class Const {
    public static LOGIN_ENDPOINT = 'auth/signin/';
    public static API_ENDPOINT = 'api/';
    public static CUSTOMER_PROPERTY_MAP = {
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'referenceName': 'Reference Name',
        'billNumber': 'Bill No',
        'date': 'Date',
        'item': 'Item',
        'phoneNumber': 'Mobile',
        'secondNumber': 'Mobile-2',
        'address': 'Address',
        'email': 'email',
        'deliveryPerson': 'Delivery',
        'selectedProducts': 'Product'
    };

    public static DELIVERY_PERSON_MAP = {
        'name': 'First Name',
        'phoneNumber': 'Mobile',
        'address': 'Address',
        'tempoNumber': 'Tempo Number'
    };

    public static PRODUCT_PROPERTY_MAP = {
        'price': 'price',
        'brand': 'brand name',
        'model': 'model',
        'qty'  : 'Quantity',
        'serialNumber': 'serial number',
    };

    public static EDIT_MODEL = {
        'brand': 'Brand',
        'model': 'Model',
        'editOption': 'Edit option'
    };

}

export interface IBill {
    company: string;
    party_name: string;
    party_address_1: string;
    party_address_2: string;
    party_contact_no: string;
    party_email: string;
    party_gst_no: string;
    bill_no: string;
    bill_date: any;
    bill_rows: Array<any>;
    bill_cgst: string;
    bill_sgst: string;
}

export interface IGetBillPayload {
    company: string;
    bill_date: any;
}

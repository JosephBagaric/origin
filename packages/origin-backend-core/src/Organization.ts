import { Role } from './User';

export enum OrganizationStatus {
    Submitted = 0,
    Denied = 1,
    Active = 2
}

export interface IPublicOrganization {
    id: number;
    name: string;
    address: string;
    zipCode: string;
    city: string;
    country: number;
    businessType: string;
    tradeRegistryCompanyNumber: string;
    vatNumber: string;
    status: OrganizationStatus;
}

export interface IFullOrganization extends IPublicOrganization {
    signatoryFullName: string;
    signatoryAddress: string;
    signatoryZipCode: string;
    signatoryCity: string;
    signatoryCountry: number;
    signatoryEmail: string;
    signatoryPhoneNumber: string;
}

export type OrganizationPostData = {
    name: string;
    address: string;
    zipCode: string;
    city: string;
    country: number;
    businessType: string;
    tradeRegistryCompanyNumber: string;
    vatNumber: string;
    signatoryFullName: string;
    signatoryAddress: string;
    signatoryZipCode: string;
    signatoryCity: string;
    signatoryCountry: number;
    signatoryEmail: string;
    signatoryPhoneNumber: string;
};

export type OrganizationUpdateData = {
    status: OrganizationStatus;
};

export interface IOrganizationUpdateMemberRole {
    role: Role;
}

import { AccountAssetDTO } from '@energyweb/exchange-react-query-client';
import { CodeNameDTO } from '@energyweb/origin-device-registry-irec-local-api-react-query-client';
import { ComposedPublicDevice } from '@energyweb/origin-ui-certificate-data';
import {
  GenericFormProps,
  ItemsListWithActionsProps,
  ListAction,
  TItemsListWithActionsContainers,
} from '@energyweb/origin-ui-core';
import { Dayjs } from 'dayjs';
import React, { FC } from 'react';

export interface ListItemContentProps<Id> {
  certificateId: Id;
  icon: FC<React.SVGProps<SVGSVGElement>>;
  fuelType: string;
  energy: string;
  generationTimeTitle: string;
  generationTimeText: string;
  viewButtonLabel: string;
}

export type TListItemContent = <Id>(
  props: React.PropsWithChildren<ListItemContentProps<Id>>
) => React.ReactElement;

type TUseExchangeInboxLogicArgs = {
  exchangeCertificates: AccountAssetDTO[];
  allDevices: ComposedPublicDevice[];
  allFuelTypes: CodeNameDTO[];
  actions: ListAction[];
  ListItemHeader: React.FC<{ name: string; country: string }>;
  ListItemContent: TListItemContent;
};

export type TUseExchangeInboxLogic = (
  args: TUseExchangeInboxLogicArgs
) => ItemsListWithActionsProps<
  ComposedPublicDevice['externalRegistryId'],
  AccountAssetDTO['asset']['id']
>;

export type ExchangeInboxContainers = TItemsListWithActionsContainers<
  ComposedPublicDevice['externalRegistryId'],
  AccountAssetDTO['asset']['id']
>;

export type SelectedItem<Id> = {
  id: Id;
  icon: FC<React.SVGProps<SVGSVGElement>>;
  deviceName: string;
  energy: string;
  generationTime: string;
};

type TUseSellActionLogicArgs<Id> = {
  selectedIds: Id[];
  exchangeCertificates: AccountAssetDTO[];
  allDevices: ComposedPublicDevice[];
  allFuelTypes: CodeNameDTO[];
};

export type TUseSellActionLogic<Id> = (args: TUseSellActionLogicArgs<Id>) => {
  title: string;
  buttonText: string;
  priceInputLabel: string;
  totalPriceText: string;
  selectedItems: SelectedItem<Id>[];
};

type TUseWithdrawActionLogicArgs<Id> = {
  selectedIds: Id[];
  exchangeCertificates: AccountAssetDTO[];
  allDevices: ComposedPublicDevice[];
  allFuelTypes: CodeNameDTO[];
};

export type TUseWithdrawActionLogic<Id> = (
  args: TUseWithdrawActionLogicArgs<Id>
) => {
  title: string;
  buttonText: string;
  selectedItems: SelectedItem<Id>[];
};

type TFormatSelectedExchangeItemsArgs<Id> = {
  selectedIds: Id[];
  exchangeCertificates: AccountAssetDTO[];
  allDevices: ComposedPublicDevice[];
  allFuelTypes: CodeNameDTO[];
};

export type TFormatSelectedExchangeItems = <Id>(
  args: TFormatSelectedExchangeItemsArgs<Id>
) => SelectedItem<Id>[];

type TUseExchangeTransferActionLogicArgs<Id> = {
  selectedIds: Id[];
  exchangeCertificates: AccountAssetDTO[];
  allDevices: ComposedPublicDevice[];
  allFuelTypes: CodeNameDTO[];
};

export type TUseExchangeTransferActionLogic<Id> = (
  args: TUseExchangeTransferActionLogicArgs<Id>
) => {
  title: string;
  buttonText: string;
  addressInputLabel: string;
  selectedItems: SelectedItem<Id>[];
};

type TUseExchangeExportActionLogicArgs<Id> = {
  selectedIds: Id[];
  exchangeCertificates: AccountAssetDTO[];
  allDevices: ComposedPublicDevice[];
  allFuelTypes: CodeNameDTO[];
};

export type TUseExchangeExportActionLogic<Id> = (
  args: TUseExchangeExportActionLogicArgs<Id>
) => {
  title: string;
  buttonText: string;
  addressInputLabel: string;
  selectedItems: SelectedItem<Id>[];
  inputHeader: string;
};

type TUseClaimActionLogicArgs<Id> = {
  selectedIds: Id[];
  exchangeCertificates: AccountAssetDTO[];
  allDevices: ComposedPublicDevice[];
  allFuelTypes: CodeNameDTO[];
};

export type TUseClaimActionLogic<Id> = (args: TUseClaimActionLogicArgs<Id>) => {
  title: string;
  buttonText: string;
  selectedItems: SelectedItem<Id>[];
};

export type ClaimBeneficiaryFormValues = {
  startDate: Dayjs;
  endDate: Dayjs;
  purpose: string;
};

export type TUseClaimBeneficiariesFormLogic = () => Pick<
  GenericFormProps<ClaimBeneficiaryFormValues>,
  'initialValues' | 'validationSchema' | 'fields'
>;

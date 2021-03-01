import { AnyDevice } from '../types';
import { IOriginDevice } from '@energyweb/origin-ui-core';
// import { ComposedDevice, ComposedPublicDevice } from "@energyweb/origin-ui-irec-core";
import { IEnvironment } from '../features/general';

export function deviceById<T extends AnyDevice>(
    id: string,
    devices: T[],
    environment: IEnvironment
): T {
    return devices.find(
        (device) =>
            device.externalDeviceIds.find((ids) => ids.type === environment.ISSUER_ID).id === id
    );
}

export function deviceTypeChecker(device: AnyDevice): device is IOriginDevice {
    return Object.prototype.hasOwnProperty.call(device, 'facilityName');
}

export function getDeviceName(id: string, devices: AnyDevice[], environment: IEnvironment): string {
    const device = deviceById(id, devices, environment);
    const deviceName = deviceTypeChecker(device) ? device.facilityName : device.name;
    return deviceName;
}

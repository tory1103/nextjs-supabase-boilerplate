import { isUUID } from 'validator';

export const guardIsValidUUID = (uuid: string) => async () => isUUID(uuid);

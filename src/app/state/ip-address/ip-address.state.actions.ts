import { IpAddress } from "./ip-address.state";

export class FetchIpAddress {
  static readonly type = 'Fetch ip address';
  constructor(public searchQuery: string) { 
  }
}

export class FetchIpAddressSuccess {
  static readonly type = 'Fetch ip address success';
  constructor(public ipAddress: IpAddress) { 
  }
}

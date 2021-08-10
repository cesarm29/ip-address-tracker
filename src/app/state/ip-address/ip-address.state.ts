import { FetchIpAddress, FetchIpAddressSuccess } from "./ip-address.state.actions";
import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ImmutableContext } from "@ngxs-labs/immer-adapter";
import { environment } from "src/environments/environment";
import axios from "axios";

interface Proxy {
  proxy: boolean;
  vpn: boolean;
  tor: boolean;
}

interface Location {
  geonameId: number;
  lat: number;
  lng: number;
  country: string;
  region: string;
  city: string;
  postalCode: string;
  timezone: string;
}

interface As {
  asn: number;
  name: string;
  route: string;
  domain: string;
  type: string;
}

export interface IpAddress {
  ip?: string;
  isp?: string;
  domains?: string[];
  location?: Location;
  as?: As;
  proxy?: Proxy;
}

export interface IpAddressStateModel {
  ipAddress: IpAddress;
  loading: boolean;
  errorMessage: string;
}

export const ipAddressStateModelDefaults: IpAddressStateModel = {
  ipAddress: {},
  loading: false,
  errorMessage: ''
};

export const IP_ADDRESS_STATE = new StateToken<IpAddressStateModel>(
  "ipAddressState"
);

@State({
  name: IP_ADDRESS_STATE,
  defaults: ipAddressStateModelDefaults
})
@Injectable()
export class IpAddressState {

  @Selector([IP_ADDRESS_STATE])
  static loading(state: IpAddressStateModel): boolean {
    return state.loading;
  }

  @Selector([IP_ADDRESS_STATE])
  static ipAddress(state: IpAddressStateModel): IpAddress | null {
    if (Object.keys(state.ipAddress).length) {
      return state.ipAddress;
    } else {
      return null;
    }
  }

  @Selector([IP_ADDRESS_STATE])
  static errorMessage(state: IpAddressStateModel): string {
    return state.errorMessage;
  }

  @Action(FetchIpAddress)
  @ImmutableContext()
  async fetchIpAddress({ setState, dispatch }: StateContext<IpAddressStateModel>, { searchQuery }: FetchIpAddress) {
    try {
      setState((state: IpAddressStateModel) => {
        state.loading = true;
        state.errorMessage = "";
        return state;
      });

      // axios get data
      const { data } = await axios.get(
        `https://geo.ipify.org/api/v1?apiKey=${environment.IP_ADDRESS_API_KEY}&ipAddress=${searchQuery}`
      );

      dispatch(new FetchIpAddressSuccess(data));
    } catch (err) {
      setState((state: IpAddressStateModel) => {
        state.loading = false;
        state.errorMessage = 'No IP address found.';
        return state;
      });
    }
  }

  @Action(FetchIpAddressSuccess)
  @ImmutableContext()
  fetchIpAddressSuccess({ setState }: StateContext<IpAddressStateModel>, { ipAddress }: FetchIpAddressSuccess) {
    setState((state: IpAddressStateModel) => {
      state.ipAddress = ipAddress;
      state.loading = false;
      return state;
    });
  }
}

import { SimpleCore } from 'simple-core-state';

export interface IRequestType {
	url: string;
	method: string;
	headers: object;
	body: { key: string; value: string }[];
}

export interface ISavedRequestItem {
	name: string;
	request: IRequestType;
}

interface ICoreType {
	savedRequests: ISavedRequestItem[];
	global_variables: { [key: string]: string };
	using_saved_request: number | null;
	current: {
		url: string;
		method: string;
		headers: object;
		body: { key: string; value: string }[];
	};
}

const instance = new SimpleCore<ICoreType>({
	savedRequests: [],
	using_saved_request: null,
	current: { url: '', method: '', headers: {}, body: [] },
	global_variables: {},
});

instance.persist(['savedRequests', 'current', 'global_variables']);

instance.events.register(['settings']);

export const core = instance.core();

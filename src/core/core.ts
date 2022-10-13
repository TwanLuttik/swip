import { SimpleCore } from 'simple-core-state';

export interface IRequestType {}

interface ICoreType {
	savedRequests: IRequestType[];
	global_variables: { [key: string]: string };
	current: {
		url: string;
		method: string;
		headers: object;
		body: { [key: string]: any };
	};
}

const instance = new SimpleCore<ICoreType>({
	savedRequests: [],
	current: { url: '', method: '', headers: {}, body: {} },
	global_variables: {},
});

instance.persist(['savedRequests', 'current', 'global_variables']);

instance.events.register(['settings']);

export const core = instance.core();

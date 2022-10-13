import { useCallback, useState } from 'react';
import { useSimple, useSimpleEvent } from 'simple-core-state';
import { core } from './core';
import { Sidebar } from './app/main/Sidebar';
import styled from 'styled-components';
import Axios, { AxiosResponse } from 'axios';
import { ResultsContainer } from './app/main/ResultsContainer';
import { Block, IconButton, Text } from './components';
import Modal from 'react-modal';
import { Settings } from './app/settings/Settings';

const TABS: Tabs[] = ['headers', 'body'];
type Tabs = 'headers' | 'body';

const REQUEST_METHODS = ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'];
export const App = () => {
	const [currentTab, setCurrentTab] = useState<Tabs>('body');
	const [response, setResponse] = useState<AxiosResponse | null>(null);
	const [showSelectMethodBox, setShowSelectMethodBox] = useState(false);
	const [bodyNewEntry, setBodyNewEntry] = useState<{
		key: string;
		value: string;
	}>({ key: '', value: '' });

	const currentState = useSimple(core.current);

	const MAIN_REQUEST = async (m: string, path: string) => {
		let newBodyObject = {};
		currentState.body
			.filter((v) => !!v.key)
			.forEach((item) => {
				// @ts-ignore
				newBodyObject[item.key] = item.value;
			});

		const res = await Axios({
			method: m,
			url: path,
			data: newBodyObject,
		});
		console.log(res);

		setResponse(res);
	};

	const [settingsIsOpen, setSettingsIsOpen] = useState(false);
	useSimpleEvent(core._events.settings, (data: boolean) => {
		setSettingsIsOpen(data);
	});

	const updateBodyKey = useCallback(
		(v: string) => {
			setBodyNewEntry({ key: v, value: bodyNewEntry.value });
		},
		[bodyNewEntry]
	);

	const updateBodyValue = useCallback(
		(v: string) => {
			setBodyNewEntry({ key: bodyNewEntry.key, value: v });
		},
		[bodyNewEntry]
	);

	const removeEntryFromBody = (index: number) => {
		let a = currentState.body;
		a.splice(index, 1);

		core.current.patchObject({ body: a });
	};

	return (
		<div className="bg-black h-full min-h-full flex row">
			<Modal
				isOpen={settingsIsOpen}
				ariaHideApp={false}
				closeTimeoutMS={2000}
				style={{
					overlay: {},
					content: {
						inset: 0,
						border: 'unset',
						borderRadius: 0,
						backgroundColor: 'black',
						height: '100%',
						width: '100%',
						padding: 0,
					},
				}}
			>
				<Settings />
			</Modal>
			<Sidebar />
			<div style={{ width: '100%' }}>
				<URLbarSecion>
					<Block row>
						<UrlContainer>
							<SelectContainer>
								<p
									onClick={() => setShowSelectMethodBox(true)}
									style={{
										color: 'rgb(87, 251, 90)',
										cursor: 'pointer',
										fontSize: 14,
									}}
								>
									{currentState.method}
								</p>
								{showSelectMethodBox && (
									<SelectFloatingContainer>
										{REQUEST_METHODS.map(
											(requestMethod, requestMethodIndex) => (
												<SelectOption
													key={requestMethodIndex}
													onClick={() => {
														core.current.patchObject({ method: requestMethod });
														setShowSelectMethodBox(false);
													}}
												>
													{requestMethod}
												</SelectOption>
											)
										)}
									</SelectFloatingContainer>
								)}
							</SelectContainer>
							<div
								style={{
									height: '80%',
									width: 1.5,
									backgroundColor: '#ffffff1f',
									margin: 'auto 8px',
								}}
							/>
							<UrlInput
								value={currentState.url}
								onChange={(v) =>
									core.current.patchObject({ url: v?.currentTarget?.value })
								}
							/>
						</UrlContainer>
					</Block>
					<Button
						style={{ marginLeft: 10 }}
						onClick={() => MAIN_REQUEST(currentState.method, currentState.url)}
					>
						run
					</Button>
				</URLbarSecion>
				<div>
					<Block row padding={10}>
						{TABS.map((tab, tabIndex) => (
							<TabBtn
								key={tabIndex}
								selected={currentTab === tab}
								onClick={() => setCurrentTab(tab)}
							>
								{tab}
							</TabBtn>
						))}
					</Block>
					<Block>
						<Block row paddingLeft={10}>
							<Text style={{ marginRight: 155 }}>Name</Text>
							<Text>Value</Text>
						</Block>
						{currentTab === 'body' && (
							<div>
								{currentState?.body &&
									Object.entries(currentState?.body).map(
										(bodyItem, bodyIndex) => (
											<div
												key={bodyIndex}
												style={{ display: 'flex', alignItems: 'center' }}
											>
												<SmallInput
													autoCorrect="off"
													onChange={(v) => {}}
													// onChange={(v) => {
													// 	let a = currentState.body;
													// 	a[bodyItem[0]] = v.currentTarget.value;
													// 	core.current.patchObject({ body: a });
													// }}
													value={bodyItem[1].key}
												/>
												<SmallInput
													autoCorrect="off"
													onChange={(v) => {}}
													value={bodyItem[1].value}
												/>
												<p>{bodyIndex}</p>
												<IconButton
													icon="xmark"
													size={14}
													style={{ marginLeft: 10 }}
													onClick={() => removeEntryFromBody(bodyIndex)}
												/>
											</div>
										)
									)}

								<Block row style={{ opacity: 0.6 }}>
									<SmallInput
										autoCorrect="off"
										value={bodyNewEntry.key}
										onChange={(v) => updateBodyKey(v.currentTarget.value)}
									/>
									<SmallInput
										autoCorrect="off"
										onChange={(v) => updateBodyValue(v.currentTarget.value)}
										value={bodyNewEntry.value}
										onKeyDown={(v) => {
											if (v.key === 'Enter') {
												let b = currentState.body;

												b.push(bodyNewEntry);

												core.current.patchObject({ body: b });
												setBodyNewEntry({ key: '', value: '' });
											}
										}}
									/>
								</Block>
							</div>
						)}
					</Block>
					<div style={{ marginTop: 50 }}>{JSON.stringify(document.cookie)}</div>
				</div>
			</div>
			<ResultsContainer axiosResults={response} />
		</div>
	);
};

const TabBtn = styled.p<{ selected: boolean }>`
	margin: 0px 5px;
	font-size: 14px;
	padding: 2px 5px;
	border-radius: 4px;
	background-color: #232323;
	cursor: pointer;
	border: solid 1px ${({ selected }) => (selected ? '#a4f69095' : '#ffffff12')};

	/* ${({ selected }) => !selected && 'opacity: 0.8;'} */

	:hover {
		${({ selected }) => !selected && 'opacity: 0.7;'}
	}

	transition: opacity 0.2s ease-in-out, border 0.2s ease-in-out;
`;

const UrlContainer = styled.div`
	display: flex;
	flex-direction: row;
	background-color: #1e1e1e;
	border: solid 1px #ffffff12;
	border-radius: 6px;
	height: 28px;
	padding: 2px 6px;
	width: 300px;
`;

const SelectContainer = styled.div``;

const SelectFloatingContainer = styled.div`
	background-color: #242424;
	border: solid 1px #ffffff12;
	padding: 5px;
	position: relative;
	z-index: 20;
	border-radius: 10px;
	top: 20px;
	left: -8px;
`;

const SelectOption = styled.p`
	padding: 3px 6px;

	border-radius: 8px;
	font-size: 13px;
	color: #cfcfcf;
	/* font-weight: 400; */
	margin: 2px 0px;
	cursor: pointer;
	:hover {
		/* background-color: #2e2e2e; */
		background-color: rgb(80, 185, 82);
		color: black;
	}

	/* transition: background-color 0.1s ease-in-out; */
`;

const URLbarSecion = styled.div`
	padding: 10px;
	background-color: #161616;
	border-bottom: solid 1px #ffffff12;
	display: flex;
	flex-direction: row;
`;

const UrlInput = styled.input`
	color: white;
	background-color: unset;
	font-size: 14px;
	width: 100%;
	/* padding: 2px 6px; */
	/* margin: 5px; */
	outline: none;
`;

const SmallInput = styled.input`
	background-color: #1e1e1e;
	border-radius: 6px;
	/* border: solid 1px #ffffff12; */
	color: white;
	font-size: 14px;
	padding: 2px 6px;
	margin-bottom: 5px;
	margin-left: 10px;
	outline: none;
`;

const Button = styled.button`
	background-color: #1c1c1c;
	border: solid 1px #ffffff12;
	/* padding: 5px; */
	border-radius: 6px;
	height: 28px;
	font-size: 14px;
	color: #54ee68;
	justify-content: center;
	padding: 0px 5px;
`;

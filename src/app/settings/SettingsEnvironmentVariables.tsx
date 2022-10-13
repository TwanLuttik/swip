import React, { useCallback, useEffect, useState } from 'react';
import { useSimple } from 'simple-core-state';
import styled from 'styled-components';
import { Block } from '../../components';
import { core } from '../../core';

export const SettingsEnvironmentVariables = () => {
	const [newEntry, setNewEntry] = useState<{ key: string; value: string }>({
		key: '',
		value: '',
	});
	const global_variables = useSimple(core.global_variables);

	const updateKeyname = (itemIndex: number, newKeyname: string) => {
		core.global_variables.set((prev) => {
			const keynameByIndex = Object.entries(global_variables)[itemIndex][0];
			const value = prev[keynameByIndex];
			delete prev[keynameByIndex];
			prev[newKeyname] = value;
			return prev;
		});
	};

	const updateValue = (itemIndex: number, newValue: string) => {
		core.global_variables.set((prev) => {
			const keynameByIndex = Object.entries(global_variables)[itemIndex][0];
			prev[keynameByIndex] = newValue;
			return prev;
		});
	};

	const createNewEntry = useCallback(() => {
		core.global_variables.set((prev) => {
			prev[newEntry.key] = newEntry.value;
			return prev;
		});

		setNewEntry({ key: '', value: '' });
	}, [newEntry]);

	const onValueChange = useCallback(
		(v: string) => {
			setNewEntry({ key: newEntry.key, value: v });
		},
		[newEntry]
	);

	const onKeyChange = useCallback(
		(v: string) => {
			setNewEntry({ key: v, value: newEntry.value });
		},
		[newEntry]
	);

	const removeEntry = (keyName: string) => {
		const a = global_variables;
		delete a[keyName];
		core.global_variables.set(a);
	};

	useEffect(() => {
		console.log('newEntry', newEntry);
	}, [newEntry]);

	return (
		<div>
			<p>{JSON.stringify(global_variables)}</p>
			<Block row style={{ marginTop: 25 }}>
				<p>name: </p>
				<p style={{ marginLeft: 150 }}>value: </p>
			</Block>
			{Object.entries(global_variables).map((item, index) => (
				<VariableEntry key={index} style={{ display: 'flex' }}>
					<SmallInput
						autoCorrect="off"
						value={item[0]}
						onChange={(v) => updateKeyname(index, v.currentTarget.value)}
					/>
					<SmallInput
						autoCorrect="off"
						value={item[1]}
						onChange={(v) => updateValue(index, v.currentTarget.value)}
					/>
					<RemoveBtn
						className="remove-btn"
						onClick={() => removeEntry(item[0])}
					>
						remove
					</RemoveBtn>
				</VariableEntry>
			))}

			<NewRow row>
				<SmallInput
					autoCorrect="off"
					value={newEntry.key}
					onChange={(v) => {
						console.log(v?.currentTarget?.value);
						onKeyChange(v?.currentTarget?.value);
					}}
				/>
				<SmallInput
					autoCorrect="off"
					value={newEntry.value}
					onChange={(v) => {
						console.log(v?.currentTarget?.value);
						onValueChange(v?.currentTarget?.value);
					}}
				/>
				<CreateBtn className="create-btn" onClick={() => createNewEntry()}>
					create
				</CreateBtn>
			</NewRow>
		</div>
	);
};

const NewRow = styled(Block)`
	display: flex;
	opacity: 0.7;
	margin-top: 10px;
	&:hover {
		.create-btn {
			opacity: 1;
		}
	}
`;

const SmallInput = styled.input`
	background-color: #1e1e1e;
	border-radius: 5px;
	border: solid 1px #ffffff12;
	color: white;
	font-size: 14px;
	padding: 2px 6px;
	/* margin: 4px; */
	margin-bottom: 8px;
	margin-right: 10px;
	outline: none;
`;

const RemoveBtn = styled.div`
	cursor: pointer;
	color: #ff5252;
	opacity: 0;
	font-weight: 500;
	font-size: 14px;

	&:hover {
		opacity: 0.6 !important;
	}

	transition: opacity 0.15s ease-in-out;
`;

const CreateBtn = styled.div`
	cursor: pointer;
	color: #7eed67;
	opacity: 0;
	font-weight: 500;
	font-size: 14px;

	&:hover {
		opacity: 0.6 !important;
	}

	transition: opacity 0.15s ease-in-out;
`;

const VariableEntry = styled.div`
	:hover {
		.remove-btn {
			opacity: 1;
		}
	}
`;

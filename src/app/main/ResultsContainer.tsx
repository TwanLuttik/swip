import { AxiosResponse } from 'axios';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
	a11yDark,
	atomOneDark,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styled from 'styled-components';

interface IResultsContainerProps {
	axiosResults: AxiosResponse | null;
}

export const ResultsContainer = (p: IResultsContainerProps) => {
	return (
		<ResultsContainerBody>
			<InfoBox>
				<StatusBox>{p.axiosResults?.status}</StatusBox>
			</InfoBox>
			{p.axiosResults?.data && (
				<CodeSyntaxHighLighter
					language="json"
					lineProps={{
						style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' },
					}}
					wrapLines={true}
					style={{
						...atomOneDark,
						...{ hljs: { backgroundColor: 'rgb(19, 19, 19)' } },
					}}
					customStyle={{
						fontSize: 12,
						backgroundColor: 'rgb(19, 19, 19)',
						color: 'white',
						padding: 10,
						height: '100%',
						overflowWrap: 'anywhere',
					}}
				>
					{JSON.stringify(p.axiosResults?.data, null, 2)}
				</CodeSyntaxHighLighter>
			)}
			{/* <p>{JSON.stringify(p.axiosResults?.data)}</p> */}
		</ResultsContainerBody>
	);
};

const ResultsContainerBody = styled.div`
	border-left: solid 1px #ffffff12;
	background-color: rgb(19, 19, 19);
	width: 400px;
	min-width: 400px;
	overflow-y: scroll;
	/* padding: 10px; */
`;

const CodeSyntaxHighLighter = styled(SyntaxHighlighter)`
	code {
		/* background-color: rgb(23, 23, 23); */
	}
`;

const InfoBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 50px;
	background-color: rgb(23, 23, 23);
	border-bottom: solid 1px #ffffff12;
	padding: 10px;
`;

const StatusBox = styled.p`
	border: solid 1px #ffffff12;
	color: rgb(86, 248, 91);
	background-color: rgb(29, 83, 31);
	width: fit-content;
	font-size: 13px;
	padding: 2px 6px;
	border-radius: 6px;
	font-weight: 500;
`;

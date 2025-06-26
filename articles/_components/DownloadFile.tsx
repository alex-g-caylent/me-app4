"use client";
import { Button } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { saveAs } from "file-saver";
import { getCookie } from "cookies-next";

interface Props {
	pdf: Pdf;
}

type Pdf = {
	content: String;
	title: String;
	extension: String;
};

const downloadPDF = async (articleId: string) => {
	const jwt = getCookie("jwt");
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_APIBASE}/articles/${articleId}/download`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		}
	);
	const downloadedDocument = await res.json();
	const byteCharacters = atob(downloadedDocument.content);
	const byteNumbers = new Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}
	const atobfile = new Uint8Array(byteNumbers);
	const data: Blob = new Blob([atobfile], {
		type: downloadedDocument.mimeType,
	});

	saveAs(data, downloadedDocument.title + "." + downloadedDocument.extension);
};

const DownloadFile = ({ articleId }: { articleId: string }) => {
	return (
		<Button style={{ width: "100%" }} onClick={() => downloadPDF(articleId)}>
			Download the resource
		</Button>
	);
};

export default DownloadFile;

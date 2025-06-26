"use client";
import { Flex } from "@radix-ui/themes";
import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

type Competency = {
	id: string;
	skills: Skill[];
};

type Skill = {
	id: string;
	name: string;
};

interface Props {
	competency: Competency;
	assessmentValues: Number[];
	expectedValues: Number[];
}

const BarChart = ({ competency, assessmentValues, expectedValues }: Props) => {
	const chartRef = useRef(null);
	const chartCompetency = competency;
	const labels = [""];
	const assessmentValuesForChart = assessmentValues;
	const expectedValuesForChart = expectedValues;
	chartCompetency.skills.map((skill) => labels.push(skill.name));
	labels.shift();

	useEffect(() => {
		if (chartRef.current) {
			if (chartRef.current.chart) {
				chartRef.current.chart.destroy();
			}
		}

		const context = chartRef.current.getContext("2d");
		const newChart = new Chart(context, {
			type: "radar",
			data: {
				labels: labels,
				datasets: [
					{
						data: assessmentValuesForChart,
						backgroundColor: "rgba(0,0,0,0)",
						borderColor: "#db837d",
						borderWidth: 2,
					},
					{
						data: expectedValuesForChart,
						backgroundColor: "rgba(0,0,0,0)",
						borderColor: "#d6d0d0",
						borderWidth: 2,
					},
				],
			},
			options: {
				plugins: {
					legend: {
						display: false,
					},
				},
				responsive: true,
				scales: {
					r: {
						ticks: {
							display: false,
						},
						angleLines: {
							display: false,
						},
						suggestedMin: 0,
						suggestedMax: 4,
					},
				},
			},
		});
		chartRef.current.chart = newChart;
	});

	return (
		<Flex
			justify={"center"}
			style={{
				position: "relative",
				maxWidth: "700px",
				width: "100%",
				height: "100%",
				maxHeight: "500px",
			}}
		>
			<canvas ref={chartRef} />
		</Flex>
	);
};

export default BarChart;

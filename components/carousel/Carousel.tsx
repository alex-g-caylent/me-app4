"use client";

import { Flex } from "@radix-ui/themes";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useEffect, useRef, useCallback } from "react";
import { NextPrevButton } from "./NextPrevButton";
import styles from "./carousel.module.css";

const SCROLL_INTO_VIEW_CONFIG: ScrollIntoViewOptions = {
	behavior: "smooth",
	block: "nearest",
	inline: "start",
};

export const Carousel = ({ children }: { children: React.ReactNode }) => {
	const carouselRef = useRef<HTMLDivElement>(null);
	const visibleChildrenRef = useRef<HTMLElement[]>([]);
	const handleIntersect = (entries: IntersectionObserverEntry[]) => {
		const updatedVisibleChildren = new Set(visibleChildrenRef.current);
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				updatedVisibleChildren.add(entry.target as HTMLElement);
			} else {
				updatedVisibleChildren.delete(entry.target as HTMLElement);
			}
		});

		visibleChildrenRef.current = Array.from(updatedVisibleChildren).sort(
			(a: HTMLElement, b: HTMLElement) => a.offsetLeft - b.offsetLeft
		);
	};

	const nextItem = useCallback(() => {
		const firstVisibleItem = visibleChildrenRef.current?.[0];
		firstVisibleItem.nextElementSibling?.scrollIntoView(
			SCROLL_INTO_VIEW_CONFIG
		);
	}, [visibleChildrenRef]);
	const prevItem = useCallback(() => {
		const firstVisibleItem = visibleChildrenRef.current?.[0];
		firstVisibleItem.previousElementSibling?.scrollIntoView(
			SCROLL_INTO_VIEW_CONFIG
		);
	}, [visibleChildrenRef]);

	useEffect(() => {
		const observer = new IntersectionObserver(handleIntersect, {
			root: carouselRef.current,
			rootMargin: "0px",
			threshold: 0.75,
		});

		Array.from(carouselRef.current?.children || []).forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<Flex
			justify={"between"}
			align="center"
			className="border-[1px] rounded-md"
		>
			<NextPrevButton onClick={prevItem}>
				<HiChevronLeft size="24" />
			</NextPrevButton>
			<div className={styles.carousel} ref={carouselRef}>
				{children}
			</div>
			<NextPrevButton onClick={nextItem}>
				<HiChevronRight size="24" />
			</NextPrevButton>
		</Flex>
	);
};

import AskMaestro from "../components/AskMaestro";

export default function DashboardLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			{/* Include shared UI here e.g. a header or sidebar */}
			{children}
		</section>
	);
}

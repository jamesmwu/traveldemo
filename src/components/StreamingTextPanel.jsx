import { useRef, useEffect } from "react";
import "./StreamingTextPanel.css";

const StreamingTextPanel = ({ text, isStreaming }) => {
	const panelRef = useRef(null);

	// Auto-scroll to the bottom when new text appears
	useEffect(() => {
		if (panelRef.current) {
			const scrollToBottom = () => {
				const scrollHeight = panelRef.current.scrollHeight;
				const height = panelRef.current.clientHeight;
				const maxScrollTop = scrollHeight - height;

				// Use smooth scrolling with a slight delay to ensure content is rendered
				setTimeout(() => {
					panelRef.current.scrollTo({
						top: maxScrollTop,
						behavior: "smooth",
					});
				}, 50);
			};

			scrollToBottom();

			// Add another scroll check after DOM has fully updated
			const checkScroll = requestAnimationFrame(() => {
				scrollToBottom();
			});

			return () => cancelAnimationFrame(checkScroll);
		}
	}, [text]);

	// Convert newlines to <br> tags
	const formatText = (content) => {
		if (!content) return "";

		// Split by newline and map to JSX
		return content.split("\n").map((line, index) => (
			<span key={index}>
				{line}
				{index < content.split("\n").length - 1 && <br />}
			</span>
		));
	};

	return (
		<div className="streaming-panel">
			<div className="panel-header">
				<h3>Your Personalized Itinerary</h3>
				{isStreaming && (
					<div className="streaming-indicator">
						<span className="dot"></span>
						<span className="dot"></span>
						<span className="dot"></span>
					</div>
				)}
			</div>

			<div className="panel-content" ref={panelRef}>
				{text ? (
					<div className="streaming-text">
						{formatText(text)}
						{isStreaming && <span className="cursor-blink">|</span>}
					</div>
				) : (
					<div className="empty-state">
						Your personalized travel plan will appear here as you make
						selections.
					</div>
				)}
			</div>
		</div>
	);
};

export default StreamingTextPanel;

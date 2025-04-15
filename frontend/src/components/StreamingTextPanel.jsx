import { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./StreamingTextPanel.css";

const StreamingTextPanel = ({ text, isLoading }) => {
	const panelRef = useRef(null);

	// Auto-scroll to the bottom when new text appears or loading state changes
	useEffect(() => {
		if (panelRef.current) {
			const scrollToBottom = () => {
				const scrollHeight = panelRef.current.scrollHeight;
				const height = panelRef.current.clientHeight;
				const maxScrollTop = scrollHeight - height;

				// Use smooth scrolling with a slight delay
				setTimeout(() => {
					if (panelRef.current) {
						// Add check if panelRef still exists
						panelRef.current.scrollTo({
							top: maxScrollTop > 0 ? maxScrollTop : 0,
							behavior: "smooth",
						});
					}
				}, 50);
			};

			// Scroll immediately and then again after a short delay
			scrollToBottom();
			const timeoutId = setTimeout(scrollToBottom, 100); // Additional scroll after potential re-render

			// Add another scroll check after DOM has fully updated via animation frame
			const checkScroll = requestAnimationFrame(() => {
				scrollToBottom();
			});

			return () => {
				clearTimeout(timeoutId);
				cancelAnimationFrame(checkScroll);
			};
		}
	}, [text, isLoading]); // Scroll when text updates or loading finishes

	return (
		<div className="streaming-panel">
			<div className="panel-header">
				<h3>Your Personalized Itinerary</h3>
				<div className="header-controls">
					{isLoading && (
						<div className="streaming-indicator">
							<span className="dot"></span>
							<span className="dot"></span>
							<span className="dot"></span>
						</div>
					)}
				</div>
			</div>

			<div className="panel-content" ref={panelRef}>
				{text ? (
					<div className="streaming-text markdown-content">
						<ReactMarkdown>{text}</ReactMarkdown>
						{isLoading && <span className="cursor-blink">|</span>}
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

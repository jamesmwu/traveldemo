import { useRef, useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import "./StreamingTextPanel.css";

// Define STEPS constant locally or import it if available globally
const STEPS = {
	BASIC_INFO: 0,
	ACTIVITY_PREFERENCES: 1,
	DETAILED_CUSTOMIZATION: 2,
	REVIEW_SAVE: 3,
};

const StreamingTextPanel = ({ text, isStreaming, currentStep }) => {
	const panelRef = useRef(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(text || "");
	const [suggestionText, setSuggestionText] = useState("");

	// Update editText when the main text prop changes (unless editing)
	useEffect(() => {
		if (!isEditing) {
			setEditText(text || "");
		}
	}, [text, isEditing]);

	// Auto-scroll to the bottom when new text appears (only when not editing)
	useEffect(() => {
		if (panelRef.current && !isEditing) {
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
	}, [text, isEditing]);

	// Convert newlines to <br> tags for display
	const formatDisplayText = (content) => {
		if (!content) return "";
		return content.split("\n").map((line, index, arr) => (
			<span key={index}>
				{line}
				{index < arr.length - 1 && <br />}
			</span>
		));
	};

	const handleEditToggle = () => {
		if (isEditing) {
			// If cancelling, revert editText to original prop text
			setEditText(text || "");
		}
		setIsEditing(!isEditing);
		setSuggestionText(""); // Clear suggestion on toggle
	};

	const handleSave = () => {
		// Here you would potentially:
		// 1. Send `editText` back up to the parent to update the source state.
		// 2. Send `suggestionText` to an LLM endpoint.
		console.log("Save clicked. New itinerary:", editText);
		console.log("Suggestion for LLM:", suggestionText);
		// For now, just exit edit mode
		setIsEditing(false);
		// Optionally, update the main 'text' prop via a callback if needed
	};

	return (
		<div className="streaming-panel">
			<div className="panel-header">
				<h3>Your Personalized Itinerary</h3>
				<div className="header-controls">
					{isStreaming && (
						<div className="streaming-indicator">
							<span className="dot"></span>
							<span className="dot"></span>
							<span className="dot"></span>
						</div>
					)}
					{!isStreaming &&
						currentStep >= STEPS.ACTIVITY_PREFERENCES && ( // Conditionally render based on step
							<button
								className="edit-button"
								onClick={handleEditToggle}
								title={isEditing ? "Cancel Edit" : "Edit Itinerary"}
							>
								<FaPencilAlt />
							</button>
						)}
				</div>
			</div>

			{isEditing && (
				<div className="edit-suggestion-section">
					<textarea
						className="suggestion-input"
						placeholder="Suggest changes for the AI to make... (e.g., 'Make Day 2 less busy')"
						value={suggestionText}
						onChange={(e) => setSuggestionText(e.target.value)}
						rows={2}
					/>
					<div className="edit-actions">
						<button onClick={handleSave} className="save-button">
							Save Changes
						</button>
						<button onClick={handleEditToggle} className="cancel-button">
							Cancel
						</button>
					</div>
				</div>
			)}

			<div className="panel-content" ref={panelRef}>
				{isEditing ? (
					<textarea
						className="edit-textarea"
						value={editText}
						onChange={(e) => setEditText(e.target.value)}
					/>
				) : text ? (
					<div className="streaming-text">
						{formatDisplayText(text)}
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

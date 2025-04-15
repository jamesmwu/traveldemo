// Mock data and helper functions to simulate API responses

// Popular destination information
export const destinations = {
	Paris: {
		country: "France",
		region: "Europe",
		description:
			"The City of Light offers iconic landmarks, world-class cuisine, and charming neighborhoods to explore.",
		bestTimeToVisit: "April to June, September to October",
		language: "French",
		currency: "Euro (€)",
		activities: [
			"Visit the Eiffel Tower",
			"Explore the Louvre Museum",
			"Stroll along the Seine River",
			"Visit Notre-Dame Cathedral",
			"Discover Montmartre and Sacré-Cœur",
			"Shop on Champs-Élysées",
			"Visit the Palace of Versailles",
			"Explore the Latin Quarter",
			"Visit the Musée d'Orsay",
			"Explore the Catacombs of Paris",
			"Wander through the Luxembourg Gardens",
			"Experience the Moulin Rouge",
			"Visit the Centre Pompidou",
			"Take a day trip to Giverny",
			"Discover the Marais district",
		],
		dining: [
			"Traditional French bistro dinner",
			"Wine tasting experience",
			"Croissants at a local bakery",
			"Gourmet food tour",
			"Fine dining at a Michelin-starred restaurant",
			"Sample cheese at a fromagerie",
			"Enjoy crêpes from a street vendor",
			"Try escargot at a classic brasserie",
			"Indulge in French pastries",
			"Visit a Parisian café",
		],
		funFacts: [
			"Paris has 130 museums in total",
			"The Eiffel Tower was built for the 1889 World's Fair",
			'Paris was originally a Roman city called "Lutetia"',
			"There are 6,100 streets in Paris",
			"The Louvre is the world's most visited museum",
			"There are over 470 parks and gardens in Paris",
			"Paris has only one stop sign in the entire city",
			"The Eiffel Tower was meant to be a temporary structure",
			"There's a mini Statue of Liberty on the Seine River",
			"The oldest bridge in Paris is Pont Neuf, built in 1607",
		],
	},
	Tokyo: {
		country: "Japan",
		region: "Asia",
		description:
			"A bustling metropolis that seamlessly blends ultramodern technology with traditional Japanese culture.",
		bestTimeToVisit: "March to May, September to November",
		language: "Japanese",
		currency: "Japanese Yen (¥)",
		activities: [
			"Visit Senso-ji Temple in Asakusa",
			"Explore the Tokyo Imperial Palace",
			"Experience the Shibuya Crossing",
			"Shop in Ginza",
			"Visit the Tokyo Skytree",
			"Explore Meiji Shrine",
			"Discover Akihabara Electric Town",
			"Enjoy views from Tokyo Tower",
			"Visit the Tsukiji Outer Market",
			"Relax in Ueno Park",
			"Explore Shinjuku Gyoen National Garden",
			"Visit TeamLab Borderless digital art museum",
			"Experience a traditional tea ceremony",
			"Attend a sumo wrestling match",
			"Take a day trip to Mount Fuji",
		],
		dining: [
			"Authentic sushi experience",
			"Ramen noodle tour",
			"Traditional izakaya dining",
			"Visit a themed cafe",
			"Try wagyu beef teppanyaki",
			"Experience the Tsukiji fish market",
			"Sample sake at a local brewery",
			"Visit a conveyor belt sushi restaurant",
			"Try traditional Japanese sweets",
			"Experience a multi-course kaiseki meal",
		],
		funFacts: [
			"Tokyo has the most Michelin-starred restaurants in the world",
			"Tokyo was formerly known as Edo",
			"The Tokyo metropolitan area is the most populous in the world",
			"Tokyo has over 200 train stations",
			"Vending machines in Tokyo sell everything from food to flowers",
			"Tokyo hosts the world's busiest pedestrian crossing at Shibuya",
			"Tokyo taxis have automatic doors operated by the driver",
			"There are more than 160,000 restaurants in Tokyo",
			"The Tokyo Skytree is the tallest tower in the world",
			"Tokyo is one of the safest major cities in the world",
		],
	},
	"New York City": {
		country: "United States",
		region: "North America",
		description:
			"The Big Apple offers iconic landmarks, diverse neighborhoods, world-class museums, and a vibrant food scene.",
		bestTimeToVisit: "April to June, September to November",
		language: "English",
		currency: "US Dollar ($)",
		activities: [
			"Visit Times Square",
			"Walk through Central Park",
			"See the Statue of Liberty",
			"Explore the Metropolitan Museum of Art",
			"Walk across the Brooklyn Bridge",
			"Visit the Empire State Building",
			"Discover the High Line",
			"Experience Broadway",
			"Visit the 9/11 Memorial & Museum",
			"Explore different neighborhoods like SoHo, Chinatown, and Little Italy",
			"Experience world-class shopping on Fifth Avenue",
			"Visit the American Museum of Natural History",
			"Explore Chelsea Market",
			"Take the Staten Island Ferry for harbor views",
			"Visit the Museum of Modern Art (MoMA)",
		],
		dining: [
			"Classic New York pizza",
			"Bagels and lox",
			"Food cart hot dogs",
			"Fine dining in Manhattan",
			"Explore diverse ethnic cuisines",
			"Try a classic New York cheesecake",
			"Sample delicacies at Chelsea Market",
			"Dine in Little Italy",
			"Experience a trendy brunch spot",
			"Visit the famous Katz's Delicatessen",
		],
		funFacts: [
			"NYC has over 26,000 restaurants",
			"More than 800 languages are spoken in New York City",
			"The NYC subway system has 472 stations",
			"Central Park was the first landscaped public park in the United States",
			"Wall Street is named after an actual wall that once stood there",
			"New York City was briefly the capital of the United States",
			"Times Square is named after The New York Times",
			"The first pizzeria in America opened in NYC in 1905",
			"The New York Public Library has over 50 million items",
			"The Brooklyn Bridge took 14 years to build",
		],
	},
	Bali: {
		country: "Indonesia",
		region: "Asia",
		description:
			"Known as the Island of the Gods, Bali offers stunning beaches, lush rice terraces, and a rich cultural heritage.",
		bestTimeToVisit: "April to October",
		language: "Indonesian, Balinese",
		currency: "Indonesian Rupiah (Rp)",
		activities: [
			"Visit sacred temples like Uluwatu and Tanah Lot",
			"Explore the monkey forest in Ubud",
			"Relax on Kuta or Seminyak beaches",
			"Tour the Tegalalang Rice Terraces",
			"Experience traditional Balinese dance performances",
			"Take a yoga class in Ubud",
			"Hike up Mount Batur for sunrise",
			"Go snorkeling or diving in Amed",
			"Visit the Ubud Art Market",
			"Experience water sports in Nusa Dua",
			"Take a cooking class to learn Balinese cuisine",
			"Visit the Elephant Cave (Goa Gajah)",
			"Explore the Jatiluwih Rice Terraces",
			"Discover the Tirta Empul Temple",
			"Take a day trip to Nusa Penida",
		],
		dining: [
			"Sample traditional Babi Guling (suckling pig)",
			"Try Nasi Campur (mixed rice)",
			"Enjoy fresh seafood on Jimbaran Beach",
			"Experience a traditional Balinese feast",
			"Visit trendy cafes in Seminyak",
			"Try Indonesian satay",
			"Sample local coffee",
			"Enjoy fresh tropical fruits",
			"Try Bebek Betutu (slow-cooked duck)",
			"Experience farm-to-table dining in Ubud",
		],
		funFacts: [
			"Bali is just one of Indonesia's 17,500 islands",
			"Balinese people follow a unique form of Hinduism",
			"The Balinese calendar has 210 days",
			"Bali is home to over 10,000 temples",
			"Every Balinese child is given one of four names",
			"Touching someone's head is considered taboo in Bali",
			"The Balinese celebrate their New Year with a day of silence (Nyepi)",
			"Most families in Bali live in compounds with several generations",
			"Bali has one of the highest densities of spas in the world",
			"The island is home to over 400 species of birds",
		],
	},
	Rome: {
		country: "Italy",
		region: "Europe",
		description:
			"The Eternal City is a living museum of ancient ruins, Renaissance art, and vibrant street life.",
		bestTimeToVisit: "April to June, September to October",
		language: "Italian",
		currency: "Euro (€)",
		activities: [
			"Explore the Colosseum and Roman Forum",
			"Visit the Vatican Museums and Sistine Chapel",
			"Throw a coin in the Trevi Fountain",
			"Climb the Spanish Steps",
			"Marvel at the Pantheon",
			"Explore the catacombs",
			"Wander through Villa Borghese gardens",
			"Visit Castel Sant'Angelo",
			"Explore the trendy Trastevere neighborhood",
			"Take a day trip to Pompeii",
			"Visit the Galleria Borghese",
			"Explore the ancient Appian Way",
			"Visit the Capitoline Museums",
			"Experience the vibrant Testaccio Market",
			"See Roman mosaics at Palazzo Massimo",
		],
		dining: [
			"Classic Roman pasta dishes (Carbonara, Cacio e Pepe)",
			"Pizza al taglio (pizza by the slice)",
			"Gelato from artisanal shops",
			"Wine tasting in local enotecas",
			"Try supplì (fried rice balls)",
			"Enjoy aperitivo in the evening",
			"Sample Roman street food",
			"Try traditional saltimbocca alla Romana",
			"Visit the food markets",
			"Experience authentic espresso culture",
		],
		funFacts: [
			"Rome has more than 2,000 fountains",
			"The Romans built the first shopping mall (Trajan's Market)",
			"Rome has a secret keyhole with a perfect view of St. Peter's dome",
			"The Vatican is the smallest country in the world",
			"Romans throw about €1.5 million into the Trevi Fountain annually",
			"Rome has a cat sanctuary in ancient ruins",
			"The Pantheon has a hole in its dome called the oculus",
			"Rome has more churches than any other city in the world",
			"The city was founded in 753 BC",
			"St. Peter's Basilica took 120 years to build",
		],
	},
};

// Default fallback data for when destination is not in our database
export const defaultDestinationData = {
	description:
		"A fascinating destination waiting to be explored with unique attractions and cultural experiences.",
	activities: [
		"Visit local landmarks and attractions",
		"Explore cultural sites and museums",
		"Experience local cuisine",
		"Shop at local markets",
		"Take a guided city tour",
		"Visit natural attractions nearby",
		"Enjoy nightlife and entertainment",
		"Take day trips to surrounding areas",
		"Relax at parks and public spaces",
		"Try local activities and experiences",
	],
	dining: [
		"Try local specialties",
		"Visit popular restaurants",
		"Experience street food",
		"Enjoy fine dining options",
		"Take a food tour",
		"Visit local markets",
		"Try regional beverages",
		"Experience traditional cooking",
	],
	funFacts: [
		"Every destination has its own unique history",
		"Local customs and traditions vary greatly around the world",
		"Travel broadens your horizons and perspective",
		"Trying local cuisine is one of the best ways to experience a culture",
		"Many destinations have festivals and events unique to their culture",
	],
};

// Function to get destination data
export const getDestinationData = (destination) => {
	if (!destination) {
		return defaultDestinationData;
	}

	// Find partial matches (e.g., "Paris, France" should match "Paris")
	const destinationKey = Object.keys(destinations).find((key) =>
		destination.toLowerCase().includes(key.toLowerCase())
	);

	return destinations[destinationKey] || defaultDestinationData;
};

// Budget estimates by category
export const budgetEstimates = {
	Budget: {
		accommodation: "$40-100 per night",
		food: "$20-40 per day",
		activities: "$15-40 per day",
		transportation: "$10-20 per day",
		total: "$85-200 per day",
	},
	"Mid-range": {
		accommodation: "$100-250 per night",
		food: "$40-80 per day",
		activities: "$40-80 per day",
		transportation: "$20-40 per day",
		total: "$200-450 per day",
	},
	Luxury: {
		accommodation: "$250+ per night",
		food: "$80-150+ per day",
		activities: "$80-200+ per day",
		transportation: "$40-100+ per day",
		total: "$450-1000+ per day",
	},
};

// Accommodation types with descriptions
export const accommodationTypes = {
	Hotel:
		"Standard hotel accommodations with amenities like daily housekeeping and room service.",
	Resort:
		"Full-service properties with on-site dining, activities, and amenities.",
	"Apartment/Vacation Rental":
		"Self-catering accommodations with kitchen facilities and more space.",
	"Boutique Hotel": "Unique, stylish smaller hotels with personalized service.",
	Hostel:
		"Budget-friendly shared accommodations popular with backpackers and solo travelers.",
	Villa:
		"Luxury private homes with premium amenities and often a private pool.",
	"All-Inclusive Resort":
		"Resorts where meals, drinks, and many activities are included in the price.",
};

// Travel styles with descriptions
export const travelStyles = {
	relaxed: {
		description: "A leisurely pace with plenty of downtime between activities",
		activitiesPerDay: 1 - 2,
		bestFor:
			"Relaxation-focused travelers, families with young children, or longer stays",
	},
	balanced: {
		description:
			"A moderate pace with a mix of scheduled activities and free time",
		activitiesPerDay: 2 - 3,
		bestFor: "Most travelers seeking a blend of experiences without exhaustion",
	},
	active: {
		description: "A full schedule to maximize experiences in limited time",
		activitiesPerDay: 3 - 5,
		bestFor:
			"Short trips, energetic travelers wanting to see everything possible",
	},
};

// Get random items from an array
export const getRandomItems = (array, count = 3) => {
	if (!array || array.length === 0) return [];

	// Make a copy to avoid modifying the original
	const shuffled = [...array].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Generate a day-by-day itinerary
export const generateDayByDayItinerary = (
	destination,
	durationDays,
	activities
) => {
	const destinationData = getDestinationData(destination);
	const allActivities = [...(destinationData.activities || [])];

	// If we have limited activities in our data, add some generic ones to ensure variety
	if (allActivities.length < durationDays * 3) {
		allActivities.push(
			"Explore local markets",
			"Visit a popular local attraction",
			"Take a guided tour of the area",
			"Visit a local museum",
			"Try a popular local restaurant",
			"Take a leisurely stroll through the city",
			"Visit a historical site",
			"Explore a local park",
			"Experience local nightlife",
			"Take part in a cultural activity"
		);
	}

	// Add customization based on selected activities if provided
	if (activities && activities.length > 0) {
		const customActivities = [];
		activities.forEach((activity) => {
			if (activity === "Cultural & Museums") {
				customActivities.push(
					"Visit the main cultural museum",
					"Explore historical district",
					"Attend a cultural performance"
				);
			} else if (activity === "Outdoor & Nature") {
				customActivities.push(
					"Hike in nearby nature reserve",
					"Visit botanical gardens",
					"Take a scenic nature walk"
				);
			} else if (activity === "Adventure Activities") {
				customActivities.push(
					"Go zip-lining",
					"Try water sports",
					"Take a guided adventure tour"
				);
			} else if (activity === "Food & Culinary") {
				customActivities.push(
					"Take a cooking class",
					"Join a food tour",
					"Visit local food markets"
				);
			} else if (activity === "Relaxation & Wellness") {
				customActivities.push(
					"Enjoy a spa day",
					"Take a yoga class",
					"Relax on the beach"
				);
			} else if (activity === "Nightlife & Entertainment") {
				customActivities.push(
					"Experience local nightlife",
					"Attend a live performance",
					"Visit popular bars"
				);
			} else if (activity === "Shopping") {
				customActivities.push(
					"Shop at local boutiques",
					"Visit main shopping districts",
					"Browse local artisan markets"
				);
			} else if (activity === "Historical Sites") {
				customActivities.push(
					"Visit ancient ruins",
					"Tour historical buildings",
					"Explore cultural heritage sites"
				);
			} else if (activity === "Family-Friendly") {
				customActivities.push(
					"Visit local theme parks",
					"Explore interactive museums",
					"Enjoy family-friendly attractions"
				);
			} else if (activity === "Local Experiences") {
				customActivities.push(
					"Meet local artisans",
					"Participate in local traditions",
					"Join community events"
				);
			}
		});
		allActivities.push(...customActivities);
	}

	// Create itinerary structure
	const itinerary = [];
	const usedActivities = new Set(); // Track used activities to avoid repetition

	for (let day = 1; day <= durationDays; day++) {
		// First and last days have travel considerations
		if (day === 1) {
			itinerary.push({
				day,
				title: "Arrival Day",
				activities: [
					"Arrive at destination",
					"Transfer to accommodation and check-in",
					"Brief orientation walk around the neighborhood",
					"Relaxed dinner to recover from travel",
					"Early night to adjust to local time",
				],
			});
		} else if (day === durationDays) {
			itinerary.push({
				day,
				title: "Departure Day",
				activities: [
					"Breakfast at accommodation",
					"Free morning for last-minute exploring or shopping",
					"Pack and prepare for departure",
					"Check-out from accommodation",
					"Transportation to airport/train station",
					"Departure from destination",
				],
			});
		} else {
			// Regular day - get activities not used yet
			const availableActivities = allActivities.filter(
				(activity) => !usedActivities.has(activity)
			);

			// If we're running low on unique activities, reset the tracker
			if (availableActivities.length < 4) {
				usedActivities.clear();
			}

			// Get 3-4 random activities
			const dayActivities = getRandomItems(availableActivities, 4);

			// Mark these activities as used
			dayActivities.forEach((activity) => usedActivities.add(activity));

			// Get a random dining experience
			const diningExperience = getRandomItems(
				destinationData.dining || ["Enjoy a meal at a local restaurant"],
				1
			)[0];

			// Add structure for the day
			const dayTitle =
				day === 2 ? "City Exploration" : `Day ${day} - Adventure`;

			const fullDaySchedule = [
				"Breakfast at accommodation or local cafe",
				...dayActivities.slice(0, 2),
				"Lunch break at a local restaurant",
				...dayActivities.slice(2),
				diningExperience,
				"Evening relaxation",
			];

			itinerary.push({
				day,
				title: dayTitle,
				activities: fullDaySchedule,
			});
		}
	}

	return itinerary;
};

export const mockGeneratedItinerary = `
**Your Trip to Paris**

**Duration:** 7 Days
**Budget:** Mid-range

**Accommodation:** Hotel

**Day 1: Arrival & Montmartre Charm**
*   Arrive in Paris, check into your hotel.
*   Explore the artistic neighborhood of Montmartre.
*   Visit the Sacré-Cœur Basilica for stunning city views.
*   Evening: Enjoy dinner at a traditional bistro.

**Day 2: Iconic Landmarks**
*   Morning: Ascend the Eiffel Tower (pre-book tickets!).
*   Afternoon: Take a relaxing Seine River cruise.
*   Visit the Arc de Triomphe and stroll down the Champs-Élysées.

**Day 3: Art & History**
*   Full Day: Immerse yourself in art at the Louvre Museum (plan your visit!).
*   Explore the Tuileries Garden.

**Day 4: Left Bank & Gardens**
*   Morning: Visit the Musée d'Orsay, housed in a former train station.
*   Afternoon: Wander through the Luxembourg Gardens.
*   Explore the Latin Quarter and Shakespeare & Company bookstore.

**Day 5: Palace Grandeur (Day Trip)**
*   Full Day: Take a day trip to the Palace of Versailles. Explore the palace and its vast gardens (allow ample time).

**Day 6: Culture & Shopping**
*   Morning: Visit the Centre Pompidou for modern art.
*   Afternoon: Explore the Le Marais district for boutiques and historic sites.
*   Optional: Visit Notre Dame Cathedral (exterior view as restoration continues).

**Day 7: Departure**
*   Enjoy a final Parisian breakfast.
*   Last-minute souvenir shopping or revisit a favorite spot.
*   Depart from Paris.

**Possible Customizations:**
*   More Museums: Consider Musée Rodin or Musée de l'Orangerie.
*   Food Focus: Add a food tour in Le Marais or a cooking class.
*   Adventure: Catacombs visit or a bike tour along the Seine.
*   Relaxation: Enjoy more time in cafes, parks, or consider a spa afternoon.
`;

// Add this new export
export const mockItineraryUpdates = {
	destination: "Okay, planning a trip to the selected destination!",
	startDate: "Got the start date. Let's plan around that.",
	endDate: "End date noted. Calculating trip duration.",
	budget: "Budget level set. Finding suitable options.",
	numTravelers: "Number of travelers updated.",
	selectedActivities: "Activity preferences updated. Adding to the mix!",
	tripPace: "Trip pace adjusted. Tailoring the schedule.",
	accommodation: "Accommodation preference saved.",
	customizations: "Customization selected. Refining the itinerary.",
	transportation: "Transportation preference noted.",
	specialRequests: "Special requests added. Will try to incorporate!",
	includeBreakfast: "Breakfast preference updated.",
	includeAirportTransfer: "Airport transfer preference updated.",
	default: "Updating your itinerary based on the latest selection...",
};

export default {
	getDestinationData,
	budgetEstimates,
	getRandomItems,
	generateDayByDayItinerary,
	accommodationTypes,
	travelStyles,
};

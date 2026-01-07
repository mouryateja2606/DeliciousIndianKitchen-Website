export interface MenuItem {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    image?: string;
    attributes?: {
        isVeg?: boolean;
        isVegan?: boolean; // Added isVegan
        isSpicy?: boolean;
        containsMilk?: boolean;
        isKidFriendly?: boolean;
    };
    allergenCodes?: string[]; // e.g. ["A", "G", "1"]
    nutritionalInfo?: {
        calories: number;
        protein: string;
        carbs: string;
        fats: string;
        fiber?: string; // Added fiber
        vitamins: string[]
        benefits: string[];
        description: string;
        ingredients?: string[]; // Added ingredients
        descriptionDE?: string; // German Description
        ingredientsDE?: string[]; // German Ingredients
        dietaryLabel?: string; // e.g. "Vegetarian (Contains Egg)"
        dietaryLabelDE?: string; // e.g. "Vegetarisch (Enthält Ei)"
    };
}

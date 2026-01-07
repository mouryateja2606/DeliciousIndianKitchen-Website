import { useEffect, useState } from "react";
import { getNutritionalInfo } from "../data/nutritional-enrichment";
import { FULL_MENU_ITEMS } from "../data/full-menu";

export interface MenuItem {
    id: string;
    title: string;
    price: string;
    priceAmount: number;
    currency: string;
    img?: string;
    description?: string;
    category: string;
    attributes?: {
        isVeg?: boolean;
        isVegan?: boolean;
        isSpicy?: boolean;
        containsMilk?: boolean;
        isKidFriendly?: boolean;
    };
    allergenCodes?: string[];
    nutritionalInfo?: {
        calories: number;
        protein: string;
        carbs: string;
        fats: string;
        vitamins: string[];
        benefits: string[];
        description: string;
        fiber?: string;
        ingredients?: string[];
        descriptionDE?: string;
        ingredientsDE?: string[];
        dietaryLabel?: string;
        dietaryLabelDE?: string;
        titleDE?: string; // ADDED
    };
    titleDE?: string; // ADDED to top level for easy access
}

export function useSumupMenu() {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Direct load (Synchronous/Instant)
        setLoading(true);
        try {
            const productsList = FULL_MENU_ITEMS;

            const menu = productsList.map((p: any) => {
                const variantPrice = p.variants?.[0]?.price;
                const priceObj = p.price ?? variantPrice;

                const rawAmount = priceObj?.amount?.value ?? priceObj?.amount;
                const amountMajor = rawAmount ? (rawAmount / 100) : 0;
                const currency = priceObj?.amount?.currency ?? priceObj?.currency ?? 'EUR';

                const imageUrl = (p.image_urls && p.image_urls.length > 0)
                    ? p.image_urls[0]
                    : (p.image_url || undefined);

                // Manual Overrides to guarantee correct Veg/Non-Veg status
                const manualVegOverrides: Record<string, boolean> = {
                    "Vegetable Dum Biryani": true,
                    "Paneer Butter Masala": true,
                    "Chapatti(1 nos)": true,
                    "Parota(1 nos)": true,
                    "Veg Puff": true,
                    "Sambar Idly": true,
                    "Ghee Roast": true,
                    "Kalaki": true,
                    "Egg Omelet": true,
                    "Masala Dosa": true,
                    "Plain Dosa": true,
                    "Onion Uttapam": true,
                    "Vada Sambar": true,
                    "Pazhampori (Banana Fritters)": true,
                    "Pazhampori": true,
                    "Dhal Vada": true,
                    "Masala Chai": true,
                    "Medhu Vada (1 pc)": true,
                    "Gulab Jamun": true,
                    "Rose Milk": true,
                    "Egg Roast": true, // User requested Green Dot for Egg
                    "Egg Puff": true,
                    "Omelet": true,
                    "Egg Paniyaram": true,
                    // New additions
                    "Masala Roast": true,
                    "Onion Roast": true,
                    "Plain Roast": true,
                    "Podi Roast": true,
                    "Paniyaram": true,
                    "Sambar Vada": true,
                    "Medhu Vada": true,
                    "Mango Lassi": true,
                    "Appam Batter": true,

                    "Ambur Chicken Biryani": false,
                    "Hyderabadi Chicken Biryani": false,
                    "Butter Chicken": false,
                    "Chicken Tikka Masala": false,
                    "Chettinad Chicken": false,
                    "Pepper Chicken": false
                };

                const cleanName = p.name ? p.name.replace(/\s+/g, ' ').trim() : "";
                const nutritionalInfo = getNutritionalInfo(cleanName);

                // Determine Final isVeg status: Override > Calculated > Default to False (Safety)
                // Note: We deliberately default undefined to FALSE (Red Dot) via the explicit check later
                // But for the attribute, let's try to be precise.

                let isVegFinal = nutritionalInfo?.isVeg;

                // Apply Override if exists (Case Insensitive)
                const lowerCleanName = cleanName.toLowerCase();
                // DEBUG: Log mismatch if expected
                // console.log(`Checking override for: "${lowerCleanName}"`);

                const overrideKey = Object.keys(manualVegOverrides).find(k => {
                    const draggingKey = k.toLowerCase();
                    // Exact match OR match if the key is a significant part of the name (e.g. "Ghee Roast" in "Special Ghee Roast")
                    return draggingKey === lowerCleanName || (lowerCleanName.includes(draggingKey) && draggingKey.length > 5);
                });

                if (overrideKey) {
                    isVegFinal = manualVegOverrides[overrideKey];
                    // console.log(`Override APPLIED for ${cleanName}: ${isVegFinal}`);
                }

                // Fallback for known keywords if still undefined
                if (isVegFinal === undefined) {
                    // Safety: Check Non-Veg FIRST
                    if (lowerCleanName.includes("chicken") ||
                        lowerCleanName.includes("mutton") ||
                        lowerCleanName.includes("fish") ||
                        lowerCleanName.includes("prawn") ||
                        lowerCleanName.includes("beef") ||
                        lowerCleanName.includes("meat")) {
                        isVegFinal = false;
                    } else if (lowerCleanName.includes("veg") ||
                        lowerCleanName.includes("paneer") ||
                        lowerCleanName.includes("roast") ||
                        lowerCleanName.includes("vada") ||
                        lowerCleanName.includes("paniyaram") ||
                        lowerCleanName.includes("chai") ||
                        lowerCleanName.includes("lassi") ||
                        lowerCleanName.includes("milk") ||
                        lowerCleanName.includes("puff") ||
                        lowerCleanName.includes("jamun") ||
                        lowerCleanName.includes("appam") ||
                        lowerCleanName.includes("fritters") ||
                        lowerCleanName.includes("bajji") ||
                        lowerCleanName.includes("bonda") ||
                        lowerCleanName.includes("kalaki") ||
                        lowerCleanName.includes("omelet") ||
                        lowerCleanName.includes("pazhampori")) {
                        isVegFinal = true;
                    }
                }

                return {
                    id: p.item_id || p.id,
                    title: p.name,
                    titleDE: nutritionalInfo?.titleDE, // Map titleDE
                    price: `${amountMajor.toFixed(2)} ${currency}`,
                    priceAmount: amountMajor,
                    currency: currency,
                    img: imageUrl,
                    description: p.description || "",
                    category: p.category_ids?.[0] || 'other',
                    attributes: {
                        isVeg: isVegFinal,
                        isVegan: nutritionalInfo?.isVegan,
                    },
                    nutritionalInfo: nutritionalInfo,
                };
            });
            setItems(menu);
        } catch (err: any) {
            console.error("Menu Load Error:", err);
            setError("Failed to load local menu");
        } finally {
            setLoading(false);
        }
    }, []);

    return { items, loading, error };
}

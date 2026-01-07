// Helper to generate nutritional info based on item name keywords
export const getNutritionalInfo = (itemName: string) => {
    const lowerName = itemName.toLowerCase();
    // DEBUG LOG
    if (lowerName.includes("vegetable")) {
        console.log(`DEBUG_FUNC: getNutritionalInfo called for '${lowerName}'`);
    }

    // Check for non-veg ingredients
    // REMOVED: "egg", "omelet", "kalaki" to allow them to be "Vegetarian (Contains Egg)" -> Green Dot
    const nonVegKeywords = ["chicken", "mutton", "lamb", "fish", "prawn"];
    const isVeg = !nonVegKeywords.some(keyword => lowerName.includes(keyword));

    // Base object builder
    const buildInfo = (info: any) => {
        // LOGIC UPDATE: Prefer explicit isVeg/isVegan from info object.
        // If not present, fallback to keyword check (but we are migrating to explicit).

        const autoVeg = !["chicken", "mutton", "lamb", "fish", "prawn"].some(keyword => lowerName.includes(keyword));
        const finalIsVeg = info.isVeg !== undefined ? info.isVeg : autoVeg;

        const isVegan = info.isVegan !== undefined ? info.isVegan : (info.dietaryLabel?.includes("Vegan") || false);

        return { ...info, isVeg: finalIsVeg, isVegan };
    };

    // 0. Exclude Packaged Beverages
    // We only show nutritional info for restaurant-made items
    if (lowerName.includes("cola") || lowerName.includes("water") || lowerName.includes("becks") || lowerName.includes("sprite") ||
        lowerName.includes("bull") || lowerName.includes("apfelschorle") || lowerName.includes("beer") || lowerName.includes("mix") ||
        lowerName.includes("fritz") || lowerName.includes("mezo")) {
        console.log(`DEBUG: Excluded '${lowerName}'`);
        return undefined;
    }

    // 1. Biryanis (Specific)
    if (lowerName.includes("ambur") && lowerName.includes("biryani")) {
        return buildInfo({
            isVeg: false, // HARDCODED
            calories: 650,
            protein: "35g",
            carbs: "75g",
            fats: "22g", // Slightly lower fat than Hyderbadi
            vitamins: ["Vitamin B6", "Vitamin B12", "Niacin"],
            fiber: "4g",
            benefits: ["Muscle Builder", "Sustained Energy", "Metabolism Boost"],
            description: "Traditional Ambur style biryani made with Seeraga Samba short-grain rice and moderate spice.",
            descriptionDE: "Traditionelles Biryani im Ambur-Stil, zubereitet mit kurzkörnigem Seeraga Samba-Reis und mäßiger Schärfe.",
            titleDE: "Ambur Hähnchen Biryani",
            ingredients: ["Seeraga Samba Rice", "Farm-Fresh Chicken", "Curd", "Red Onions", "Tomatoes", "Fresh Mint", "Ginger Garlic Paste", "Cinnamon", "Cloves", "Red Chili Paste"],
            ingredientsDE: ["Seeraga Samba Reis", "Frisches Hähnchen", "Quark", "Rote Zwiebeln", "Tomaten", "Frische Minze", "Ingwer-Knoblauch-Paste", "Zimt", "Nelken", "Rote Chilipaste"]
        });
    }
    if (lowerName.includes("hyderabadi") || (lowerName.includes("chicken") && lowerName.includes("biryani"))) {
        return buildInfo({
            isVeg: false, // HARDCODED
            calories: 700,
            protein: "38g",
            carbs: "80g",
            fats: "26g", // Richer due to Dum cooking and more ghee
            vitamins: ["Vitamin A", "Vitamin C", "Iron"],
            fiber: "3g",
            benefits: ["Rich Flavor", "High Protein", "Comfort Food"],
            description: "World-famous Hyderabadi Dum Biryani cooked with long-grain Basmati rice and rich aromatic spices.",
            descriptionDE: "Weltberühmtes Hyderabadi Dum Biryani, gekocht mit langkörnigem Basmati-Reis und reichhaltigen aromatischen Gewürzen.",
            titleDE: "Hyderabadi Hähnchen Biryani",
            ingredients: ["Basmati Rice", "Marinated Chicken", "Pure Ghee", "Saffron Milk", "Fried Onions (Barista)", "Fresh Coriander", "Mint", "Shahi Jeera", "Green Chilies", "Yogurt"],
            ingredientsDE: ["Basmati-Reis", "Mariniertes Hähnchen", "Reines Ghee", "Safranmilch", "Röstzwiebeln (Barista)", "Frischer Koriander", "Minze", "Shahi Jeera", "Grüne Chilis", "Joghurt"]
        });
    }
    if (lowerName.includes("mutton") || lowerName.includes("lamb")) {
        return buildInfo({
            isVeg: false, // HARDCODED
            calories: 720,
            protein: "38g",
            carbs: "75g",
            fats: "28g",
            vitamins: ["Iron", "Zinc", "Vitamin B12"],
            fiber: "4g",
            benefits: ["Rich in Iron", "Strength Building", "High Protein"],
            description: "Flavorful biryani with tender mutton pieces, offering a rich taste and high-quality protein.",
            descriptionDE: "Aromatisches Biryani mit zarten Lammfleischstücken, bietet einen reichen Geschmack und hochwertiges Protein.",
            titleDE: "Lamm Biryani",
            ingredients: ["Seeraga Samba Rice", "Tender Mutton/Lamb", "Pure Ghee", "Curd", "Fresh Mint", "Coriander", "Whole Spices (Bay Leaf, Clove, Cinnamon)", "Ginger", "Garlic", "Saffron"],
            ingredientsDE: ["Seeraga Samba Reis", "Zartes Lammfleisch", "Reines Ghee", "Quark", "Frische Minze", "Koriander", "Ganze Gewürze (Lorbeerblatt, Nelke, Zimt)", "Ingwer", "Knoblauch", "Safran"]
        });
    }
    if (lowerName.includes("veg") && (lowerName.includes("biryani") || lowerName.includes("rice bowl"))) {
        return buildInfo({
            isVeg: true, // HARDCODED
            calories: 550,
            protein: "12g",
            carbs: "85g",
            fats: "15g",
            vitamins: ["Vitamin C", "Vitamin A", "Fiber"],
            fiber: "9g",
            benefits: ["Heart Friendly", "Digestive Health", "Vitamin Rich"],
            description: "A wholesome combination of fresh garden vegetables and aromatic spices.",
            descriptionDE: "Eine gesunde Kombination aus frischem Gartengemüse und aromatischen Gewürzen.",
            titleDE: "Gemüse Biryani",
            ingredients: ["Basmati/Seeraga Rice", "Fresh Carrots", "Green Beans", "Garden Peas", "Potatoes", "Ghee", "Whole Spices", "Mint", "Cashews"],
            ingredientsDE: ["Basmati/Seeraga Reis", "Frische Karotten", "Grüne Bohnen", "Gartenerbsen", "Kartoffeln", "Ghee", "Ganze Gewürze", "Minze", "Cashewnüsse"]
        });
    }

    // 2. Curries (Specific)
    if (lowerName.includes("butter chicken")) {
        return buildInfo({
            isVeg: false, // HARDCODED
            calories: 480,
            protein: "28g",
            carbs: "18g",
            fats: "32g",
            vitamins: ["Vitamin A", "Calcium", "Lycopene"],
            fiber: "3g",
            benefits: ["Comfort Food", "Calcium Rich", "Immune Support"],
            description: "Tender chicken cooked in a rich, mild, and creamy tomato-based gravy with butter.",
            titleDE: "Butter Hähnchen",
            ingredients: ["Chicken Breast", "Butter", "Double Cream", "Fresh Tomatoes", "Cashew Paste", "Fenugreek Leaves", "Honey", "Mild Spices"],
            ingredientsDE: ["Hähnchenbrust", "Butter", "Doppelrahm", "Frische Tomaten", "Cashew-Paste", "Bockshornkleeblätter", "Honig", "Milde Gewürze"]
        });
    }
    if (lowerName.includes("tikka masala")) {
        return buildInfo({
            isVeg: false, // HARDCODED
            calories: 420,
            protein: "30g",
            carbs: "16g",
            fats: "26g",
            vitamins: ["Vitamin C", "Iron", "Vitamin B6"],
            fiber: "4g",
            benefits: ["High Protein", "Metabolism Boost", "Antioxidant Rich"],
            description: "Roasted marinated chicken chunks (tikka) in a spiced curry sauce, more flavorful than butter chicken.",
            titleDE: "Hähnchen Tikka Masala",
            ingredients: ["Grilled Chicken Tikka", "Onion Tomato Masala", "Ginger", "Garlic", "Coriander", "Cumin", "Turmeric", "Yogurt", "Cream (Light)"],
            ingredientsDE: ["Gegrilltes Hähnchen Tikka", "Zwiebel-Tomaten-Masala", "Ingwer", "Knoblauch", "Koriander", "Kreuzkümmel", "Kurkuma", "Joghurt", "Sahne (Leicht)"]
        });
    }
    if (lowerName.includes("chettinad")) {
        return buildInfo({
            isVeg: false, // HARDCODED
            calories: 380,
            protein: "32g",
            carbs: "12g",
            fats: "20g",
            vitamins: ["Vitamin C", "Iron", "Magnesium"],
            fiber: "5g",
            benefits: ["Authentic Spice", "Digestive Aid", "High Protein"],
            description: "Classic Tamil Nadu curry made with roast-ground exotic spices and aromatic curry leaves.",
            titleDE: "Chettinad Hähnchen",
            ingredients: ["Chicken", "Fennel Seeds", "Cinnamon", "Star Anise", "Stone Flower (Kalpasi)", "Tomatoes", "Onions", "Fresh Coconut"],
            ingredientsDE: ["Hähnchen", "Fenchelsamen", "Zimt", "Sternanis", "Steinflechte (Kalpasi)", "Tomaten", "Zwiebeln", "Frische Kokosnuss"]
        });
    }
    if (lowerName.includes("pepper chicken")) {
        return buildInfo({
            isVeg: false, // HARDCODED
            calories: 340,
            protein: "35g",
            carbs: "8g",
            fats: "16g",
            vitamins: ["Piperine", "Vitamin K", "Zinc"],
            fiber: "3g",
            benefits: ["Sinus Relief", "Fat Burner", "Lean Protein"],
            description: "Dry or semi-gravy dish dominated by fresh cracked black pepper and fennel.",
            ingredients: ["Chicken", "Black Peppercorns", "Fennel Seeds", "Curry Leaves", "Onions", "Garlic", "Turmeric", "Lemon Juice"]
        });
    }
    if (lowerName.includes("paneer butter")) {
        return buildInfo({
            isVeg: true, // HARDCODED
            calories: 450,
            protein: "18g",
            carbs: "22g",
            fats: "35g",
            vitamins: ["Calcium", "Vitamin D", "Vitamin A"],
            fiber: "3g",
            benefits: ["Bone Health", "Vegetarian Protein", "Rich Taste"],
            description: "Soft paneer cubes simmered in a luscious butter and tomato gravy.",
            ingredients: ["Fresh Paneer (Cottage Cheese)", "Butter", "Fresh Cream", "Ripe Tomatoes", "Cashew Nuts", "Ginger Garlic Paste", "Kasuri Methi", "Cardamom Powder", "Honey"]
        });
    }
    if (lowerName.includes("veg handi") || lowerName.includes("kurma")) {
        return buildInfo({
            isVeg: true, // HARDCODED
            calories: 320,
            protein: "10g",
            carbs: "25g",
            fats: "18g",
            vitamins: ["Fiber", "Vitamin C", "Antioxidants"],
            fiber: "8g",
            benefits: ["Light & Evaluate", "Gut Health", "Low Calorie"],
            description: "Mixed vegetables cooked in a flavorful yet light spiced gravy.",
            ingredients: ["Mixed Vegetables (Carrot, Beans, Cauliflower, Peas)", "Onions", "Tomatoes", "Coconut Milk", "Turmeric", "Coriander Powder", "Mustard Seeds", "Curry Leaves"]
        });
    }

    // 3. Dosas (Specific)
    if (lowerName.includes("masala") && (lowerName.includes("dosa") || lowerName.includes("roast"))) {
        return buildInfo({
            isVeg: true, // HARDCODED
            calories: 380,
            protein: "10g",
            carbs: "55g",
            fats: "12g",
            vitamins: ["Potassium", "Vitamin C", "Carbohydrates"],
            fiber: "6g",
            benefits: ["Complete Meal", "Energy Boosting", "Probiotic Batter"],
            description: "Crispy crepe stuffed with a savory spiced potato and onion filling.",
            descriptionDE: "Knuspriger Crêpe, gefüllt mit einer herzhaft gewürzten Kartoffel-Zwiebel-Mischung.",
            titleDE: "Masala Dosa",
            ingredients: ["Fermented Rice & Lentil Batter", "Potatoes", "Onions", "Mustard Seeds", "Turmeric", "Curry Leaves", "Green Chilies", "Ginger", "Oil/Ghee"],
            ingredientsDE: ["Fermentierter Reis- & Linsenteig", "Kartoffeln", "Zwiebeln", "Senfkörner", "Kurkuma", "Curryblätter", "Grüne Chilis", "Ingwer", "Öl/Ghee"]
        });
    }
    if (lowerName.includes("ghee roast")) {
        return buildInfo({
            isVeg: true, // HARDCODED
            calories: 420,
            protein: "8g",
            carbs: "50g",
            fats: "20g",
            vitamins: ["Vitamin A", "Butyric Acid", "Omega-3"],
            fiber: "2g",
            benefits: ["Good Fats", "Crispy Texture", "Ayurvedic Benefits"],
            description: "Thin and crispy crepe roasted with pure cow ghee for a rich aroma.",
            descriptionDE: "Dünner und knuspriger Crêpe, geröstet mit reinem Kuh-Ghee für ein reiches Aroma.",
            titleDE: "Ghee Roast",
            ingredients: ["Fermented Rice & Lentil Batter", "Pure Cow Ghee", "Salt"],
            ingredientsDE: ["Fermentierter Reis- & Linsenteig", "Reines Kuh-Ghee", "Salz"]
        });
    }
    if (lowerName.includes("egg") && (lowerName.includes("dosa") || lowerName.includes("uttapam"))) {
        return buildInfo({
            isVeg: true, // HARDCODED (Contains Egg)
            calories: 400,
            protein: "18g", // Egg boost
            carbs: "45g",
            fats: "15g",
            vitamins: ["Choline", "Selenium", "B12"],
            fiber: "2g",
            benefits: ["Protein Packed", "Brain Health", "Satiating"],
            description: "Dosa topped with beaten eggs and spices, a perfect protein-rich breakfast or dinner.",
            descriptionDE: "Dosa belegt mit geschlagenen Eiern und Gewürzen, ein perfektes proteinreiches Frühstück oder Abendessen.",
            titleDE: "Eier Dosa",
            ingredients: ["Rice & Lentil Batter", "Fresh Eggs", "Black Pepper", "Sea Salt", "Vegetable Oil", "Coriander Leaves"],
            ingredientsDE: ["Reis- & Linsenteig", "Frische Eier", "Schwarzer Pfeffer", "Meersalz", "Pflanzenöl", "Korianderblätter"]
        });
    }
    if (lowerName.includes("onion") && (lowerName.includes("dosa") || lowerName.includes("uttapam") || lowerName.includes("roast"))) {
        return buildInfo({
            isVeg: true, // HARDCODED
            isVegan: true,
            calories: 340,
            protein: "9g",
            carbs: "52g",
            fats: "10g",
            vitamins: ["Quercetin", "Vitamin C", "Sulfur"],
            fiber: "4g",
            benefits: ["Heart Health", "Flavorful", "Antioxidant Rich"],
            description: "Topped with chopped onions for a crunchy texture and sweet-savory flavor.",
            descriptionDE: "Belegt mit gehackten Zwiebeln für eine knusprige Textur und süß-herzhaften Geschmack.",
            titleDE: "Zwiebel Dosa",
            ingredients: ["Rice & Lentil Batter", "Fresh Red Onions", "Green Chilies", "Chopped Coriander", "Oil"],
            ingredientsDE: ["Reis- & Linsenteig", "Frische rote Zwiebeln", "Grüne Chilis", "Gehackter Koriander", "Öl"]
        });
    }

    // 4. Snacks / Starters
    if (lowerName.includes("samosa") || lowerName.includes("puff")) {
        return buildInfo({
            isVeg: true, // HARDCODED
            calories: 260,
            protein: "6g",
            carbs: "32g",
            fats: "14g",
            vitamins: ["Potassium", "Carbohydrates"],
            fiber: "3g",
            benefits: ["Comfort Snack", "Quick Energy"],
            description: "Crispy pastry filled with a spiced potato and pea mixture.",
            descriptionDE: "Knusprige Teigtasche gefüllt mit einer gewürzten Kartoffel-Erbsen-Mischung.",
            titleDE: "Samosa (2 Stück)",
            ingredients: ["Refined Flour (Maida)", "Potatoes", "Green Peas", "Cumin Seeds", "Garam Masala", "Vegetable Oil", "Ajwain"],
            ingredientsDE: ["Feines Mehl (Maida)", "Kartoffeln", "Grüne Erbsen", "Kreuzkümmel", "Garam Masala", "Pflanzenöl", "Ajwain"]
        });
    }
    if (lowerName.includes("chicken 65") || lowerName.includes("pakora")) {
        return buildInfo({
            isVeg: false, // HARDCODED
            calories: 380,
            protein: "25g",
            carbs: "15g",
            fats: "24g",
            vitamins: ["Protein", "Iron"],
            fiber: "1g",
            benefits: ["High Protein Snack", "Spicy Kick"],
            description: "Deep-fried marinated chicken bites with curry leaves and chilies.",
            descriptionDE: "Frittierte marinierte Hähnchenhappen mit Curryblättern und Chilis.",
            titleDE: "Chicken 65",
            ingredients: ["Boneless Chicken", "Ginger Garlic Paste", "Kashmiri Red Chili", "Curry Leaves", "Yogurt", "Rice Flour", "Corn Flour", "Lemon Juice", "Oil"],
            ingredientsDE: ["Knochenloses Hähnchen", "Ingwer-Knoblauch-Paste", "Kashmiri Rote Chili", "Curryblätter", "Joghurt", "Reismehl", "Maismehl", "Zitronensaft", "Öl"]
        });
    }
    if (lowerName.includes("vada")) {
        return buildInfo({
            isVeg: true, // HARDCODED
            isVegan: true,
            calories: 280,
            protein: "10g",
            carbs: "30g",
            fats: "16g",
            vitamins: ["Iron", "Magnesium", "Folate"],
            fiber: "5g",
            benefits: ["Plant Protein", "Crispy & Soft"],
            description: "Savory fried donut made from urad dal batter with spices.",
            descriptionDE: "Herzhafter frittierter Donut aus Urad-Dal-Teig mit Gewürzen.",
            titleDE: "Medu Vada (2 Stück)",
            ingredients: ["Whole Urad Dal", "Onions", "Green Chilies", "Crushed Black Pepper", "Curry Leaves", "Rice Flour", "Ginger", "Oil"],
            ingredientsDE: ["Ganze Urad Dal", "Zwiebeln", "Grüne Chilis", "Zerstoßener schwarzer Pfeffer", "Curryblätter", "Reismehl", "Ingwer", "Öl"]
        });
    }

    // 3. Egg Items
    if (lowerName.includes("egg roast")) {
        return buildInfo({
            isVeg: true,
            calories: 320,
            protein: "10g",
            carbs: "35g",
            fats: "14g",
            vitamins: ["Vitamin B12", "Selenium"],
            fiber: "2g",
            benefits: ["Protein Packed", "Energy Boosting"],
            description: "Fresh egg cooked with black pepper and South Indian spices until crisp.",
            descriptionDE: "Frisches Ei, gekocht mit schwarzem Pfeffer und südindischen Gewürzen, bis es knusprig ist.",
            titleDE: "Eier Roast",
            ingredients: ["Egg", "Black Pepper", "Spices", "Oil/Ghee"],
            ingredientsDE: ["Ei", "Schwarzer Pfeffer", "Gewürze", "Öl/Ghee"],
            dietaryLabel: "🟢 Vegetarian (Contains Egg)",
            dietaryLabelDE: "🟢 Vegetarisch (Enthält Ei)"
        });
    }
    if (lowerName.includes("egg paniyaram")) {
        return buildInfo({
            isVeg: true,
            calories: 380,
            protein: "12g",
            carbs: "50g",
            fats: "12g",
            vitamins: ["Vitamin B12", "Iron"],
            fiber: "2g",
            benefits: ["Traditional Taste", "Protein Rich"],
            description: "Soft and crispy rice dumplings with egg, served with sambar and chutney.",
            descriptionDE: "Weiche und knusprige Reisklößchen mit Ei, serviert mit Sambar und Chutney.",
            titleDE: "Eier Paniyaram",
            ingredients: ["Fermented Rice Batter", "Egg", "Onion", "Green Chili", "Coriander"],
            ingredientsDE: ["Fermentierter Reisteig", "Ei", "Zwiebel", "Grüne Chili", "Koriander"],
            dietaryLabel: "🟢 Vegetarian (Contains Egg)",
            dietaryLabelDE: "🟢 Vegetarisch (Enthält Ei)"
        });
    }
    if (lowerName.includes("egg puff")) {
        return buildInfo({
            isVeg: true,
            calories: 300,
            protein: "9g",
            carbs: "25g",
            fats: "18g",
            vitamins: ["Vitamin D", "Calcium"],
            fiber: "1g",
            benefits: ["Savory Snack", "On-the-go"],
            description: "Golden baked puff pastry filled with spiced boiled egg.",
            descriptionDE: "Goldbraun gebackener Blätterteig gefüllt mit gewürztem gekochtem Ei.",
            titleDE: "Eierblätterteig",
            ingredients: ["Puff Pastry (Maida, Butter)", "Boiled Egg", "Onion Masala", "Spices"],
            ingredientsDE: ["Blätterteig (Weizenmehl, Butter)", "Gekochtes Ei", "Zwiebel-Masala", "Gewürze"],
            dietaryLabel: "🟢 Vegetarian (Contains Egg)",
            dietaryLabelDE: "🟢 Vegetarisch (Enthält Ei)"
        });
    }
    if (lowerName.includes("omelet")) {
        return buildInfo({
            isVeg: true,
            calories: 160,
            protein: "12g",
            carbs: "3g",
            fats: "11g",
            vitamins: ["Vitamin A", "Vitamin B12"],
            fiber: "0g",
            benefits: ["High Protein", "Low Carb"],
            description: "Freshly made egg omelet seasoned with onions, green chili, and spices.",
            descriptionDE: "Frisch zubereitetes Eieromelett, gewürzt mit Zwiebeln, grünen Chilis und Gewürzen.",
            titleDE: "Omelett",
            ingredients: ["Eggs", "Onion", "Green Chili", "Salt", "Pepper", "Oil"],
            ingredientsDE: ["Eier", "Zwiebel", "Grüne Chili", "Salz", "Pfeffer", "Öl"],
            dietaryLabel: "🟢 Vegetarian (Contains Egg)",
            dietaryLabelDE: "🟢 Vegetarisch (Enthält Ei)"
        });
    }
    if (lowerName.includes("kalaki")) {
        return buildInfo({
            isVeg: true,
            calories: 140,
            protein: "11g",
            carbs: "2g",
            fats: "10g",
            vitamins: ["Protein", "B Vitamins"],
            fiber: "0g",
            benefits: ["Soft Texture", "Protein Snack"],
            description: "Soft South Indian style half-cooked egg delicacy, mildly spiced.",
            descriptionDE: "Weiche südindische Eierspezialität, halb gekocht und mild gewürzt.",
            titleDE: "Kalaki",
            ingredients: ["Egg", "Chicken/Veg Gravy (optional, usually just spices/onion)", "Pepper", "Oil"],
            ingredientsDE: ["Ei", "Gewürze/Zwiebel", "Pfeffer", "Öl"],
            dietaryLabel: "🟢 Vegetarian (Contains Egg)",
            dietaryLabelDE: "🟢 Vegetarisch (Enthält Ei)"
        });
    }

    // Missing Dosas
    if (lowerName.includes("plain") && (lowerName.includes("dosa") || lowerName.includes("roast"))) {
        return buildInfo({
            isVeg: true,
            isVegan: true,
            calories: 200,
            protein: "4g",
            carbs: "35g",
            fats: "6g",
            vitamins: ["Carbs", "Energy"],
            fiber: "2g",
            benefits: ["Light & Crispy", "Gut Friendly"],
            description: "Thin, golden, and crispy plain dosa.",
            descriptionDE: "Dünner, goldener und knuspriger Dosa.",
            titleDE: "Einfacher Dosa",
            ingredients: ["Rice Batter", "Oil"],
            ingredientsDE: ["Reisteig", "Öl"],
            dietaryLabel: "🌿 Vegan",
            dietaryLabelDE: "🌿 Vegan"
        });
    }
    if (lowerName.includes("dosa") && lowerName.includes("2")) {
        return buildInfo({
            isVeg: true,
            isVegan: true,
            calories: 300,
            protein: "8g",
            carbs: "60g",
            fats: "4g",
            vitamins: ["Carbs", "Energy"],
            fiber: "4g",
            benefits: ["Filling Meal", "Gut Friendly"],
            description: "Two soft plain dosas served with Sambar and Chutney.",
            descriptionDE: "Zwei weiche Dosas, serviert mit Sambar und Chutney.",
            titleDE: "Dosa (2 Stück)",
            ingredients: ["Rice/Lentil Batter"],
            ingredientsDE: ["Reis-/Linsenteig"],
            dietaryLabel: "🌿 Vegan (Served with Sambar/Chutney)",
            dietaryLabelDE: "🌿 Vegan (Serviert mit Sambar/Chutney)"
        });
    }
    if (lowerName.includes("onion skt") || lowerName.includes("onion uttapam")) { // Check for Onion Uttapam
        return buildInfo({
            isVeg: true,
            isVegan: true,
            calories: 250,
            protein: "6g",
            carbs: "45g",
            fats: "5g",
            vitamins: ["Vitamin C", "Fiber"],
            fiber: "3g",
            benefits: ["Soft & Fluffy", "Satiating"],
            description: "Soft and thick uttapam topped with onions, lightly crisped on the outside.",
            descriptionDE: "Weicher und dicker Uttapam mit Zwiebelbelag, außen leicht knusprig.",
            titleDE: "Zwiebel Uttapam",
            ingredients: ["Thick Batter", "Onion", "Green Chili"],
            ingredientsDE: ["Dicker Teig", "Zwiebel", "Grüner Chili"],
            dietaryLabel: "🌿 Vegan",
            dietaryLabelDE: "🌿 Vegan"
        });
    }
    if (lowerName.includes("uttapam") && lowerName.includes("2")) {
        return buildInfo({
            isVeg: true,
            isVegan: true,
            calories: 350,
            protein: "8g",
            carbs: "70g",
            fats: "4g",
            vitamins: ["Vitamin B Complex"],
            fiber: "4g",
            benefits: ["Filling", "Gut Health"],
            description: "Traditional soft uttapam with a fluffy texture and mild sourness.",
            descriptionDE: "Traditioneller weicher Uttapam mit fluffiger Textur und milder Säure.",
            titleDE: "Uttapam (2 Stück)",
            ingredients: ["Thick Rice/Lentil Batter"],
            ingredientsDE: ["Dicker Reis-/Linsenteig"],
            dietaryLabel: "🌿 Vegan",
            dietaryLabelDE: "🌿 Vegan"
        });
    }

    // Snacks & Sidedishes
    if (lowerName.includes("veg puff")) {
        return buildInfo({
            isVeg: true,
            isVegan: true,
            calories: 280,
            protein: "5g",
            carbs: "30g",
            fats: "16g",
            vitamins: ["Vitamin A", "Fiber"],
            fiber: "2g",
            benefits: ["Light Snack", "Veggie Filled"],
            description: "Flaky pastry filled with mildly spiced vegetable stuffing.",
            descriptionDE: "Blättriges Gebäck gefüllt mit mild gewürzter Gemüsefüllung.",
            titleDE: "Gemüseblätterteig",
            ingredients: ["Puff Pastry", "Mixed Vegetable Masala (Potatoes, Peas, Carrots)"],
            ingredientsDE: ["Blätterteig", "Gemüse-Masala (Kartoffeln, Erbsen, Karotten)"],
            dietaryLabel: "🌿 Vegan (Check pastry fat source)",
            dietaryLabelDE: "🌿 Vegan (Prüfen Sie die Fettquelle des Teigs)"
        });
    }
    if (lowerName.includes("vada") && lowerName.includes("sambar")) {
        return buildInfo({
            isVeg: true,
            isVegan: true,
            calories: 350,
            protein: "12g",
            carbs: "45g",
            fats: "14g",
            vitamins: ["Protein", "Iron"],
            fiber: "5g",
            benefits: ["Protein Rich", "Comfort Food"],
            description: "Crispy lentil vada immersed in hot, flavorful sambar.",
            descriptionDE: "Knusprige Linsen-Vada, getaucht in heißes, aromatisches Sambar.",
            titleDE: "Sambar Vada",
            ingredients: ["Urad Dal Fritter", "Sambar"],
            ingredientsDE: ["Urad Dal Krapfen", "Sambar"],
            dietaryLabel: "🌿 Vegan",
            dietaryLabelDE: "🌿 Vegan"
        });
    }
    if (lowerName.includes("idly plate") || (lowerName.includes("idly") && lowerName.includes("4"))) {
        return buildInfo({
            isVeg: true,
            isVegan: true,
            calories: 240,
            protein: "8g",
            carbs: "50g",
            fats: "2g",
            vitamins: ["Protein", "Fiber"],
            fiber: "4g",
            benefits: ["Steamed & Healthy", "Weight Loss Friendly"],
            description: "Steamed rice cakes served with sambar and chutney, a healthy staple.",
            descriptionDE: "Gedämpfte Reiskuchen serviert mit Sambar und Chutney, ein gesundes Grundnahrungsmittel.",
            titleDE: "Idly Platte (4 Stück)",
            ingredients: ["Steamed Idly", "Sambar", "Chutney"],
            ingredientsDE: ["Gedämpftes Idly", "Sambar", "Chutney"],
            dietaryLabel: "🌿 Vegan",
            dietaryLabelDE: "🌿 Vegan"
        });
    }
    if (lowerName.includes("sambar idly")) {
        return buildInfo({
            isVeg: true,
            isVegan: true,
            calories: 200,
            protein: "8g",
            carbs: "38g",
            fats: "2g",
            vitamins: ["Protein", "Fiber"],
            fiber: "3g",
            benefits: ["Steamed & Healthy", "Weight Loss Friendly"],
            description: "Soft idlies soaked in hot, aromatic sambar for a comforting South Indian meal.",
            descriptionDE: "Weiche Idlis, eingeweicht in heißem, aromatischem Sambar.",
            titleDE: "Sambar Idly",
            ingredients: ["Steamed Idly", "Lentil Sambar"],
            ingredientsDE: ["Gedämpftes Idly", "Linsen-Sambar"],
            dietaryLabel: "🌿 Vegan",
            dietaryLabelDE: "🌿 Vegan"
        });
    }
    if (lowerName.includes("paniyaram")) {
        return buildInfo({
            isVeg: true,
            isVegan: true,
            calories: 320,
            protein: "8g",
            carbs: "60g",
            fats: "6g",
            vitamins: ["Iron", "B Vitamins"],
            fiber: "2g",
            benefits: ["Kid Friendly", "Crispy Snack"],
            description: "Soft and crispy rice dumplings served with sambar and chutney.",
            descriptionDE: "Weiche und knusprige Reisklößchen, serviert mit Sambar und Chutney.",
            titleDE: "Paniyaram (7 Stück)",
            ingredients: ["Fermented Rice Batter", "Seasoning"],
            ingredientsDE: ["Fermentierter Reisteig", "Würzung"],
            dietaryLabel: "🌿 Vegan (Unless made with ghee)",
            dietaryLabelDE: "🌿 Vegan (Außer bei Zubereitung mit Ghee)"
        });
    }
    if (lowerName.includes("pazhampori")) {
        return buildInfo({
            isVeg: true,
            isVegan: true,
            calories: 180,
            protein: "2g",
            carbs: "30g",
            fats: "8g",
            vitamins: ["Potassium", "Vitamin B6"],
            fiber: "2g",
            benefits: ["Sweet Snack", "Energy"],
            description: "Kerala-style ripe banana fritter, lightly sweet and crispy.",
            descriptionDE: "Reifer Bananenkrapfen nach Kerala-Art, leicht süß und knusprig.",
            titleDE: "Pazhampori (Bananenkrapfen)",
            ingredients: ["Ripe Banana", "Flour Batter", "Oil"],
            ingredientsDE: ["Reife Banane", "Mehlteig", "Öl"],
            dietaryLabel: "🌿 Vegan",
            dietaryLabelDE: "🌿 Vegan"
        });
    }
    if (lowerName.includes("gulab jamun")) {
        return buildInfo({
            isVeg: true,
            calories: 350,
            protein: "6g",
            carbs: "55g",
            fats: "12g",
            vitamins: ["Calcium", "Energy"],
            fiber: "0g",
            benefits: ["Sweet Treat", "Festive"],
            description: "Soft milk-solid dumplings soaked in fragrant sugar syrup.",
            descriptionDE: "Weiche Milchbällchen, getränkt in duftendem Zuckersirup.",
            titleDE: "Gulab Jamun (2 Stück)",
            ingredients: ["Milk Solids", "Flour", "Sugar Syrup", "Cardamom"],
            ingredientsDE: ["Milchtrockenmasse", "Mehl", "Zuckersirup", "Kardamom"],
            dietaryLabel: "🟢 Vegetarian (Contains Dairy)",
            dietaryLabelDE: "🟢 Vegetarisch (Enthält Milchprodukte)"
        });
    }
    if (lowerName.includes("masala chai")) {
        return buildInfo({
            isVeg: true,
            calories: 120,
            protein: "4g",
            carbs: "14g",
            fats: "4g",
            vitamins: ["Antioxidants", "Calcium"],
            fiber: "0g",
            benefits: ["Warming", "Energizing"],
            description: "Traditional Indian spiced tea brewed with milk and aromatic spices.",
            descriptionDE: "Traditioneller indischer Gewürztee, gebraut mit Milch und aromatischen Gewürzen.",
            ingredients: ["Black Tea", "Milk", "Ginger", "Cardamom", "Sugar"],
            ingredientsDE: ["Schwarzer Tee", "Milch", "Ingwer", "Kardamom", "Zucker"],
            dietaryLabel: "🟢 Vegetarian (Contains Dairy)",
            dietaryLabelDE: "🟢 Vegetarisch (Enthält Milchprodukte)"
        });
    }
    if (lowerName.includes("rose milk")) {
        return buildInfo({
            isVeg: true,
            calories: 220,
            protein: "6g",
            carbs: "30g",
            fats: "6g",
            vitamins: ["Calcium"],
            fiber: "0g",
            benefits: ["Cooling", "Sweet"],
            description: "A chilled milk drink delicately flavored with rose syrup, light, sweet, and refreshing.",
            descriptionDE: "Ein gekühltes Milchgetränk, zart aromatisiert mit Rosensirup, leicht, süß und erfrischend.",
            titleDE: "Rosenmilch",
            ingredients: ["Milk", "Rose Syrup", "Sugar"],
            ingredientsDE: ["Milch", "Rosensirup", "Zucker"],
            dietaryLabel: "🟢 Vegetarian (Contains Dairy)",
            dietaryLabelDE: "🟢 Vegetarisch (Enthält Milchprodukte)"
        });
    }
    if (lowerName.includes("parota")) {
        return buildInfo({
            isVeg: true, // HARDCODED
            calories: 280,
            protein: "5g",
            carbs: "35g",
            fats: "12g",
            vitamins: ["Energy", "Carbs"],
            fiber: "1g",
            benefits: ["Layered Texture", "Rich Taste"],
            description: "Layered South Indian flatbread, soft inside and crisp outside.",
            descriptionDE: "Geschichtetes südindisches Fladenbrot, innen weich und außen knusprig.",
            titleDE: "Parota (1 Stück)",
            ingredients: ["Maida (Refined Flour)", "Oil/Ghee"],
            ingredientsDE: ["Maida (Weizenmehl)", "Öl/Ghee"],
            dietaryLabel: "🟢 Vegetarian (Often contains Milk/Ghee)",
            dietaryLabelDE: "🟢 Vegetarisch (Oft mit Milch/Ghee)"
        });
    }
    if (lowerName.includes("chapatti")) {
        return buildInfo({
            isVeg: true, // HARDCODED
            isVegan: true,
            calories: 110,
            protein: "4g",
            carbs: "20g",
            fats: "2g",
            vitamins: ["Fiber", "B Vitamins"],
            fiber: "3g",
            benefits: ["Whole Wheat", "Low Fat"],
            description: "Soft whole-wheat flatbread prepared fresh.",
            descriptionDE: "Weiches Vollkorn-Fladenbrot, frisch zubereitet.",
            titleDE: "Chapatti (1 Stück)",
            ingredients: ["Whole Wheat Flour", "Water", "Salt", "Oil"],
            ingredientsDE: ["Vollkornmehl", "Wasser", "Salz", "Öl"],
            dietaryLabel: "🌿 Vegan",
            dietaryLabelDE: "🌿 Vegan"
        });
    }

    // 5. Beverages (Restaurant Made)
    if (lowerName.includes("lassi") || lowerName.includes("mango")) {
        return buildInfo({
            isVeg: true,
            calories: 240,
            protein: "8g",
            carbs: "35g",
            fats: "6g",
            vitamins: ["Probiotics", "Calcium", "Vitamin A"],
            fiber: "1g",
            benefits: ["Cooling", "Gut Health", "Rehydrating"],
            description: "Creamy yogurt drink blended with sweet mango pulp.",
            descriptionDE: "Cremiges Joghurtgetränk gemischt mit süßem Mangopüree.",
            titleDE: "Mango Lassi",
            ingredients: ["Fresh Yogurt", "Alphonso Mango Pulp", "Milk", "Sugar", "Cardamom Powder", "Rose Water", "Saffron (Garnish)"],
            ingredientsDE: ["Frischer Joghurt", "Alphonso Mangopüree", "Milch", "Zucker", "Kardamompulver", "Rosenwasser", "Safran (Garnitur)"]
        });
    }

    // Fallback for generic categories
    if (lowerName.includes("dosa")) return buildInfo({
        calories: 280,
        protein: "6g",
        carbs: "45g",
        fats: "8g",
        vitamins: ["B Complex"],
        fiber: "2g",
        benefits: ["Light Meal", "Fermented Goodness"],
        description: "Classic fermented rice and lentil crepe.",
        ingredients: ["Parboiled Rice", "Raw Rice", "Urad Dal", "Fenugreek Seeds", "Sea Salt"]
    });

    if (lowerName.includes("idly")) return buildInfo({
        calories: 180,
        protein: "6g",
        carbs: "38g",
        fats: "1g",
        vitamins: ["No Cholesterol", "Easy Digest"],
        fiber: "2g",
        benefits: ["Steamed & Healthy", "Weight Loss Friendly"],
        description: "Soft steamed rice cakes, one of the healthiest breakfasts.",
        ingredients: ["Parboiled Rice", "Urad Dal", "Fenugreek Seeds", "Water", "Salt"]
    });

    // Default
    return buildInfo({
        calories: 300,
        protein: "10g",
        carbs: "40g",
        fats: "15g",
        vitamins: ["Nutrients"],
        fiber: "3g",
        benefits: ["Freshly Made", "Tasty"],
        description: "Freshly prepared dish with authentic ingredients.",
        ingredients: ["Main Ingredient", "Fresh Spices", "Vegetable Oil", "Garnishes"]
    });
};

import smoothieBananaAveia from "@assets/generated_images/banana_oat_smoothie.png";
import saladaFrangoQuinoa from "@assets/generated_images/chicken_quinoa_salad.png";
import sopaLegumesFrango from "@assets/generated_images/vegetable_chicken_soup.png";
import panquecaBananaAveia from "@assets/generated_images/banana_oat_pancakes.png";
import wrapAtumVegetais from "@assets/generated_images/tuna_vegetable_wrap.png";
import frangoGrelhadoBatataDoce from "@assets/generated_images/grilled_chicken_sweet_potato.png";
import iogurteFrutasGranola from "@assets/generated_images/yogurt_fruit_granola_parfait.png";
import omeleteVegetais from "@assets/generated_images/vegetable_omelette.png";
import peixeAssadoLegumes from "@assets/generated_images/baked_fish_with_vegetables.png";
import acaiFrutasGranola from "@assets/generated_images/açaí_bowl_with_fruits.png";
import saladaGraoBico from "@assets/generated_images/chickpea_salad.png";
import strogonoffFrangoLight from "@assets/generated_images/light_chicken_stroganoff.png";
import vitaminaMamaoLaranja from "@assets/generated_images/papaya_orange_smoothie.png";
import sanduicheNaturalFrango from "@assets/generated_images/natural_chicken_sandwich.png";
import risotoLegumes from "@assets/generated_images/vegetable_risotto.png";
import tapiocaQueijoTomate from "@assets/generated_images/tapioca_cheese_tomato.png";
import bowlQuinoaVegetais from "@assets/generated_images/quinoa_vegetable_bowl.png";
import lasanhaBerinjela from "@assets/generated_images/eggplant_lasagna.png";
import panquecaAmericanaSaudavel from "@assets/generated_images/healthy_american_pancakes.png";
import cevichePeixe from "@assets/generated_images/fish_ceviche.png";
import carneAssadaPure from "@assets/generated_images/roast_beef_mashed_potatoes.png";

const mealImages: Record<string, string> = {
  "1": smoothieBananaAveia,
  "2": saladaFrangoQuinoa,
  "3": sopaLegumesFrango,
  "4": panquecaBananaAveia,
  "5": wrapAtumVegetais,
  "6": frangoGrelhadoBatataDoce,
  "7": iogurteFrutasGranola,
  "8": omeleteVegetais,
  "9": peixeAssadoLegumes,
  "10": acaiFrutasGranola,
  "11": saladaGraoBico,
  "12": strogonoffFrangoLight,
  "13": vitaminaMamaoLaranja,
  "14": sanduicheNaturalFrango,
  "15": risotoLegumes,
  "16": tapiocaQueijoTomate,
  "17": bowlQuinoaVegetais,
  "18": lasanhaBerinjela,
  "19": panquecaAmericanaSaudavel,
  "20": cevichePeixe,
  "21": carneAssadaPure,
};

export function getMealImage(mealId: string): string | undefined {
  return mealImages[mealId];
}

export default mealImages;

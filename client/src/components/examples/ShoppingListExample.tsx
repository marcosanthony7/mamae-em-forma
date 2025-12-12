import ShoppingList from "../ShoppingList";

const mockCategories = [
  {
    name: "Frutas e Verduras",
    items: [
      { id: "1", name: "Banana", quantity: "6 unidades", checked: false },
      { id: "2", name: "Espinafre", quantity: "1 maço", checked: false },
      { id: "3", name: "Abacate", quantity: "2 unidades", checked: false },
    ],
  },
  {
    name: "Proteínas",
    items: [
      { id: "4", name: "Frango", quantity: "500g", checked: false },
      { id: "5", name: "Ovos", quantity: "12 unidades", checked: false },
    ],
  },
];

export default function ShoppingListExample() {
  return (
    <div className="p-6 bg-background max-w-md">
      <ShoppingList
        categories={mockCategories}
        onItemToggle={(id) => console.log("Toggle:", id)}
        onExport={() => console.log("Export clicked")}
      />
    </div>
  );
}

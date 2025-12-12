import DiastasisTester from "../DiastasisTester";

export default function DiastasisTesterExample() {
  return (
    <div className="p-6 bg-background max-w-md">
      <DiastasisTester onComplete={(result) => console.log("Result:", result)} />
    </div>
  );
}

import GameCard from "@/components/game-card";


const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Game Reviews</h1>
      <GameCard />
    </div>
  );
};

export default HomePage;

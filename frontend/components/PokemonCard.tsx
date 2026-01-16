interface PokemonCardProps {
  name: string;
  image: string;
  types: string[];
}

export default function PokemonCard({ name, image, types }: PokemonCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-48 object-contain"
      />
      <h3 className="text-lg font-bold capitalize mt-2">{name}</h3>
      <div className="flex gap-2 mt-2">
        {types.map(type => (
          <span 
            key={type}
            className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PokemonController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->input('page', 1);
        $limit = $request->input('limit', 20);

        $offset = ($page - 1) * $limit;

        $ListResponse = Http::get("https://pokeapi.co/api/v2/pokemon", [
            'offset' => $offset,
            'limit' => $limit,
        ]);

        if (!$ListResponse->successful()) {
            return response()->json(['error' => 'Failed to fetch Pokémon list'], 500);
        }

        $pokemonList = $ListResponse->json()['results'];

        $detailedPokemons = [];
        foreach ($pokemonList as $pokemon) {
            $detailPokemon = Http::get($pokemon['url']);
            
            if ($detailPokemon->successful()) {
                $data = $detailPokemon->json();
                
                $detailedPokemons[] = [
                    'name' => $data['name'],
                    'image' => $data['sprites']['other']['official-artwork']['front_default'] ?? $data['sprites']['front_default'],
                    'types' => array_map(fn($type) => $type['type']['name'], $data['types']),
                    'height' => $data['height'],
                    'weight' => $data['weight']
                ];
            }
        }

        return response()->json($detailedPokemons);
    }
}

        
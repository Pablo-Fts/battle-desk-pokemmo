# PokeMMO Showdown Damage Calculator

Damage calculator for [PokeMMO](https://pokemmo.com/) competitive battling, available at [calc.mmoshowdown.cc](https://calc.mmoshowdown.cc).

Forked from [smogon/damage-calc](https://github.com/smogon/damage-calc) and modified to reflect PokeMMO's metagame - Gen 5 (BW) mechanics with custom tier lists, ability/move restrictions, and additional data from later generations where applicable in PokeMMO.

## Changes from upstream

- Locked to Gen 5 mechanics
- Custom ability and move changes matching the PokeMMO mod (e.g. Sharpness, Competitive)
- Additional items from later generations that exist in PokeMMO (e.g. Assault Vest, Heavy-Duty Boots)
- No Fairy type
- Updated sets reflecting the PokeMMO competitive metagame

## Building

Install dependencies and build:

```
$ npm install
$ cd calc && npm install
$ cd .. && node build
```

The compiled output goes to `dist/`. To rebuild after changes to the UI only (files in `src/`), run `node build view` instead of `node build` to skip recompiling the calc package.

## Credits

This project is a fork of the [Pokémon Showdown Damage Calculator](https://github.com/smogon/damage-calc), originally created by Honko and maintained by Austin and jetou. Full list of upstream contributors can be found [here](https://github.com/smogon/damage-calc/graphs/contributors).

PokeMMO Showdown modifications by [suhleam](https://github.com/sah-leem).

## License

This project is distributed under the terms of the [MIT License](LICENSE).

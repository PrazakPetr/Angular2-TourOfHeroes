using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TohBackend.Entities;

namespace TohBackend.Services
{
    public class MemoryHeroRepository : IHeroRepository
    {
        private static List<Hero> _heroes = new List<Hero>
        {
              new Hero(){ Id = 11, Name="Mr. Nice" },
              new Hero(){ Id = 12, Name="Narco" },
              new Hero(){ Id = 13, Name="Bombasto" },
              new Hero(){ Id = 14, Name="Celeritas" },
              new Hero(){ Id = 15, Name="Magneta" },
              new Hero(){ Id = 16, Name="RubberMan" },
              new Hero(){ Id = 17, Name="Dynama" },
              new Hero(){ Id = 18, Name="Dr IQ" },
              new Hero(){ Id = 19, Name="Magma" },
              new Hero(){ Id = 20, Name="Tornado" }
        };

        public Hero CreateHero(Hero hero)
        {
            var newHero = new Hero()
            {
                Id = _heroes.Count > 0 ? _heroes.Max(h => h.Id) + 1 : 1,
                Name = hero.Name
            };

            _heroes.Add(newHero);

            return newHero;
        }

        public bool DeleteHero(int id)
        {
            Hero hero = _heroes.FirstOrDefault(h => h.Id == id);

            if (hero != null)
            {
                _heroes.Remove(hero);

                return true;
            }
            else
            {
                return false;
            }
        }

        public Hero GetHero(int id)
        {
            return _heroes.FirstOrDefault(h => h.Id == id);
        }

        public IEnumerable<Hero> GetHeroes()
        {
            return _heroes;
        }

        public Hero UpdateHero(int id, Hero hero)
        {
            var newHero = _heroes.FirstOrDefault(h => h.Id == id);

            if (newHero != null)
            {
                newHero.Name = hero.Name;
            }

            return newHero;

        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TohBackend.Entities;

namespace TohBackend.Services
{
    public interface IHeroRepository
    {
        IEnumerable<Hero> GetHeroes();

        Hero GetHero(int id);

        Hero UpdateHero(int id, Hero hero);

        Hero CreateHero(Hero hero);
        bool DeleteHero(int id);
    }
}

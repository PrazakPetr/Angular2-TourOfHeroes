using System;
using System.Collections.Generic;
using System.Linq;
using TohBackend.Entities;

namespace TohBackend.Services
{
    public class DbHeroRepository : IHeroRepository, IDisposable
    {
        #region Private Fields

        private readonly HeroDbContext context;

        #endregion Private Fields

        #region Public Constructors

        public DbHeroRepository(HeroDbContext context)
        {
            this.context = context;
        }

        #endregion Public Constructors

        #region Public Methods

        public IEnumerable<Hero> GetHeroes()
        {
            return this.context.Heroes.ToList();
        }

        public Hero GetHero(int id)
        {
            return this.context.Heroes.FirstOrDefault(h => h.Id == id);
        }

        public Hero CreateHero(Hero hero)
        {
            var heroEntity = this.context.Heroes.Add(hero);

            this.context.SaveChanges();

            return heroEntity.Entity;
        }

        public Hero UpdateHero(int id, Hero hero)
        {
            var result = this.context.Heroes.FirstOrDefault(h => h.Id == id);

            if (result != null)
            {
                result.Name = hero.Name;

                this.context.SaveChanges();
            }

            return result;

        }

        public bool DeleteHero(int id)
        {
            var removeItem = this.context.Heroes.FirstOrDefault(h => h.Id == id);

            if (removeItem != null)
            {
                this.context.Remove(removeItem);

                return this.context.SaveChanges() > 0;
            }
            else
            {
                return false;
            }
        }
        public void Dispose()
        {
            this.context.Dispose();
        }

        #endregion Public Methods
    }
}
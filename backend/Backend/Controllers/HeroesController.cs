using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TohBackend.Services;
using TohBackend.Entities;
using Microsoft.AspNetCore.Authorization;

namespace TohBackend.Controllers
{
    [Route("api/[controller]")]
    public class HeroesController : Controller
    {
        private IHeroRepository repository;

        public HeroesController(IHeroRepository repository)
        {
            this.repository = repository;
        }

        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            var heroes = repository.GetHeroes();

            return base.Json(heroes);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var hero = repository.GetHero(id);

            if (hero == null)
            {
                return base.NotFound();
            }

            return base.Json(hero);
        }

        //[Authorize("Bearer")]
        [Authorize()]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Hero hero)
        {
            hero = repository.UpdateHero(id, hero);

            if (hero == null)
            {
                return base.NotFound();
            }

            return base.Json(hero);
        }


        [HttpPost()]
        public IActionResult Post([FromBody] Hero hero)
        {
            hero = repository.CreateHero(hero);

            if (hero == null)
            {
                return base.NotFound();
            }

            return base.Json(hero);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if(repository.DeleteHero(id) == true)
            {
                return base.NoContent();
            }
            else
            {
                return base.NotFound();
            }
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TohBackend.Entities
{
    public class HeroDbContext : DbContext
    {
        public DbSet<Hero> Heroes { get; set; }

        public HeroDbContext(DbContextOptions<HeroDbContext> options )
            : base(options)
        {
        }
    }
}

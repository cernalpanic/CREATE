using AthenaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AthenaAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().ToTable("user");
            modelBuilder.Entity<Module>().ToTable("module");
        }

        public DbSet<AthenaAPI.Models.Module>? Modules { get; set; }

        public DbSet<AthenaAPI.Models.Quest>? Quest { get; set; }

        public DbSet<AthenaAPI.Models.DailyStandup>? DailyStandup { get; set; }
    }
}

using System;
using Microsoft.EntityFrameworkCore;

namespace Model;

public class Context : DbContext{

    public DbSet<Ativos> Ativos {get; set;}
    public DbSet<Grupos> Grupos {get; set;}
    public DbSet<Usuario> Usuario {get; set;}
    public DbSet<Usuario_Ativo> Usuario_Ativos{get; set;}


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){

        // TEM QUE MUDAR PRA ENTRAR NO BANCO CERTO DEPOIS
        optionsBuilder.UseSqlServer("Data Source=" + Environment.MachineName + ";Initial Catalog=BancoInfo; Integrated Security=True");

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder){

        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Ativos>(entity => {

            entity.HasKey(a => a.Id);
            entity.Property(a => a.Nome).IsRequired();
            entity.HasOne(a => a.Grupo);

        });

        modelBuilder.Entity<Grupos>(entity => {

            entity.HasKey(a=> a.Id);
            entity.Property(a => a.Nome).IsRequired();

        });

        modelBuilder.Entity<Usuario>(entity => {

            entity.HasKey(a => a.Id);
            entity.Property(a => a.Nome).IsRequired();
            entity.Property(a => a.DataNasc).IsRequired();
            entity.Property(a => a.Tipo).IsRequired();
            entity.Property(a => a.Login);
            entity.Property(a => a.Senha);
            entity.Property(x => x.Gerente);

        });

        modelBuilder.Entity<Usuario_Ativo>(entity => {

            entity.HasKey(a => a.Id);
            entity.Property(a => a.Saldo).IsRequired();
            entity.HasOne(a => a.Usuario);
            entity.HasOne(a => a.Ativo);

        });

    }

}